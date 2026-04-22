export type AtlasMessage =
  | { type: 'atlas'; text: string; t: number; screen?: string; kind?: 'opening' | 'reply' }
  | { type: 'user'; text: string; t: number }
  | { type: 'mark'; label: string; t: number };

export interface AtlasScreenConfig {
  screen: string;
  screenTitle: string;
  openingNote: string;
  prompts: string[];
}
