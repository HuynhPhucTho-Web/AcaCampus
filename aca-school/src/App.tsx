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

import TeacherDashboard from './pages/teachers/TeacherDashboard';
import TeacherClasses from './pages/teachers/TeacherClasses';
import TeacherStudents from './pages/teachers/TeacherStudents';
import TeacherSchedule from './pages/teachers/TeacherSchedule';
import TeacherAttendance from './pages/teachers/TeacherAttendance';
import TeacherGrades from './pages/teachers/TeacherGrades';
import TeacherAssignments from './pages/teachers/TeacherAssignments';
import TeacherLeaveApproval from './pages/teachers/TeacherLeaveApproval';
import TeacherMessages from './pages/teachers/TeacherMessages';
import TeacherForum from './pages/teachers/TeacherForum';
import TeacherDocuments from './pages/teachers/TeacherDocuments';
import TeacherAnalysis from './pages/teachers/TeacherAnalysis';
import TeacherAnnouncements from './pages/teachers/TeacherAnnouncements';
import TeacherQuizManagement from './pages/teachers/TeacherQuizManagement';
import TeacherMeetings from './pages/teachers/TeacherMeetings';
import TeacherSettings from './pages/teachers/TeacherSettings';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}

function RoleRedirect() {
  const user = useAppStore((state) => state.user);

  if (!user) return <Navigate to="/" replace />;

  if (user.role === 'teacher') return <Navigate to="/teacher/dashboard" replace />;
  if (user.role === 'student') return <Navigate to="/dashboard" replace />;

  return <Navigate to="/dashboard" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Root redirect (optional) */}
        <Route path="/home" element={<RoleRedirect />} />

        {/* Student routes */}
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

        {/* Teacher routes */}
        <Route path="/teacher/dashboard" element={<ProtectedRoute><TeacherDashboard /></ProtectedRoute>} />
        <Route path="/teacher/classes" element={<ProtectedRoute><TeacherClasses /></ProtectedRoute>} />
        <Route path="/teacher/students" element={<ProtectedRoute><TeacherStudents /></ProtectedRoute>} />
        <Route path="/teacher/schedule" element={<ProtectedRoute><TeacherSchedule /></ProtectedRoute>} />
        <Route path="/teacher/attendance" element={<ProtectedRoute><TeacherAttendance /></ProtectedRoute>} />
        <Route path="/teacher/grades" element={<ProtectedRoute><TeacherGrades /></ProtectedRoute>} />
        <Route path="/teacher/assignments" element={<ProtectedRoute><TeacherAssignments /></ProtectedRoute>} />
        <Route path="/teacher/leave-approval" element={<ProtectedRoute><TeacherLeaveApproval /></ProtectedRoute>} />
        <Route path="/teacher/messages" element={<ProtectedRoute><TeacherMessages /></ProtectedRoute>} />
        <Route path="/teacher/forum" element={<ProtectedRoute><TeacherForum /></ProtectedRoute>} />
        <Route path="/teacher/documents" element={<ProtectedRoute><TeacherDocuments /></ProtectedRoute>} />
        <Route path="/teacher/analysis" element={<ProtectedRoute><TeacherAnalysis /></ProtectedRoute>} />
        <Route path="/teacher/announcements" element={<ProtectedRoute><TeacherAnnouncements /></ProtectedRoute>} />
        <Route path="/teacher/quiz" element={<ProtectedRoute><TeacherQuizManagement /></ProtectedRoute>} />
        <Route path="/teacher/meetings" element={<ProtectedRoute><TeacherMeetings /></ProtectedRoute>} />
        <Route path="/teacher/settings" element={<ProtectedRoute><TeacherSettings /></ProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
