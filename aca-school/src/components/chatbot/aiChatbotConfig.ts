import type { Language } from '../../stypes';

export const VOICE_SUBMIT_IDLE_MS = 3000;

export const LANG_MAP: Record<Language, string> = {
  vi: 'vi-VN',
  en: 'en-US',
  ja: 'ja-JP',
  zh: 'zh-CN',
  ko: 'ko-KR',
  fr: 'fr-FR',
  es: 'es-ES',
  de: 'de-DE',
};

export const NAV_PATTERNS: Record<string, { path: string; keywords: string[] }> = {
  '/dashboard': {
    path: '/dashboard',
    keywords: ['trang chủ', 'home', 'ダッシュボード', '首页', '홈', 'accueil', 'inicio', 'startseite'],
  },
  '/dashboard/news': {
    path: '/dashboard/news',
    keywords: ['bảng tin', 'tin tức', 'news', 'ニュース', '新闻', '뉴스', 'actualités', 'noticias', 'nachrichten'],
  },
  '/dashboard/schedule': {
    path: '/dashboard/schedule',
    keywords: [
      'thời khóa biểu',
      'lịch học',
      'schedule',
      '時間割',
      '课程表',
      '시간표',
      'emploi du temps',
      'horario',
      'stundenplan',
    ],
  },
  '/dashboard/grades': {
    path: '/dashboard/grades',
    keywords: ['sổ liên lạc', 'điểm', 'grades', '成績', '成绩', '성적', 'notes', 'notas', 'noten'],
  },
  '/dashboard/leave-request': {
    path: '/dashboard/leave-request',
    keywords: ['xin nghỉ', 'nghỉ học', 'leave', '休暇', '请假', '휴가', 'congés', 'permiso', 'urlaub'],
  },
  '/dashboard/messages': {
    path: '/dashboard/messages',
    keywords: ['nhắn tin', 'tin nhắn', 'messages', 'メッセージ', '消息', '메시지', 'messages', 'mensajes', 'nachrichten'],
  },
  '/dashboard/stickers': {
    path: '/dashboard/stickers',
    keywords: ['nhãn dán', 'stickers', 'ステッカー', '贴纸', '스티커', 'autocollants', 'pegatinas', 'aufkleber'],
  },
  '/dashboard/forum': {
    path: '/dashboard/forum',
    keywords: ['diễn đàn', 'forum', 'フォーラム', '论坛', '포럼', 'forum', 'foro'],
  },
  '/dashboard/analysis': {
    path: '/dashboard/analysis',
    keywords: ['phân tích', 'analysis', '分析', '분석', 'analyse', 'análisis'],
  },
  '/dashboard/documents': {
    path: '/dashboard/documents',
    keywords: ['tài liệu', 'documents', 'ドキュメント', '文档', '문서', 'documents', 'documentos', 'dokumente'],
  },
  '/dashboard/quiz': {
    path: '/dashboard/quiz',
    keywords: ['trò chơi', 'quiz', 'ゲーム', '测验', '퀴즈', 'quiz', 'jeu'],
  },
};

export const PAGE_NAMES_KEYS: Record<string, string> = {
  '/dashboard': 'dashboard',
  '/dashboard/news': 'news',
  '/dashboard/schedule': 'schedule',
  '/dashboard/grades': 'grades',
  '/dashboard/leave-request': 'leaveRequest',
  '/dashboard/messages': 'messages',
  '/dashboard/stickers': 'stickers',
  '/dashboard/forum': 'forum',
  '/dashboard/analysis': 'analysis',
  '/dashboard/documents': 'documents',
  '/dashboard/quiz': 'quiz',
};

export const GENERAL_RESPONSES: Record<Language, string[]> = {
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
