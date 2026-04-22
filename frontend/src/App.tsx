import { Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './layout/AppShell';
import { AtlasProvider } from './atlas/AtlasProvider';
import { AtlasWidget } from './atlas/AtlasWidget';
import { AuthProvider, RequireAuth } from './lib/auth';
import { EngagementProvider } from './lib/engagement';
import { Login } from './pages/Login';
import { ExecutiveSummary } from './pages/ExecutiveSummary';
import { Opportunities } from './pages/Opportunities';
import { Performance } from './pages/Performance';
import { AttributionTrust } from './pages/AttributionTrust';
import { OptimizeSimulate } from './pages/OptimizeSimulate';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <RequireAuth>
              <EngagementProvider>
                <AtlasProvider>
                  <AppShell>
                    <Routes>
                      <Route path="/" element={<ExecutiveSummary />} />
                      <Route path="/opportunities" element={<Opportunities />} />
                      <Route path="/performance" element={<Performance />} />
                      <Route path="/attribution" element={<AttributionTrust />} />
                      <Route path="/optimize" element={<OptimizeSimulate />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </AppShell>
                  <AtlasWidget />
                </AtlasProvider>
              </EngagementProvider>
            </RequireAuth>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
