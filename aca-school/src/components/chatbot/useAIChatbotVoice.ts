import { useCallback, useMemo, useRef, useState } from 'react';
import type { Language } from '../../stypes';
import { LANG_MAP, VOICE_SUBMIT_IDLE_MS } from './aiChatbotConfig';

type UseAIChatbotVoiceParams = {
  language: Language;
  onTranscript: (transcript: string) => void;
  onSpeakingStateChange?: (isSpeaking: boolean) => void;
  onListeningStateChange?: (isListening: boolean) => void;
};

type SpeechRecognitionResultLike = { transcript: string };

type SpeechRecognitionEventLike = {
  results?: Array<Array<SpeechRecognitionResultLike & { isFinal?: boolean }>>;
};

type SpeechRecognitionInstance = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onstart: null | (() => void);
  onresult: null | ((event: SpeechRecognitionEventLike) => void);
  onerror: null | (() => void);
  onend: null | (() => void);
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionCtor = new () => SpeechRecognitionInstance;

type WindowWithSpeechRecognition = Window & {
  SpeechRecognition?: SpeechRecognitionCtor;
  webkitSpeechRecognition?: SpeechRecognitionCtor;
};

export function useAIChatbotVoice({
  language,
  onTranscript,
  onSpeakingStateChange,
  onListeningStateChange,
}: UseAIChatbotVoiceParams) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isAutoSendingFromVoice, setIsAutoSendingFromVoice] = useState(false);

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const idleSubmitTimerRef = useRef<number | null>(null);

  // buffer session flags (giữ giống behavior cũ)
  const voiceIsSubmittingRef = useRef(false);

  const lang = useMemo(() => {
    const map = LANG_MAP as Record<Language, string>;
    return map[language] ?? 'vi-VN';
  }, [language]);

  const clearIdleTimer = useCallback(() => {
    if (idleSubmitTimerRef.current) {
      window.clearTimeout(idleSubmitTimerRef.current);
      idleSubmitTimerRef.current = null;
    }
  }, []);

  const scheduleIdleSubmit = useCallback(() => {
    clearIdleTimer();

    idleSubmitTimerRef.current = window.setTimeout(() => {
      try {
        recognitionRef.current?.stop();
      } catch {
        // ignore
      }

      setIsAutoSendingFromVoice(false);
      voiceIsSubmittingRef.current = false;
      // GIỮ NGUYÊN behavior cũ: KHÔNG auto-submit ở đây.
    }, VOICE_SUBMIT_IDLE_MS);
  }, [clearIdleTimer]);

  const stopListening = useCallback(() => {
    clearIdleTimer();
    try {
      recognitionRef.current?.stop();
    } catch {
      // ignore
    }

    setIsListening(false);
    setIsAutoSendingFromVoice(false);
    voiceIsSubmittingRef.current = false;
  }, [clearIdleTimer]);

  const speak = useCallback(
    (text: string) => {
      if (!('speechSynthesis' in window)) return;
      if (!text?.trim()) return;

      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      onSpeakingStateChange?.(false);

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 1;
      utterance.pitch = 1;

      utterance.onstart = () => {
        setIsSpeaking(true);
        onSpeakingStateChange?.(true);
      };
      utterance.onend = () => {
        setIsSpeaking(false);
        onSpeakingStateChange?.(false);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        onSpeakingStateChange?.(false);
      };

      window.speechSynthesis.speak(utterance);
    },
    [lang, onSpeakingStateChange]
  );

  const startListening = useCallback(() => {
    const w = window as WindowWithSpeechRecognition;

    const SpeechRecognitionCtorLocal = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (!SpeechRecognitionCtorLocal) return;

    voiceIsSubmittingRef.current = false;
    setIsAutoSendingFromVoice(false);
    setIsListening(true);
    onListeningStateChange?.(true);

    clearIdleTimer();
    onTranscript('');

    const recognition = new SpeechRecognitionCtorLocal();
    recognitionRef.current = recognition;

    recognition.lang = lang;
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
      onListeningStateChange?.(true);
    };

    recognition.onresult = (event: SpeechRecognitionEventLike) => {
      const results = event.results || [];
      let latest = '';

      for (const resChunk of results) {
        for (const res of resChunk) {
          if (typeof res.transcript === 'string') latest = res.transcript;
        }
      }

      latest = latest.trim();
      if (!latest) return;

      onTranscript(latest);

      voiceIsSubmittingRef.current = true;
      scheduleIdleSubmit();
    };

    recognition.onerror = () => {
      setIsListening(false);
      onListeningStateChange?.(false);
      setIsAutoSendingFromVoice(false);
      clearIdleTimer();
      voiceIsSubmittingRef.current = false;
    };

    recognition.onend = () => {
      setIsListening(false);
      onListeningStateChange?.(false);
      clearIdleTimer();

      setIsAutoSendingFromVoice(false);
      voiceIsSubmittingRef.current = false;
      // KHÔNG auto-submit ở đây.
    };

    recognition.start();
  }, [clearIdleTimer, lang, onListeningStateChange, onTranscript, scheduleIdleSubmit]);

  return {
    isSpeaking,
    isListening,
    isAutoSendingFromVoice,
    startListening,
    stopListening,
    speak,
  };
}
