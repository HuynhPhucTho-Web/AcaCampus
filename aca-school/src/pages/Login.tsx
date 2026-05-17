import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import {
  BookOpen,
  GraduationCap,
  Heart,
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff,
} from 'lucide-react';

const roleConfig = {
  student: {

    icon: GraduationCap,
    title: 'Học sinh',
    subtitle: 'Khám phá hành trình học tập thú vị',
    color: 'from-pink-400 to-purple-500',
    bgPattern: '🌸',
  },
  teacher: {

    icon: BookOpen,
    title: 'Giáo viên',
    subtitle: 'Quản lý lớp học và theo dõi tiến độ',
    color: 'from-blue-400 to-cyan-500',
    bgPattern: '📚',
  },
  parent: {

    icon: Heart,
    title: 'Phụ huynh',
    subtitle: 'Đồng hành cùng con trong hành trình học tập',
    color: 'from-orange-400 to-amber-500',
    bgPattern: '❤️',
  },
  admin: {
    icon: Sparkles,
    title: 'Admin',
    subtitle: 'Quản trị hệ thống và người dùng',
    color: 'from-purple-400 to-indigo-500',
    bgPattern: '🛡️',
  },
};


export default function Login() {
  const navigate = useNavigate();
  const login = useAppStore((state) => state.login);
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | 'parent' | 'admin'>('student');

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const floatingStars = Array.from({ length: 20 }, (_, i) => {
    const seed = (i + 1) * 9973;
    const r1 = (Math.sin(seed) + 1) / 2;
    const r2 = (Math.cos(seed * 1.3) + 1) / 2;
    const r3 = (Math.sin(seed * 2.1) + 1) / 2;
    const r4 = (Math.cos(seed * 0.7) + 1) / 2;

    return {
      left: `${r1 * 100}%`,
      top: `${r2 * 100}%`,
      animationDelay: `${r3 * 5}s`,
      animationDuration: `${3 + r4 * 4}s`,
      char: ['⭐', '🌸', '🎀', '💖', '📚', '✏️', '🎨', '🌟'][i % 8],
    };
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const mockUser = {
      id: '1',
      name: selectedRole === 'student' ? 'Nguyễn Minh Anh' : 
            selectedRole === 'teacher' ? 'Cô Mai Anh' : 'Anh Nguyễn',
      email: formData.email,
      role: selectedRole,
      avatar: '',
      classId: '10A1',
      studentId: 'HS001',
    };
    
    login(mockUser);
    setIsLoading(false);

    if (selectedRole === 'teacher') navigate('/teacher/dashboard');
    else if (selectedRole === 'admin') navigate('/admin/dashboard');
    else navigate('/dashboard');
  };

  const currentRole = roleConfig[selectedRole as keyof typeof roleConfig];
  const Icon = currentRole.icon;


  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
        <div className="absolute inset-0 overflow-hidden">
          {floatingStars.map((s, i) => (
            <div
              key={i}
              className="absolute animate-float text-4xl opacity-20"
              style={{
                left: s.left,
                top: s.top,
                animationDelay: s.animationDelay,
                animationDuration: s.animationDuration,
              }}
            >
              {s.char}
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-3xl shadow-xl mb-4 transform hover:scale-110 transition-transform duration-300">
            <Sparkles className="w-10 h-10 text-purple-500" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">
            Trường Học Vui Vẻ
          </h1>
          <p className="text-gray-600 text-lg">Nơi học tập trở nên thú vị!</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">
          {/* Role Selection Tabs */}
          <div className="flex border-b border-gray-100">
            {(Object.keys(roleConfig) as Array<keyof typeof roleConfig>).map((role) => {
              const config = roleConfig[role];
              const RoleIcon = config.icon;
              return (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`flex-1 py-4 px-4 flex flex-col items-center gap-1 transition-all duration-300 ${
                    selectedRole === role
                      ? 'bg-white text-purple-600 border-b-3 border-purple-500'
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <RoleIcon className="w-6 h-6" />
                  <span className="font-medium">{config.title}</span>
                </button>
              );
            })}
          </div>

          {/* Login Form */}
          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${currentRole.color} flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Chào {currentRole.title}!</h2>
                <p className="text-gray-500 text-sm">{currentRole.subtitle}</p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📧 Email hoặc tên đăng nhập
                </label>
                <input
                  type="text"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-purple-100 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none"
                  placeholder="Nhập email của bạn..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🔐 Mật khẩu
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-purple-100 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none pr-12"
                    placeholder="Nhập mật khẩu..."
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-500 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-purple-500 focus:ring-purple-400" />
                  <span className="text-gray-600">Ghi nhớ đăng nhập</span>
                </label>
                <a href="#" className="text-purple-500 hover:text-purple-600 font-medium">
                  Quên mật khẩu?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 rounded-2xl bg-gradient-to-r ${currentRole.color} text-white font-bold text-lg flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg hover:shadow-xl ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Đăng nhập ngay</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Demo Login Buttons */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-center text-gray-500 text-sm mb-3">Thử đăng nhập nhanh với tài khoản demo:</p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setFormData({ email: 'student@school.com', password: 'demo' });
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-pink-100 text-pink-600 text-sm font-medium hover:bg-pink-200 transition-colors"
                >
                  🎓 Demo Học sinh
                </button>
                <button
                  onClick={() => {
                    setFormData({ email: 'teacher@school.com', password: 'demo' });
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-blue-100 text-blue-600 text-sm font-medium hover:bg-blue-200 transition-colors"
                >
                  📚 Demo Giáo viên
                </button>
                <button
                  onClick={() => {
                    setFormData({ email: 'parent@school.com', password: 'demo' });
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-orange-100 text-orange-600 text-sm font-medium hover:bg-orange-200 transition-colors"
                >
                  👨‍👩 Demo Phụ huynh
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          © 2024 Trường Học Vui Vẻ - Học tập thật vui!
        </p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
