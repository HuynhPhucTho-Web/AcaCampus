import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
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
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  Sun,
  Moon,
  Globe,
  Bot,
} from 'lucide-react';
import type { UserRole, ChatMessage, Language } from '../stypes';

const menuItems = [
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

const LABELS = {
  vi: {
    dashboard: 'Trang chủ',
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
};

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
  const { user, logout, notifications, chatMessages, addChatMessage, theme, setTheme, language, setLanguage } = useAppStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const hasSpokenGreetingRef = useRef(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const t = LABELS[language] || LABELS.vi;
  const unreadNotifications = notifications.filter((n) => !n.isRead).length;
  const currentPath = location.pathname;

  const getLabel = (key: string) => {
    return (t as Record<string, string>)[key] || key;
  };

  useEffect(() => {
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    // Add initial AI greeting if no messages
    if (chatMessages.length === 0) {
      const greetingMessage: ChatMessage = {
        id: 'greeting',
        role: 'assistant',
        content: AI_GREETING_VI_FIXED,
        timestamp: new Date().toISOString(),
      };
      addChatMessage(greetingMessage);
    }
  }, [addChatMessage, chatMessages.length]);
  

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNavigationFromAI = (path: string) => {
    navigate(path);
    setShowAIChat(false);
  };

  const processAIResponse = (input: string) => {
    const lowerInput = input.toLowerCase();
    let navigatePath = '';

    // Navigation patterns
    const navPatterns: Record<string, { path: string; keywords: string[] }> = {
      '/dashboard': { path: '/dashboard', keywords: ['trang chủ', 'home', 'ダッシュボード', '首页', '홈', 'accueil', 'inicio', 'startseite'] },
      '/dashboard/news': { path: '/dashboard/news', keywords: ['bảng tin', 'tin tức', 'news', 'ニュース', '新闻', '뉴스', 'actualités', 'noticias', 'nachrichten'] },
      '/dashboard/schedule': { path: '/dashboard/schedule', keywords: ['thời khóa biểu', 'lịch học', 'schedule', '時間割', '课程表', '시간표', 'emploi du temps', 'horario', 'stundenplan'] },
      '/dashboard/grades': { path: '/dashboard/grades', keywords: ['sổ liên lạc', 'điểm', 'grades', '成績', '成绩', '성적', 'notes', 'notas', 'noten'] },
      '/dashboard/leave-request': { path: '/dashboard/leave-request', keywords: ['xin nghỉ', 'nghỉ học', 'leave', '休暇', '请假', '휴가', 'congés', 'permiso', 'urlaub'] },
      '/dashboard/messages': { path: '/dashboard/messages', keywords: ['nhắn tin', 'tin nhắn', 'messages', 'メッセージ', '消息', '메시지', 'messages', 'mensajes', 'nachrichten'] },
      '/dashboard/stickers': { path: '/dashboard/stickers', keywords: ['nhãn dán', 'stickers', 'ステッカー', '贴纸', '스티커', 'autocollants', 'pegatinas', 'aufkleber'] },
      '/dashboard/forum': { path: '/dashboard/forum', keywords: ['diễn đàn', 'forum', 'フォーラム', '论坛', '포럼', 'forum', 'foro'] },
      '/dashboard/analysis': { path: '/dashboard/analysis', keywords: ['phân tích', 'analysis', '分析', '분석', 'analyse', 'análisis'] },
      '/dashboard/documents': { path: '/dashboard/documents', keywords: ['tài liệu', 'documents', 'ドキュメント', '文档', '문서', 'documents', 'documentos', 'dokumente'] },
      '/dashboard/quiz': { path: '/dashboard/quiz', keywords: ['trò chơi', 'quiz', 'ゲーム', '测验', '퀴즈', 'quiz', 'jeu'] },
    };

    // Check for navigation commands
    for (const [, data] of Object.entries(navPatterns)) {
      if (data.keywords.some((kw) => lowerInput.includes(kw))) {
        navigatePath = data.path;
        break;
      }
    }

    // Generate response based on input
    const response = (() => {
      if (navigatePath) {
        const pageNames: Record<string, string> = {
          '/dashboard': t.dashboard,
          '/dashboard/news': t.news,
          '/dashboard/schedule': t.schedule,
          '/dashboard/grades': t.grades,
          '/dashboard/leave-request': t.leaveRequest,
          '/dashboard/messages': t.messages,
          '/dashboard/stickers': t.stickers,
          '/dashboard/forum': t.forum,
          '/dashboard/analysis': t.analysis,
          '/dashboard/documents': t.documents,
          '/dashboard/quiz': t.quiz,
        };

        const pageName = pageNames[navigatePath] || t.dashboard;

        const lang = language;
        if (lang === 'vi') return `Tôi sẽ đưa bạn đến trang "${pageName}" ngay bây giờ!`;
        if (lang === 'en') return `I'll take you to "${pageName}" right now!`;
        if (lang === 'ja') return `今"${pageName}"ページへ連れて行きます！`;
        if (lang === 'zh') return `我现在带你去"${pageName}"页面！`;
        if (lang === 'ko') return `지금 "${pageName}" 페이지로 안내해 드릴게요!`;
        if (lang === 'fr') return `Je vous emmène à la page "${pageName}" maintenant!`;
        if (lang === 'es') return `¡Te llevo a la página "${pageName}" ahora!`;
        return `Ich bringe dich jetzt zur "${pageName}" Seite!`;
      }

      const generalResponses: Record<string, string[]> = {
        vi: [
          'Tôi hiểu rồi! Bạn cần tôi hỗ trợ gì về việc học tập?',
          'Để tôi tìm thông tin cho bạn...',
          'Bạn có thể nói "đến trang..." để tôi điều hướng cho bạn nhé!',
          'Tuyệt vời! Tôi khuyên bạn nên xem lịch học trong mục "Thời khóa biểu" nhé!',
          'Bạn muốn tôi phân tích kết quả học tập của bạn không?',
        ],
        en: [
          'I understand! How can I help you with your studies?',
          'Let me find information for you...',
          'You can say "go to..." so I can navigate for you!',
          'Great! I recommend checking the schedule in "Schedule"!',
          'Would you like me to analyze your study results?',
        ],
        ja: [
          '分かりました！学習について何かお手伝いできることはありますか？',
          '情報を探しています...',
          '"～へ移動"と言うとナビゲートできます！',
          '素晴らしい！時間割を確認することをお勧めします！',
          '学習結果を分析しましょうか？',
        ],
        zh: [
          '我明白了！有什么可以帮你的？',
          '让我帮你找信息...',
          '你可以说"去..."来导航！',
          '太棒了！建议你查看课程表！',
          '要我分析你的学习结果吗？',
        ],
        ko: [
          '알겠어요! 공부에 대해 무엇을 도와드릴까요?',
          '정보를 찾아드릴게요...',
          '"~로 이동"이라고 말하면 안내해 드릴 수 있어요!',
          '훌륭해요! 시간표를 확인하는 것을 권장합니다!',
          '학습 결과를 분석해 드릴까요?',
        ],
        fr: [
          'Je comprends ! Comment puis-je vous aider avec vos études ?',
          'Laissez-moi trouver des informations pour vous...',
          'Vous pouvez dire "aller à..." pour naviguer !',
          'Super ! Je recommande de vérifier l\'emploi du temps !',
          'Voulez-vous que j\'analyse vos résultats d\'étude ?',
        ],
        es: [
          '¡Entendido! ¿Cómo puedo ayudarte con tus estudios?',
          'Déjame buscar información para ti...',
          '¡Puedes decir "ir a..." para navegar!',
          '¡Excelente! Recomiendo revisar el horario!',
          '¿Quieres que analice tus resultados de estudio?',
        ],
        de: [
          'Ich verstehe! Wie kann ich Ihnen beim Lernen helfen?',
          'Lassen Sie mich Informationen für Sie finden...',
          'Sie können "gehen zu..." sagen, um zu navigieren!',
          'Großartig! Ich empfehle, den Stundenplan zu überprüfen!',
          'Soll ich Ihre Lernergebnisse analysieren?',
        ],
      };

      const responses = generalResponses[language] || generalResponses.vi;
      return responses[Math.floor(Math.random() * responses.length)];
    })();

    return { response, navigatePath };
  };

  const handleSendMessage = () => {
    if (!aiInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: aiInput,
      timestamp: new Date().toISOString(),
    };
    addChatMessage(userMessage);

    // Process AI response
    const { response, navigatePath } = processAIResponse(aiInput);
    setAiInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
      };
      addChatMessage(aiMessage);
      
      // Navigate if needed
      if (navigatePath) {
        setTimeout(() => {
          handleNavigationFromAI(navigatePath);
        }, 1500);
      }
    }, 1000);
  };

  const handleVoiceInput = () => {
    const hasNative =
      'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;

    if (!hasNative) {
      alert(
        language === 'vi'
          ? 'Trình duyệt không hỗ trợ nhận dạng giọng nói!'
          : 'Browser does not support speech recognition!'
      );
      return;
    }

    type SpeechRecognitionCtor = new () => {
      lang: string;
      continuous: boolean;
      interimResults: boolean;
      onstart: null | (() => void);
      onresult: null | ((event: SpeechRecognitionEventLike) => void);
      onerror: null | (() => void);
      onend: null | (() => void);
      start: () => void;
    };

    const SpeechRecognitionCtor =
      (window as unknown as { SpeechRecognition?: SpeechRecognitionCtor }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: SpeechRecognitionCtor }).webkitSpeechRecognition;

    if (!SpeechRecognitionCtor) return;

    const recognition = new SpeechRecognitionCtor();

    const langMap: Record<string, string> = {
      vi: 'vi-VN',
      en: 'en-US',
      ja: 'ja-JP',
      zh: 'zh-CN',
      ko: 'ko-KR',
      fr: 'fr-FR',
      es: 'es-ES',
      de: 'de-DE',
    };

    recognition.lang = langMap[language] || 'vi-VN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    type SpeechRecognitionResultLike = {
      transcript: string;
    };

    type SpeechRecognitionEventLike = {
      results?: Array<Array<SpeechRecognitionResultLike>>;
    };

    recognition.onresult = (event: SpeechRecognitionEventLike) => {
      const transcript = event.results?.[0]?.[0]?.transcript;
      if (typeof transcript === 'string' && transcript.trim()) {
        setAiInput(transcript);
        setIsListening(false);
        setTimeout(() => handleSendMessage(), 500);
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleSpeak = (text: string) => {
    if (!('speechSynthesis' in window)) {
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    const langMap: Record<string, string> = {
      vi: 'vi-VN',
      en: 'en-US',
      ja: 'ja-JP',
      zh: 'zh-CN',
      ko: 'ko-KR',
      fr: 'fr-FR',
      es: 'es-ES',
      de: 'de-DE',
    };
    
    utterance.lang = langMap[language] || 'vi-VN';
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };


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
          {menuItems.map((item) => {
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

      {/* 3D AI Chatbot Button */}
      <button
        onClick={() => {
          setShowAIChat((prev) => {
            const next = !prev;
            if (next) {
              if (!hasSpokenGreetingRef.current && !isSpeaking) {
                hasSpokenGreetingRef.current = true;
                // speak fixed greeting immediately when opening (only once)
                handleSpeak(AI_GREETING_VI_FIXED);
              }
            }
            return next;
          });
        }}
        className="fixed bottom-6 right-6 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center z-50 animate-bounce"
      >
        <div className="relative">
          <Bot className="w-10 h-10 text-white" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-ping" />
        </div>
      </button>

      {/* AI Chat Panel - Enhanced */}
      {showAIChat && (
        <div
          className={`fixed bottom-4 sm:bottom-6 right-3 sm:right-6 w-[360px] max-w-[calc(100vw-2rem)] max-h-[70vh] rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          {/* Header with status */}
          <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className={`w-12 h-12 bg-white/20 rounded-full flex items-center justify-center ${isListening ? 'animate-pulse' : ''}`}>
                    <Bot size={28} />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${isListening ? 'bg-red-500 animate-ping' : isSpeaking ? 'bg-green-500 animate-pulse' : 'bg-green-400'}`} />
                </div>
                <div>
                  <h3 className="font-bold">{t.aiAssistant}</h3>
                  <p className="text-xs text-white/80">
                    {isListening ? '🎙️ ' + t.listening : isSpeaking ? '🔊 ' + t.speaking : 'Online'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  hasSpokenGreetingRef.current = false;
                  setShowAIChat(false);
                }}
                className="p-2 hover:bg-white/20 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Voice hint */}
            <div className="mt-3 px-3 py-2 bg-white/10 rounded-lg">
              <p className="text-xs text-white/80">🎤 Nói để điều khiển: "Đến trang lịch học", "Xem điểm số"</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className={`px-4 py-3 flex gap-2 overflow-x-auto border-b ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-100 bg-gray-50'}`}>
            {[
              { label: t.schedule, path: '/dashboard/schedule', icon: Calendar },
              { label: t.grades, path: '/dashboard/grades', icon: BookOpen },
              { label: t.leaveRequest, path: '/dashboard/leave-request', icon: FileText },
              { label: t.messages, path: '/dashboard/messages', icon: MessageCircle },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.path}
                  onClick={() => {
                    navigate(action.path);
                    const transferredText = `Đã chuyển đến ${action.label}`;
                    const aiMessage: ChatMessage = {
                      id: Date.now().toString(),
                      role: 'assistant',
                      content: transferredText,
                      timestamp: new Date().toISOString(),
                    };
                    addChatMessage(aiMessage);
                    if (!isSpeaking) handleSpeak(transferredText);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  <Icon size={12} />
                  {action.label}
                </button>
              );
            })}
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                      : theme === 'dark'
                      ? 'bg-gray-700 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{msg.content}</p>
                  {msg.role === 'assistant' && (
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => isSpeaking ? handleSpeak('') : handleSpeak(msg.content)}
                        className="text-xs opacity-70 hover:opacity-100 flex items-center gap-1 px-2 py-1 rounded-full bg-white/10"
                      >
                        {isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                        {isSpeaking ? t.speaking : t.speak}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isListening && (
              <div className="flex justify-start">
                <div className={`px-4 py-3 rounded-2xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                    <span className="text-sm text-red-500">{t.listening}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className={`p-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}>
            <div className="flex items-center gap-2">
              <button
                onClick={handleVoiceInput}
                className={`p-3 rounded-full transition-all ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse'
                    : theme === 'dark'
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title={isListening ? t.listening : t.voiceInput}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={t.typeMessage}
                className={`flex-1 px-4 py-3 rounded-full outline-none focus:ring-2 focus:ring-cyan-500 ${
                  theme === 'dark' ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-800 placeholder-gray-400'
                }`}
              />
              <button
                onClick={handleSendMessage}
                disabled={!aiInput.trim()}
                className="p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

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
