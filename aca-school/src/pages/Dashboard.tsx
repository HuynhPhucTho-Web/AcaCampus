import { useAppStore } from '../store/useAppStore';
import {
  BookOpen,
  Calendar,
  MessageCircle,
  FileText,
  Gamepad2,
  Award,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Brain,
  Users,
  Target,
  TrendingUp,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, grades, examSchedules, notifications, studyPaths, leaderboard } = useAppStore();

  const averageScore = grades.reduce((acc, g) => acc + g.score, 0) / grades.length;
  const upcomingExams = examSchedules.slice(0, 3);
  const recentNotifications = notifications.filter((n) => !n.isRead).slice(0, 4);

  const stats = [
    {
      icon: BookOpen,
      label: 'Điểm trung bình',
      value: averageScore.toFixed(1),
      color: 'from-pink-400 to-purple-500',
      change: '+0.5',
      trend: 'up',
    },
    {
      icon: Calendar,
      label: 'Lịch thi',
      value: `${upcomingExams.length} kỳ thi`,
      color: 'from-blue-400 to-cyan-500',
      change: 'Sắp tới',
      trend: 'neutral',
    },
    {
      icon: TrendingUp,
      label: 'Xếp hạng',
      value: `#${leaderboard.find((l) => l.userName === user?.name)?.rank || '-'}`,
      color: 'from-orange-400 to-amber-500',
      change: 'Top 20%',
      trend: 'up',
    },
    {
      icon: Award,
      label: 'Điểm thưởng',
      value: '1,250',
      color: 'from-green-400 to-emerald-500',
      change: '+100',
      trend: 'up',
    },
  ];

  const quickActions = [
    { icon: FileText, label: 'Xem điểm', path: '/dashboard/grades', color: 'bg-pink-100 text-pink-600' },
    { icon: MessageCircle, label: 'Nhắn tin', path: '/dashboard/messages', color: 'bg-blue-100 text-blue-600' },
    { icon: Gamepad2, label: 'Chơi game', path: '/dashboard/quiz', color: 'bg-purple-100 text-purple-600' },
    { icon: Brain, label: 'Phân tích', path: '/dashboard/analysis', color: 'bg-orange-100 text-orange-600' },
    { icon: Target, label: 'Lộ trình', path: '/dashboard/analysis', color: 'bg-green-100 text-green-600' },
    { icon: Users, label: 'Diễn đàn', path: '/dashboard/forum', color: 'bg-cyan-100 text-cyan-600' },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 opacity-20">
          <Sparkles className="w-full h-full" />
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">
            Chào {user?.name}! 👋
          </h2>
          <p className="text-white/90 text-lg">
            Hôm nay là một ngày tuyệt vời để học tập! Bạn đã sẵn sàng chưa?
          </p>
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => navigate('/dashboard/grades')}
              className="px-6 py-3 bg-white/20 rounded-2xl font-medium hover:bg-white/30 transition-colors"
            >
              📊 Xem điểm số
            </button>
            <button
              onClick={() => navigate('/dashboard/quiz')}
              className="px-6 py-3 bg-white text-purple-600 rounded-2xl font-medium hover:bg-white/90 transition-colors"
            >
              🎮 Chơi game ôn tập
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-500' : stat.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                }`}>
                  {stat.trend === 'up' && <ArrowUp className="w-4 h-4" />}
                  {stat.trend === 'down' && <ArrowDown className="w-4 h-4" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">⚡ Truy cập nhanh</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={() => navigate(action.path)}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-gray-50 transition-colors"
              >
                <div className={`w-14 h-14 rounded-2xl ${action.color} flex items-center justify-center`}>
                  <Icon className="w-7 h-7" />
                </div>
                <span className="text-sm font-medium text-gray-700">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Exams */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">📅 Lịch thi sắp tới</h3>
            <button
              onClick={() => navigate('/dashboard/grades')}
              className="text-purple-500 font-medium hover:text-purple-600"
            >
              Xem tất cả
            </button>
          </div>
          <div className="space-y-3">
            {upcomingExams.map((exam, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl"
              >
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white font-bold">
                  {exam.date.split('-')[2]}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-800">{exam.subject}</p>
                  <p className="text-sm text-gray-500">{exam.time} - {exam.room}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{exam.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">🔔 Thông báo mới</h3>
            <button
              onClick={() => navigate('/dashboard/news')}
              className="text-purple-500 font-medium hover:text-purple-600"
            >
              Xem tất cả
            </button>
          </div>
          <div className="space-y-3">
            {recentNotifications.map((notification, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className={`w-2 h-2 mt-2 rounded-full ${
                  notification.type === 'warning' ? 'bg-orange-500' :
                  notification.type === 'success' ? 'bg-green-500' :
                  notification.type === 'event' ? 'bg-blue-500' :
                  'bg-purple-500'
                }`} />
                <div className="flex-1">
                  <p className="font-medium text-gray-800 text-sm">{notification.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Study Progress */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">📈 Tiến độ học tập</h3>
          <button
            onClick={() => navigate('/dashboard/analysis')}
            className="text-purple-500 font-medium hover:text-purple-600"
          >
            Xem chi tiết
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {studyPaths.slice(0, 4).map((path, index) => (
            <div key={index} className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-gray-800">{path.subject}</span>
                <span className="text-sm text-purple-600">{path.progress}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                  style={{ width: `${path.progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Mức {path.currentLevel} → {path.targetLevel}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard Preview */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">🏆 Bảng xếp hạng</h3>
          <button
            onClick={() => navigate('/dashboard/quiz')}
            className="text-purple-500 font-medium hover:text-purple-600"
          >
            Xem tất cả
          </button>
        </div>
        <div className="space-y-2">
          {leaderboard.slice(0, 5).map((entry, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-3 rounded-2xl ${
                entry.userName === user?.name ? 'bg-purple-100' : 'hover:bg-gray-50'
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold ${
                index === 0 ? 'bg-yellow-400 text-white' :
                index === 1 ? 'bg-gray-300 text-white' :
                index === 2 ? 'bg-orange-300 text-white' :
                'bg-gray-100 text-gray-600'
              }`}>
                {entry.rank}
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl" />
              <div className="flex-1">
                <p className="font-bold text-gray-800">{entry.userName}</p>
                <p className="text-xs text-gray-500">{entry.className}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-purple-600">{entry.totalPoints}</p>
                <p className="text-xs text-gray-500">điểm</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
