import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './LandingPage.tsx';
import { AuthProvider, RequireAuth } from './auth/AuthContext.tsx';
import AuthPage from './pages/AuthPage.tsx';
import AcceptInvitePage from './pages/AcceptInvitePage.tsx';
import TenantDashboard from './pages/TenantDashboard.tsx';
import LandlordDashboard from './pages/LandlordDashboard.tsx';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage initialMode="signup" />} />
          <Route
            path="/accept-invite"
            element={<RequireAuth role="TENANT"><AcceptInvitePage /></RequireAuth>}
          />
          <Route
            path="/tenant"
            element={<RequireAuth role="TENANT"><TenantDashboard /></RequireAuth>}
          />
          <Route
            path="/landlord"
            element={<RequireAuth role="LANDLORD"><LandlordDashboard /></RequireAuth>}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}