import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import {
  LayoutDashboard,
  Bell,
  BookOpen,
  MessageCircle,
  Sticker,
  MessageSquare,
  TrendingUp,
  FolderOpen,
  Gamepad2,
  Calendar,
  FileText,
  LogOut,
  Menu,
  X,
  ChevronRight,
  User,
  Sun,
  Moon,
  Globe,
  GraduationCap,
} from 'lucide-react';
import type { Language, UserRole } from '../stypes';
import AIChatbotPanel from '../components/chatbot/AIChatbotPanel';

const studentMenuItems = [
  { id: 'dashboard', icon: LayoutDashboard, labelKey: 'dashboard', path: '/dashboard' },
  { id: 'news', icon: Bell, labelKey: 'news', path: '/dashboard/news' },
  { id: 'schedule', icon: Calendar, labelKey: 'schedule', path: '/dashboard/schedule' },
  { id: 'grades', icon: BookOpen, labelKey: 'grades', path: '/dashboard/grades' },
  { id: 'leave-request', icon: FileText, labelKey: 'leaveRequest', path: '/dashboard/leave-request' },
  { id: 'messages', icon: MessageCircle, labelKey: 'messages', path: '/dashboard/messages' },
  { id: 'stickers', icon: Sticker, labelKey: 'stickers', path: '/dashboard/stickers' },
  { id: 'forum', icon: MessageSquare, labelKey: 'forum', path: '/dashboard/forum' },
  { id: 'analysis', icon: TrendingUp, labelKey: 'analysis', path: '/dashboard/analysis' },
  { id: 'documents', icon: FolderOpen, labelKey: 'documents', path: '/dashboard/documents' },
  { id: 'quiz', icon: Gamepad2, labelKey: 'quiz', path: '/dashboard/quiz' },
];

const teacherMenuItems = [
  { id: 'dashboard', icon: LayoutDashboard, labelKey: 'dashboard', path: '/teacher/dashboard' },
  { id: 'classes', icon: GraduationCap, labelKey: 'classes', path: '/teacher/classes' },
  { id: 'students', icon: User, labelKey: 'students', path: '/teacher/students' },
  { id: 'schedule', icon: Calendar, labelKey: 'schedule', path: '/teacher/schedule' },
  { id: 'attendance', icon: TrendingUp, labelKey: 'attendance', path: '/teacher/attendance' },
  { id: 'grades', icon: BookOpen, labelKey: 'grades', path: '/teacher/grades' },
  { id: 'assignments', icon: FolderOpen, labelKey: 'assignments', path: '/teacher/assignments' },
  { id: 'leave-approval', icon: FileText, labelKey: 'leaveApproval', path: '/teacher/leave-approval' },
  { id: 'messages', icon: MessageCircle, labelKey: 'messages', path: '/teacher/messages' },
  { id: 'forum', icon: MessageSquare, labelKey: 'forum', path: '/teacher/forum' },
  { id: 'documents', icon: FolderOpen, labelKey: 'documents', path: '/teacher/documents' },
  { id: 'analysis', icon: TrendingUp, labelKey: 'analysis', path: '/teacher/analysis' },
  { id: 'announcements', icon: Bell, labelKey: 'announcements', path: '/teacher/announcements' },
  { id: 'quiz-management', icon: Gamepad2, labelKey: 'quizManagement', path: '/teacher/quiz' },
  { id: 'meetings', icon: Calendar, labelKey: 'meetings', path: '/teacher/meetings' },
  { id: 'settings', icon: FolderOpen, labelKey: 'settings', path: '/teacher/settings' },
];

const LABELS = {
  vi: {
    dashboard: 'Trang chủ',

    // Student keys
    news: 'Bảng tin',
    schedule: 'Thời khóa biểu',
    grades: 'Sổ liên lạc',
    leaveRequest: 'Xin nghỉ',
    messages: 'Nhắn tin',
    stickers: 'Nhãn dán',
    forum: 'Diễn đàn',
    analysis: 'Phân tích',
    documents: 'Tài liệu',
    quiz: 'Trò chơi',

    // Teacher keys
    classes: 'Lớp học',
    students: 'Học sinh',
    attendance: 'Điểm danh',
    gradesInput: 'Nhập điểm',
    assignments: 'Bài tập',
    leaveApproval: 'Duyệt nghỉ',
    announcements: 'Thông báo',
    quizManagement: 'Quản lý quiz',
    meetings: 'Họp trực tuyến',
    settings: 'Cài đặt',

    logout: 'Đăng xuất',
    notifications: 'Thông báo',
    noNotifications: 'Không có thông báo',
    theme: 'Chế độ',
    light: 'Sáng',
    dark: 'Tối',
    language: 'Ngôn ngữ',
    student: 'Học sinh',
    teacher: 'Giáo viên',
    parent: 'Phụ huynh',
    aiAssistant: 'Trợ lý AI',
    typeMessage: 'Nhập tin nhắn...',
    speaking: 'Đang nói...',
    listening: 'Đang nghe...',
    send: 'Gửi',
    voiceInput: 'Nhập giọng nói',
    speak: 'Phát âm thanh',
    aiGreeting: 'Xin chào! Tôi là trợ lý AI của trường. Bạn cần tôi hỗ trợ gì?',
    navigationHint: 'Bạn có thể nói "đến trang..." để điều hướng',
  },
  en: {
    dashboard: 'Home',

    // Student keys
    news: 'News',
    schedule: 'Schedule',
    grades: 'Grade Book',
    leaveRequest: 'Leave Request',
    messages: 'Messages',
    stickers: 'Stickers',
    forum: 'Forum',
    analysis: 'Analysis',
    documents: 'Documents',
    quiz: 'Quiz',

    // Teacher keys
    classes: 'Classes',
    students: 'Students',
    attendance: 'Attendance',
    gradesInput: 'Enter Grades',
    assignments: 'Assignments',
    leaveApproval: 'Leave Approval',
    announcements: 'Announcements',
    quizManagement: 'Quiz Management',
    meetings: 'Online Meetings',
    settings: 'Settings',

    logout: 'Logout',
    notifications: 'Notifications',
    noNotifications: 'No notifications',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    language: 'Language',
    student: 'Student',
    teacher: 'Teacher',
    parent: 'Parent',
    aiAssistant: 'AI Assistant',
    typeMessage: 'Type a message...',
    speaking: 'Speaking...',
    listening: 'Listening...',
    send: 'Send',
    voiceInput: 'Voice input',
    speak: 'Speak',
    aiGreeting: 'Hello! I am your school AI assistant. How can I help you?',
    navigationHint: 'You can say "go to..." to navigate',
  },
  ja: {
    dashboard: 'ホーム',
    news: 'ニュース',
    schedule: '時間割',
    grades: '成績簿',
    leaveRequest: '休暇届',
    messages: 'メッセージ',
    stickers: 'ステッカー',
    forum: 'フォーラム',
    analysis: '分析',
    documents: 'ドキュメント',
    quiz: 'クイズ',
    logout: 'ログアウト',
    notifications: '通知',
    noNotifications: '通知はありません',
    theme: 'テーマ',
    light: 'ライト',
    dark: 'ダーク',
    language: '言語',
    student: '学生',
    teacher: '先生',
    parent: '保護者',
    aiAssistant: 'AIアシスタント',
    typeMessage: 'メッセージを入力...',
    speaking: '話し中...',
    listening: '聆听中...',
    send: '送信',
    voiceInput: '音声入力',
    speak: '話す',
    aiGreeting: 'こんにちは！学校のAIアシスタントです。何かお手伝いできることはありますか？',
    navigationHint: '"～へ移動"と言ってもナビゲーションできます',
  },
  zh: {
    dashboard: '首页',
    news: '新闻',
    schedule: '课程表',
    grades: '成绩单',
    leaveRequest: '请假申请',
    messages: '消息',
    stickers: '贴纸',
    forum: '论坛',
    analysis: '分析',
    documents: '文档',
    quiz: '测验',

    classes: '班级',
    students: '学生',
    attendance: '考勤',
    gradesInput: '录入成绩',
    assignments: '作业',
    leaveApproval: '请假审批',
    announcements: '通知',
    quizManagement: '测验管理',
    meetings: '线上会议',
    settings: '设置',

    logout: '退出',
    notifications: '通知',
    noNotifications: '没有通知',
    theme: '主题',
    light: '浅色',
    dark: '深色',
    language: '语言',
    student: '学生',
    teacher: '老师',
    parent: '家长',
    aiAssistant: 'AI助手',
    typeMessage: '输入消息...',
    speaking: '说话中...',
    listening: '聆听中...',
    send: '发送',
    voiceInput: '语音输入',
    speak: '朗读',
    aiGreeting: '你好！我是学校的AI助手。有什么可以帮助你的？',
    navigationHint: '可以说"去..."来导航',
  },
  ko: {
    dashboard: '홈',
    news: '뉴스',
    schedule: '시간표',
    grades: '성적표',
    leaveRequest: '휴가 신청',
    messages: '메시지',
    stickers: '스티커',
    forum: '포럼',
    analysis: '분석',
    documents: '문서',
    quiz: '퀴즈',

    classes: '수업',
    students: '학생',
    attendance: '출석',
    gradesInput: '성적 입력',
    assignments: '과제',
    leaveApproval: '휴가 승인',
    announcements: '공지사항',
    quizManagement: '퀴즈 관리',
    meetings: '온라인 회의',
    settings: '설정',

    logout: '로그아웃',
    notifications: '알림',
    noNotifications: '알림 없음',
    theme: '테마',
    light: '라이트',
    dark: '다크',
    language: '언어',
    student: '학생',
    teacher: '선생님',
    parent: '학부모',
    aiAssistant: 'AI 어시스턴트',
    typeMessage: '메시지 입력...',
    speaking: '말하는 중...',
    listening: '듣는 중...',
    send: '전송',
    voiceInput: '음성 입력',
    speak: '말하기',
    aiGreeting: '안녕하세요! 학교 AI 어시스턴트입니다. 무엇을 도와드릴까요?',
    navigationHint: '"~로 이동"이라고 말하면 탐색할 수 있습니다',
  },
  fr: {
    dashboard: 'Accueil',
    news: 'Actualités',
    schedule: 'Emploi du temps',
    grades: 'Carnet de notes',
    leaveRequest: 'Demande de congés',
    messages: 'Messages',
    stickers: 'Autocollants',
    forum: 'Forum',
    analysis: 'Analyse',
    documents: 'Documents',
    quiz: 'Quiz',

    classes: 'Classes',
    students: 'Étudiants',
    attendance: 'Présence',
    gradesInput: 'Saisie des notes',
    assignments: 'Devoirs',
    leaveApproval: 'Validation absence',
    announcements: 'Annonces',
    quizManagement: 'Gestion quiz',
    meetings: 'Réunions en ligne',
    settings: 'Paramètres',

    logout: 'Déconnexion',
    notifications: 'Notifications',
    noNotifications: 'Pas de notifications',
    theme: 'Thème',
    light: 'Clair',
    dark: 'Sombre',
    language: 'Langue',
    student: 'Étudiant',
    teacher: 'Professeur',
    parent: 'Parent',
    aiAssistant: 'Assistant IA',
    typeMessage: 'Tapez un message...',
    speaking: 'En train de parler...',
    listening: 'En train d\'écouter...',
    send: 'Envoyer',
    voiceInput: 'Entrée vocale',
    speak: 'Parler',
    aiGreeting: 'Bonjour! Je suis l\'assistant IA de l\'école. Comment puis-je vous aider?',
    navigationHint: 'Vous pouvez dire "aller à..." pour naviguer',
  },
  es: {
    dashboard: 'Inicio',
    news: 'Noticias',
    schedule: 'Horario',
    grades: 'Boletín',
    leaveRequest: 'Solicitud de permiso',
    messages: 'Mensajes',
    stickers: 'Pegatinas',
    forum: 'Foro',
    analysis: 'Análisis',
    documents: 'Documentos',
    quiz: 'Quiz',

    classes: 'Clases',
    students: 'Estudiantes',
    attendance: 'Asistencia',
    gradesInput: 'Ingresar calificaciones',
    assignments: 'Tareas',
    leaveApproval: 'Aprobación de ausencia',
    announcements: 'Anuncios',
    quizManagement: 'Gestión de quiz',
    meetings: 'Reuniones en línea',
    settings: 'Configuraciones',

    logout: 'Cerrar sesión',
    notifications: 'Notificaciones',
    noNotifications: 'Sin notificaciones',
    theme: 'Tema',
    light: 'Claro',
    dark: 'Oscuro',
    language: 'Idioma',
    student: 'Estudiante',
    teacher: 'Profesor',
    parent: 'Padre',
    aiAssistant: 'Asistente IA',
    typeMessage: 'Escribe un mensaje...',
    speaking: 'Hablando...',
    listening: 'Escuchando...',
    send: 'Enviar',
    voiceInput: 'Entrada de voz',
    speak: 'Hablar',
    aiGreeting: '¡Hola! Soy el asistente de IA de la escuela. ¿Cómo puedo ayudarte?',
    navigationHint: 'Puedes decir "ir a..." para navegar',
  },
  de: {
    dashboard: 'Startseite',
    news: 'Nachrichten',
    schedule: 'Stundenplan',
    grades: 'Notenbuch',
    leaveRequest: 'Urlaubsantrag',
    messages: 'Nachrichten',
    stickers: 'Aufkleber',
    forum: 'Forum',
    analysis: 'Analyse',
    documents: 'Dokumente',
    quiz: 'Quiz',
    logout: 'Abmelden',
    notifications: 'Benachrichtigungen',
    noNotifications: 'Keine Benachrichtigungen',
    theme: 'Thema',
    light: 'Hell',
    dark: 'Dunkel',
    language: 'Sprache',
    student: 'Schüler',
    teacher: 'Lehrer',
    parent: 'Eltern',
    aiAssistant: 'KI-Assistent',
    typeMessage: 'Nachricht eingeben...',
    speaking: 'Sprechen...',
    listening: 'Hören...',
    send: 'Senden',
    voiceInput: 'Spracheingabe',
    speak: 'Sprechen',
    aiGreeting: 'Hallo! Ich bin der KI-Assistent der Schule. Wie kann ich Ihnen helfen?',
    navigationHint: 'Sie können "gehe zu..." sagen, um zu navigieren',
  },
} as const;

const LANGUAGES: { code: Language; name: string; flag: string }[] = [
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
];

// Greeting cố định theo yêu cầu (luôn hiển thị khi mở chat)
const AI_GREETING_VI_FIXED =
  'Xin chào! Tôi là trợ lý học tập thông minh của trường. Bạn cần hỗ trợ gì?';

interface LayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps): ReactNode {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, notifications, theme, setTheme, language, setLanguage } = useAppStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const getLabelsForLanguage = (lang: Language) => LABELS[lang] ?? LABELS.vi;
  const t = getLabelsForLanguage(language);
  const unreadNotifications = notifications.filter((n) => !n.isRead).length;
  const currentPath = location.pathname;

  const getLabel = (key: string) => {
    return (t as Record<string, string>)[key] || key;
  };

  const sidebarItems = user?.role === 'teacher' ? teacherMenuItems : studentMenuItems;

  useEffect(() => {
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // NOTE: Chatbot UI/state is implemented inside <AIChatbotPanel />
  // This layout only renders the panel.

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'student':
        return 'from-pink-400 to-purple-500';
      case 'teacher':
        return 'from-blue-400 to-cyan-500';
      case 'parent':
        return 'from-orange-400 to-amber-500';
      default:
        return 'from-pink-400 to-purple-500';
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'student':
        return t.student;
      case 'teacher':
        return t.teacher;
      case 'parent':
        return t.parent;
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50'}`}>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-2xl z-50 transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Logo 
        <div className="h-20 flex items-center justify-between px-4 border-b border-gray-100 dark:border-gray-700">
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Trường Học Vui</span>
            </div>
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          )}

        </div>*/}

        {/* User Info */}
        <div className={`p-4 border-b border-gray-100 dark:border-gray-700 ${!sidebarOpen && 'flex justify-center'}`}>
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${getRoleColor(user?.role || 'student')} flex items-center justify-center`}>
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{user?.name}</p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{getRoleLabel(user?.role || 'student')}</p>
              </div>
            </div>
          ) : (
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${getRoleColor(user?.role || 'student')} flex items-center justify-center`}>
              <User className="w-6 h-6 text-white" />
            </div>
          )}
        </div>

        {/* Menu Items */}
        <nav className="p-3 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = currentPath === item.path;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : theme === 'dark'
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="font-medium">{getLabel(item.labelKey)}</span>}
                {sidebarOpen && isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
              </button>
            );
          })}
        </nav>


      </aside>

      {/* Header */}
      <header className={`fixed top-0 right-0 h-20 z-40 transition-all duration-300 ${sidebarOpen ? 'left-64' : 'left-20'} ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="h-full px-6 flex items-center justify-between border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}">
          {/* Left: Page Title or Breadcrumb */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 rounded-xl transition-all duration-200 ${
                theme === 'dark' ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-purple-50 text-gray-600'
              }`}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              {getLabel(currentPath.split('/').pop() || 'dashboard')}
            </h1>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => { setShowNotifications(!showNotifications); setShowLanguageMenu(false); setShowThemeMenu(false); }}
                className={`relative p-3 rounded-xl transition-all duration-200 ${
                  theme === 'dark' ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-purple-50 text-gray-600'
                }`}
              >
                <Bell className="w-5 h-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>
            </div>

            {/* Theme Toggle */}
            <div className="relative">
              <button
                onClick={() => { setShowThemeMenu(!showThemeMenu); setShowLanguageMenu(false); setShowNotifications(false); }}
                className={`p-3 rounded-xl transition-all duration-200 ${
                  theme === 'dark' ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-purple-50 text-gray-600'
                }`}
              >
                {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
              {showThemeMenu && (
                <div className={`absolute top-full right-0 mt-2 w-40 rounded-2xl overflow-hidden shadow-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                  <button
                    onClick={() => { setTheme('light'); setShowThemeMenu(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-purple-50 dark:hover:bg-gray-600 ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`}
                  >
                    <Sun className="w-5 h-5" />
                    {t.light}
                  </button>
                  <button
                    onClick={() => { setTheme('dark'); setShowThemeMenu(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-purple-50 dark:hover:bg-gray-600 ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`}
                  >
                    <Moon className="w-5 h-5" />
                    {t.dark}
                  </button>
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => { setShowLanguageMenu(!showLanguageMenu); setShowThemeMenu(false); setShowNotifications(false); }}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 ${
                  theme === 'dark' ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-purple-50 text-gray-600'
                }`}
              >
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium">{LANGUAGES.find(l => l.code === language)?.flag}</span>
              </button>
              {showLanguageMenu && (
                <div className={`absolute top-full right-0 mt-2 w-48 rounded-2xl overflow-hidden shadow-lg max-h-60 overflow-y-auto ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang.code); setShowLanguageMenu(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-purple-50 dark:hover:bg-gray-600 ${
                        language === lang.code ? 'bg-purple-100 dark:bg-purple-700' : ''
                      } ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Profile Avatar */}
            <div className="relative">
              <button
                className="flex items-center gap-3 p-1 rounded-xl transition-all duration-200"
              >
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getRoleColor(user?.role || 'student')} flex items-center justify-center`}>
                  {user?.avatar ? (
                    <img src={user.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <User className="w-5 h-5 text-white" />
                  )}
                </div>
              </button>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className={`p-3 rounded-xl transition-all duration-200 ${
                theme === 'dark' ? 'hover:bg-red-900/50 text-red-400' : 'hover:bg-red-50 text-red-500'
              }`}
              title={t.logout}
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`pt-20 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {children}
      </main>

      <AIChatbotPanel
        theme={theme}
        language={language}
        getLabel={getLabel}
        t={t as unknown as Record<string, string>}
        aiGreetingViFixed={AI_GREETING_VI_FIXED}     
      />

      {/* Notifications Panel */}
      {showNotifications && (
        <div className={`fixed top-20 right-6 w-80 max-h-96 rounded-2xl shadow-2xl z-50 overflow-hidden ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className={`p-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}>
            <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{t.notifications}</h3>
          </div>
          <div className="overflow-y-auto max-h-72">
            {notifications.length === 0 ? (
              <p className={`p-4 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{t.noNotifications}</p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b ${theme === 'dark' ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-50 hover:bg-purple-50'} ${
                    !notification.isRead ? 'bg-purple-50 dark:bg-purple-900/20' : ''
                  }`}
                >
                  <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{notification.title}</h4>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{notification.content}</p>
                  <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>{notification.date}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
