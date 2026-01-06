import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Register from './pages/Register'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import { DashboardLayout } from './components/dashboard/DashboardLayout'
import Overview from './pages/dashboard/Overview'
import Workspaces from './pages/dashboard/Workspaces'
import WorkspaceDetail from './pages/dashboard/WorkspaceDetail'
import Servers from './pages/dashboard/Servers'
import Agents from './pages/dashboard/Agents'
import Containers from './pages/dashboard/Containers'
import Domains from './pages/dashboard/Domains'
import Metrics from './pages/dashboard/Metrics'
import Billing from './pages/dashboard/Billing'
import Settings from './pages/dashboard/Settings'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="workspaces" element={<Workspaces />} />
          <Route path="workspaces/:id" element={<WorkspaceDetail />} />
          <Route path="servers" element={<Servers />} />
          <Route path="agents" element={<Agents />} />
          <Route path="containers" element={<Containers />} />
          <Route path="domains" element={<Domains />} />
          <Route path="metrics" element={<Metrics />} />
          <Route path="billing" element={<Billing />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
