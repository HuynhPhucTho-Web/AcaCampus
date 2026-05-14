import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './store/useAppStore';
import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import News from './pages/News';
import Grades from './pages/Grades';
import Messages from './pages/Messages';
import Stickers from './pages/Stickers';
import Forum from './pages/Forum';
import Analysis from './pages/Analysis';
import Documents from './pages/Documents';
import Quiz from './pages/Quiz';
import Schedule from './pages/Schedule';
import LeaveRequest from './pages/LeaveRequest';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <DashboardLayout>{children}</DashboardLayout>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard/news" element={<ProtectedRoute><News /></ProtectedRoute>} />
        <Route path="/dashboard/grades" element={<ProtectedRoute><Grades /></ProtectedRoute>} />
        <Route path="/dashboard/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
        <Route path="/dashboard/stickers" element={<ProtectedRoute><Stickers /></ProtectedRoute>} />
        <Route path="/dashboard/forum" element={<ProtectedRoute><Forum /></ProtectedRoute>} />
        <Route path="/dashboard/analysis" element={<ProtectedRoute><Analysis /></ProtectedRoute>} />
        <Route path="/dashboard/documents" element={<ProtectedRoute><Documents /></ProtectedRoute>} />
        <Route path="/dashboard/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
        <Route path="/dashboard/schedule" element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
        <Route path="/dashboard/leave-request" element={<ProtectedRoute><LeaveRequest /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
