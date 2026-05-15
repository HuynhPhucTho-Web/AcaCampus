import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bot,
  BookOpen,
  Calendar,
  FileText,
  MessageCircle,
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import type { ChatMessage, Language } from '../../stypes';
import { useAppStore } from '../../store/useAppStore';

type Props = {
  theme: string;
  language: Language;
  getLabel: (key: string) => string;
  t: Record<string, string>;
  aiGreetingViFixed: string;
};

export default function AIChatbotPanel({
  theme,
  language,
  getLabel,
  t,
  aiGreetingViFixed,
}: Props) {
  const navigate = useNavigate();
  const { chatMessages, addChatMessage } = useAppStore();

  const [showAIChat, setShowAIChat] = useState(false);
  const hasSpokenGreetingRef = useRef(false);

  const [aiInput, setAiInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Voice gửi tin nhắn => disable nút Send để đúng yêu cầu
  const [isAutoSendingFromVoice, setIsAutoSendingFromVoice] = useState(false);

  useEffect(() => {
    if (chatMessages.length === 0) {
      const greetingMessage: ChatMessage = {
        id: 'greeting',
        role: 'assistant',
        // keep getLabel used to avoid TS/Eslint unused-var
        content: getLabel('aiGreeting') || aiGreetingViFixed,
        timestamp: new Date().toISOString(),
      };
      addChatMessage(greetingMessage);
    }
  }, [addChatMessage, chatMessages.length, aiGreetingViFixed, getLabel]);

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
    const responsePayload = (() => {
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

        if (language === 'vi') return `Tôi sẽ đưa bạn đến trang "${pageName}" ngay bây giờ!`;
        if (language === 'en') return `I'll take you to "${pageName}" right now!`;
        if (language === 'ja') return `今"${pageName}"ページへ連れて行きます！`;
        if (language === 'zh') return `我现在带你去"${pageName}"页面！`;
        if (language === 'ko') return `지금 "${pageName}" 페이지로 안내해 드릴게요!`;
        if (language === 'fr') return `Je vous emmène à la page "${pageName}" maintenant!`;
        if (language === 'es') return `¡Te llevo a la página "${pageName}" ahora!`;
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

    return { response: responsePayload, navigatePath };
  };

  const handleSendMessage = () => {
    if (!aiInput.trim()) return;

    setIsAutoSendingFromVoice(false);

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: aiInput,
      timestamp: new Date().toISOString(),
    };
    addChatMessage(userMessage);

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

      if (navigatePath) {
        setTimeout(() => {
          handleNavigationFromAI(navigatePath);
        }, 1500);
      }
    }, 1000);
  };

  const handleSendMessageFromVoice = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setIsAutoSendingFromVoice(true);

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: trimmed,
      timestamp: new Date().toISOString(),
    };
    addChatMessage(userMessage);

    const { response, navigatePath } = processAIResponse(trimmed);

    setAiInput(''); // voice => không cần để nút bấm

    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
      };
      addChatMessage(aiMessage);

      if (navigatePath) {
        setTimeout(() => handleNavigationFromAI(navigatePath), 1500);
      }
      setIsAutoSendingFromVoice(false);
    }, 1000);
  };

  const handleVoiceInput = () => {
    const hasNative = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;

    if (!hasNative) {
      alert(language === 'vi' ? 'Trình duyệt không hỗ trợ nhận dạng giọng nói!' : 'Browser does not support speech recognition!');
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

    type SpeechRecognitionResultLike = { transcript: string };
    type SpeechRecognitionEventLike = { results?: Array<Array<SpeechRecognitionResultLike>> };

    recognition.onresult = (event: SpeechRecognitionEventLike) => {
      const transcript = event.results?.[0]?.[0]?.transcript;
      if (typeof transcript === 'string' && transcript.trim()) {
        setIsListening(false);

        // ====== CHANGE: auto-send ngay khi có transcript ======
        handleSendMessageFromVoice(transcript);

        // Không setTimeout gọi handleSendMessage nữa (vì aiInput/node Send sẽ gây chậm hoặc cần bấm)
        // =========================================================
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
      setIsAutoSendingFromVoice(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleSpeak = (text: string) => {
    if (!('speechSynthesis' in window)) return;

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

  return (
    <>
      {/* 3D AI Chatbot Button */}
      <button
        onClick={() => {
          setShowAIChat((prev) => {
            const next = !prev;
            if (next) {
              if (!hasSpokenGreetingRef.current && !isSpeaking) {
                hasSpokenGreetingRef.current = true;
                handleSpeak(aiGreetingViFixed);
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

      {showAIChat && (
        <div
          className={`fixed bottom-4 sm:bottom-6 right-3 sm:right-6 w-[360px] max-w-[calc(100vw-2rem)] max-h-[70vh] rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className={`w-12 h-12 bg-white/20 rounded-full flex items-center justify-center ${isListening ? 'animate-pulse' : ''}`}>
                    <Bot size={28} />
                  </div>
                  <div
                    className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${
                      isListening ? 'bg-red-500 animate-ping' : isSpeaking ? 'bg-green-500 animate-pulse' : 'bg-green-400'
                    }`}
                  />
                </div>
                <div>
                  <h3 className="font-bold">{t.aiAssistant}</h3>
                  <p className="text-xs text-white/80">{isListening ? '🎙️ ' + t.listening : isSpeaking ? '🔊 ' + t.speaking : 'Online'}</p>
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

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
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
                        onClick={() => (isSpeaking ? handleSpeak('') : handleSpeak(msg.content))}
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

          {/* Input */}
          <div className={`p-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}>
            <div className="flex items-center gap-2">
              <button
                onClick={handleVoiceInput}
                className={`p-3 rounded-full transition-all ${
                  isListening ? 'bg-red-500 text-white animate-pulse' : theme === 'dark' ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title={isListening ? t.listening : t.voiceInput}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <input
                type="text"
                value={aiInput}
                onChange={(e) => {
                  setAiInput(e.target.value);
                  // nếu user bắt đầu type thủ công thì re-enable nút Send
                  setIsAutoSendingFromVoice(false);
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={t.typeMessage}
                className={`flex-1 px-4 py-3 rounded-full outline-none focus:ring-2 focus:ring-cyan-500 ${
                  theme === 'dark' ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-800 placeholder-gray-400'
                }`}
              />

              <button
                onClick={handleSendMessage}
                disabled={!aiInput.trim() || isAutoSendingFromVoice}
                className="p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
