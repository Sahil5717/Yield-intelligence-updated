/**
 * Typed HTTP client for the Yield Intelligence backend.
 *
 * - Base URL comes from VITE_API_BASE_URL (default http://localhost:8000)
 * - JWT is read from localStorage via getToken() on every call
 * - All responses are JSON; non-2xx throws ApiError with status + message
 * - Engagement ID is threaded through a helper so callers don't have to
 *   remember to append it (most read endpoints accept ?engagement_id=)
 */

const BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') ||
  'http://localhost:8000';

const TOKEN_KEY = 'yi.token';
const USER_KEY = 'yi.user';

export interface AuthUser {
  user_id: number;
  username: string;
  role: 'editor' | 'client' | 'admin' | 'analyst' | 'viewer';
}

export interface LoginResponse extends AuthUser {
  token: string;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public body?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// ─── Token helpers ───────────────────────────────────────────────────────

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user: AuthUser): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

// ─── Core request ────────────────────────────────────────────────────────

interface RequestOpts {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  query?: Record<string, string | number | undefined>;
  /** Skip sending Authorization header (used only for login). */
  anonymous?: boolean;
}

async function request<T>(path: string, opts: RequestOpts = {}): Promise<T> {
  const { method = 'GET', body, query, anonymous = false } = opts;

  // Build URL with query params
  let url = `${BASE_URL}${path}`;
  if (query) {
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== null && v !== '') params.set(k, String(v));
    }
    const qs = params.toString();
    if (qs) url += `?${qs}`;
  }

  const headers: Record<string, string> = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';

  if (!anonymous) {
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  let res: Response;
  try {
    res = await fetch(url, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (e) {
    throw new ApiError(
      0,
      `Network error: could not reach ${BASE_URL}. Is the backend running?`,
    );
  }

  // Parse body — try JSON, fall back to text
  let parsed: unknown = null;
  const text = await res.text();
  if (text) {
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = text;
    }
  }

  if (!res.ok) {
    // Auto-logout on 401 so the auth context picks it up
    if (res.status === 401) clearToken();
    const msg =
      (parsed && typeof parsed === 'object' && 'detail' in parsed
        ? String((parsed as { detail: unknown }).detail)
        : res.statusText) || `Request failed (${res.status})`;
    throw new ApiError(res.status, msg, parsed);
  }

  return parsed as T;
}

// ─── Auth endpoints ──────────────────────────────────────────────────────

export const api = {
  async login(username: string, password: string): Promise<LoginResponse> {
    // login-v2 takes a JSON body; login (v1) takes query params
    return request<LoginResponse>('/api/auth/login-v2', {
      method: 'POST',
      anonymous: true,
      body: { username, password },
    });
  },

  async me(): Promise<
    { authenticated: false; role: 'anonymous' } | ({ authenticated: true } & AuthUser)
  > {
    return request('/api/auth/me');
  },

  async demoUsers(): Promise<{
    demo_users: Array<{ username: string; role: string; password_hint: string }>;
  }> {
    return request('/api/auth/demo-users', { anonymous: true });
  },

  // ─── Engagements ───────────────────────────────────────────────────────
  async listEngagements(): Promise<{
    engagements: Array<{
      id: string;
      name: string;
      currency: string;
      locale: string;
      created_at: number;
      updated_at: number;
    }>;
    default_id: string;
    supported_currencies: string[];
  }> {
    return request('/api/engagements');
  },

  // ─── Data loading (analyst/editor actions) ─────────────────────────────
  async loadMockData(): Promise<{
    status: string;
    rows: number;
    journey_rows: number;
    channels: number;
    campaigns: number;
    total_spend: number;
    total_revenue: number;
    engines_run: boolean;
    market_data_loaded: boolean;
  }> {
    return request('/api/load-mock-data', { method: 'POST' });
  },

  async runAnalysis(): Promise<{ status: string; model_type: string }> {
    return request('/api/run-analysis', { method: 'POST' });
  },

  async health(): Promise<{
    status: string;
    data_loaded: boolean;
    engines_run: boolean;
    reporting_rows: number;
    training_rows: number;
  }> {
    return request('/api/health', { anonymous: true });
  },

  // ─── Screen data endpoints ─────────────────────────────────────────────
  async executiveSummary(engagementId: string): Promise<ExecutiveSummaryPayload> {
    return request('/api/executive-summary', { query: { engagement_id: engagementId } });
  },

  async channelPerformance(engagementId: string): Promise<ChannelPerformancePayload> {
    return request('/api/channel-performance', { query: { engagement_id: engagementId } });
  },

  async budgetOptimization(engagementId: string): Promise<BudgetOptimizationPayload> {
    return request('/api/budget-optimization', { query: { engagement_id: engagementId } });
  },

  async plan(engagementId: string): Promise<PlanPayload> {
    return request('/api/plan', { query: { engagement_id: engagementId } });
  },

  async diagnosis(engagementId: string): Promise<DiagnosisPayload> {
    return request('/api/diagnosis', { query: { engagement_id: engagementId } });
  },

  async recommendations(): Promise<RecommendationItem[]> {
    return request('/api/recommendations');
  },

  async currentState(): Promise<CurrentStatePayload> {
    return request('/api/current-state');
  },

  async pillars(): Promise<PillarsPayload> {
    return request('/api/pillars');
  },

  async marketContext(engagementId: string): Promise<MarketContextPayload> {
    return request('/api/market-context', { query: { engagement_id: engagementId } });
  },
};

// ─── Response types (shaped to what the backend actually returns) ────────

export interface Engagement {
  id: string;
  name: string;
  currency: string;
  locale: string;
  created_at: number;
  updated_at: number;
}

export interface Kpi {
  label: string;
  value: string;
  delta: string;
}

export interface Pillar {
  id: string;
  roman: string;
  name: string;
  amount: number;
  display: string;
  description: string;
  tag: string;
  /** Sometimes present on the executive-summary endpoint */
  impact?: string;
}

export interface AtlasNarration {
  paragraphs: Array<{ text: string }>;
  suggested_questions: string[];
  source: string;
}

export interface ExecutiveSummaryPayload {
  engagement: Engagement;
  hero: {
    eyebrow: string;
    headline:
      | string
      | {
          prefix?: string;
          loss?: string;
          middle?: string;
          gain?: string;
          suffix?: string;
        };
    sub: string;
    cta: { label: string; meta: string };
  };
  kpis: Kpi[];
  pillars: {
    total_cost: { amount: number; display: string; label: string };
    pillars: Pillar[];
  };
  opportunities: Array<{
    icon: string;
    amount: number;
    display: string;
    name: string;
    detail: string;
  }>;
  top_actions: Array<{
    num: number;
    text: string;
    impact: string;
    why: string | { who: string; text: string };
  }>;
  atlas: AtlasNarration;
  has_data: boolean;
}

export interface ChannelPerformancePayload {
  engagement: Engagement;
  kpis: Kpi[];
  summary: Array<{
    channel: string;
    color: string;
    spend: number;
    spend_display: string;
    revenue: number;
    revenue_display: string;
    roi: number;
    roi_display: string;
    conversions: number;
    conversions_display: string;
    trend_pct: number;
    trend_direction: 'up' | 'down' | 'flat';
  }>;
  contribution: {
    total: number;
    total_display: string;
    slices: Array<{ channel: string; value: number; pct: number; color: string }>;
  };
  top_insight: { headline: string; detail: string };
  channel_shift: {
    lookback_months: number;
    source: string;
    series: Array<{ channel: string; color: string; points: number[] }>;
    overlay_events: Array<{ month_index: number; label: string }>;
  };
  atlas: AtlasNarration;
  has_data: boolean;
}

// ─── Structured hero segments (shared across Plan + Diagnosis heroes) ────

export interface HeroSegment {
  text: string;
  /** When true, render in italic + accent color (the mockup's answer-first emphasis). */
  emphasis?: boolean;
}

export interface StructuredHero {
  segments: HeroSegment[];
  lede: string;
  tone: string;
}

/**
 * Impact stat — the backend returns `{value, delta}` per KPI cell for the
 * budget-optimization screen, not a bare string. Delta is typically a
 * secondary note ("▲ 9.2%", "to $221", "vs current") and can be null.
 */
export interface ImpactStat {
  value: string;
  delta: string | null;
}

/**
 * A single "move" from the budget-optimization endpoint.
 *
 * Shape comes from routes_budget_optimization._compose_moves — note that
 * `num` is a zero-padded string ("01.") and `why` is a structured object,
 * not a plain rationale string.
 */
export interface OptimizationMove {
  num: string;
  direction: 'up' | 'down' | 'hold';
  action: string;
  channel: string;
  delta_spend: number;
  delta_spend_display: string;
  revenue_lift: number;
  revenue_lift_display: string;
  revenue_lift_kind: 'gain' | 'cut';
  confidence: number;
  confidence_display: string;
  why: { who: string; text: string };
}

export interface BudgetOptimizationPayload {
  engagement: Engagement;
  hero: {
    eyebrow: string;
    headline: string | Record<string, string>;
    sub: string;
    cta: { label: string; meta: string };
  };
  allocation: {
    total_budget: number;
    total_budget_display: string;
    current: Array<{ channel: string; amount: number; display: string; pct: number }>;
    recommended: Array<{ channel: string; amount: number; display: string; pct: number }>;
  };
  moves: OptimizationMove[];
  impact: {
    projected_roi: ImpactStat;
    incremental_revenue: ImpactStat;
    cac_improvement: ImpactStat;
    payback_period: ImpactStat;
  };
  atlas: AtlasNarration;
  has_optimization: boolean;
}

/**
 * A plan move — what `build_moves()` in engines/narrative_plan.py emits.
 *
 * Richer than the optimization move: includes the narrative paragraph,
 * the reliability flag from the near-linear guard, and optional Bayesian
 * HDI fields when the Bayesian subset covers this channel.
 */
export interface PlanMove {
  key: string;
  channel: string;
  action: 'increase' | 'decrease' | 'hold' | string;
  headline: string;
  narrative: string;
  current_spend: number;
  optimized_spend: number;
  spend_delta: number;
  spend_delta_display: string;
  change_pct: number;
  revenue_delta: number;
  revenue_delta_display: string;
  current_roi: number;
  optimized_roi: number;
  marginal_roi: number;
  locked: boolean;
  reliability: 'reliable' | 'inconclusive';
  near_linear_fit: boolean;
  constraints?: Record<string, unknown>;
  /** 80% Bayesian credible interval on revenue delta, when available. */
  bayes_delta_hdi_90?: [number, number] | null;
  bayes_delta_point?: number | null;
  bayes_roas_hdi_90?: [number, number] | null;
  bayes_roas_point?: number | null;
}

/** Shape shared by Plan + Diagnosis KPI pills. */
export interface KpiPill {
  value: string | number;
  display: string;
  label: string;
  tone: 'positive' | 'neutral' | 'warning' | 'negative' | string;
  context?: string;
  benchmark?: number | null;
  pct_of_revenue?: number;
}

export interface Tradeoff {
  key: string;
  severity: 'warning' | 'info' | string;
  headline: string;
  narrative: string;
}

export interface PlanMethodologyEntry {
  engine: string;
  method: string;
  objective?: string;
  converged?: boolean;
  channels_fitted?: number;
}

export interface PlanPayload {
  hero: StructuredHero;
  headline_paragraph: string;
  kpis: {
    reallocation_size: KpiPill;
    expected_uplift: KpiPill;
    plan_confidence: KpiPill;
  };
  moves: PlanMove[];
  tradeoffs: Tradeoff[];
  methodology: PlanMethodologyEntry[];
  summary: {
    total_budget: number;
    current_revenue: number;
    optimized_revenue: number;
    uplift_pct: number;
  };
}

export interface DiagnosisFinding {
  key?: string;
  headline: string;
  type: 'positive' | 'warning' | 'insight' | 'opportunity' | 'risk' | string;
  confidence: string | number;
  impact_dollars: number | null;
  prescribed_action: string | null;
  narrative: string;
  evidence_chart?: string | null;
  evidence_metric?: Record<string, unknown>;
  source_engines?: string[];
  ey_commentary?: unknown;
}

export interface DiagnosisMethodologyEntry {
  engine: string;
  method: string;
  channels_fitted?: number;
  converged?: boolean;
  r_squared?: number | null;
  total_var?: number;
}

export interface DiagnosisPayload {
  hero: StructuredHero;
  headline_paragraph: string;
  kpis: {
    portfolio_roas: KpiPill;
    value_at_risk: KpiPill;
    plan_confidence: KpiPill;
  };
  findings: DiagnosisFinding[];
  methodology: DiagnosisMethodologyEntry[];
  industry_context?: Record<string, unknown>;
  data_coverage?: {
    total_spend: number;
    total_revenue: number;
    n_channels: number;
    n_campaigns: number;
    period_rows: number;
  };
  market_snippet?: unknown;
  market_context?: unknown;
}

export interface RecommendationItem {
  channel: string;
  action: 'increase' | 'decrease' | 'hold' | string;
  current_spend: number;
  recommended_spend: number;
  delta: number;
  delta_pct: number;
  expected_revenue_lift?: number;
  confidence?: string | number;
  rationale?: string;
  [key: string]: unknown;
}

export interface CurrentStatePayload {
  summary: {
    total_spend: number;
    total_revenue: number;
    roi: number;
    roas: number;
    total_conversions: number;
    cac: number;
  };
  channel_campaign_matrix: Array<{
    channel: string;
    campaign: string;
    channel_type: string;
    spend: number;
    revenue: number;
    impressions: number;
  }>;
  monthly_trends: Array<{
    month: string;
    spend: number;
    revenue: number;
    conversions: number;
    roi: number;
  }>;
  online_offline_split: Array<{ channel_type: string; spend: number; revenue: number }>;
  attribution: Array<{
    channel: string;
    campaign: string;
    attributed_revenue: number;
    attributed_conversions: number;
    attribution_model: string;
    total_spend: number;
  }>;
  attribution_model: string;
}

export interface PillarsPayload {
  revenue_leakage: {
    total_leakage: number;
    leakage_pct: number;
    by_channel: Record<string, unknown>;
    decomposition: unknown;
  };
  experience_suppression: {
    total_suppression: number;
    n_affected_campaigns: number;
    items: unknown[];
    median_cvr: number;
    assist_floor_cvr: number;
  };
  avoidable_cost: {
    total_avoidable_cost: number;
    median_cac: number;
    comparison_method: string;
    items: unknown[];
  };
  total_value_at_risk: number;
  correction_potential: {
    reallocation_uplift: number;
    cx_fix_recovery: number;
    cost_savings: number;
    total_recoverable: number;
  };
}

export interface MarketContextPayload {
  engagement: Engagement;
  as_of: string;
  category: string | null;
  regions: string[] | null;
  demand_trend: { lookback_months: number; points: Array<{ month: string; index: number }> };
  upcoming_peaks: Array<{
    label: string;
    weeks_out: number;
    impact_pct: number;
    direction: 'up' | 'down';
    detail: string;
  }>;
  atlas_narration: {
    headline: string;
    detail: string;
    follow_up: string;
    source: string;
    confidence: string | number;
  };
  source: string;
}
