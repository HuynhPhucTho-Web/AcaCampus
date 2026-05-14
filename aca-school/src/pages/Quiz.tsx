import { useAppStore } from '../store/useAppStore';
import { useState } from 'react';
import {
  Gamepad2,
  Trophy,
  Play,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react';

const quizQuestions = [
  {
    id: 1,
    question: 'Đâu là nghiệm của phương trình x² - 4 = 0?',
    options: ['x = 2', 'x = -2', 'x = ±2', 'x = 4'],
    correctAnswer: 2,
    subject: 'Toán',
  },
  {
    id: 2,
    question: 'Từ "hello" trong tiếng Anh có nghĩa là gì?',
    options: ['Tạm biệt', 'Xin chào', 'Cảm ơn', 'Xin lỗi'],
    correctAnswer: 1,
    subject: 'Anh',
  },
  {
    id: 3,
    question: 'Thủ đô của Việt Nam là?',
    options: ['TP. Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Huế'],
    correctAnswer: 1,
    subject: 'Địa lý',
  },
  {
    id: 4,
    question: 'Công thức hóa học của nước là?',
    options: ['H2O', 'CO2', 'O2', 'NaCl'],
    correctAnswer: 0,
    subject: 'Hóa',
  },
  {
    id: 5,
    question: 'Ai là tác giả của "Truyện Kiều"?',
    options: ['Nguyễn Du', 'Nam Cao', 'Xuất bản', 'Tô Hoài'],
    correctAnswer: 0,
    subject: 'Văn',
  },
];

export default function Quiz() {
  const { leaderboard, addQuizResult, user } = useAppStore();
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'finished'>('menu');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showResult, setShowResult] = useState(false);

  const handleStartGame = () => {
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(60);
    setShowResult(false);
  };

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        // Game finished
        addQuizResult({
          quizId: '1',
          score: score + (answerIndex === quizQuestions[currentQuestion].correctAnswer ? 1 : 0),
          totalQuestions: quizQuestions.length,
          completedAt: new Date().toISOString().split('T')[0],
          timeSpent: 60 - timeLeft,
        });
        setGameState('finished');
      }
    }, 1500);
  };

  if (gameState === 'menu') {
    return (
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-500 to-purple-500 rounded-3xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-2">🎮 Trò Chơi Giải Đố</h2>
          <p className="text-white/90">Ôn tập kiến thức cùng bạn bè và leo lên bảng xếp hạng!</p>
        </div>

        {/* Play Button */}
        <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-violet-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Gamepad2 className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Sẵn sàng chưa?</h3>
          <p className="text-gray-500 mb-6">Trả lời 5 câu hỏi trong 60 giây để kiểm tra kiến thức của bạn!</p>
          <button
            onClick={handleStartGame}
            className="px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-2xl font-bold text-lg flex items-center gap-2 mx-auto hover:shadow-lg transition-all hover:scale-105"
          >
            <Play className="w-6 h-6" />
            Bắt đầu chơi ngay
          </button>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            Bảng xếp hạng thi đua
          </h3>
          <div className="space-y-2">
            {leaderboard.map((entry) => (
              <div
                key={entry.rank}
                className={`flex items-center gap-4 p-3 rounded-2xl ${
                  entry.userName === user?.name ? 'bg-violet-100' : 'hover:bg-gray-50'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold ${
                  entry.rank === 1 ? 'bg-yellow-400 text-white' :
                  entry.rank === 2 ? 'bg-gray-300 text-white' :
                  entry.rank === 3 ? 'bg-orange-300 text-white' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {entry.rank}
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-violet-400 to-purple-400 rounded-xl" />
                <div className="flex-1">
                  <p className="font-bold text-gray-800">{entry.userName}</p>
                  <p className="text-xs text-gray-500">{entry.className}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-violet-600">{entry.totalPoints}</p>
                  <p className="text-xs text-gray-500">điểm</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'playing') {
    const question = quizQuestions[currentQuestion];
    return (
      <div className="space-y-6">
        {/* Progress Bar */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Câu hỏi:</span>
              <span className="font-bold text-violet-600">{currentQuestion + 1}/{quizQuestions.length}</span>
            </div>
            <div className={`flex items-center gap-2 ${timeLeft <= 10 ? 'text-red-500' : 'text-gray-600'}`}>
              <Clock className="w-5 h-5" />
              <span className="font-bold text-xl">{timeLeft}s</span>
            </div>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-1000"
              style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-violet-100 text-violet-600 rounded-lg text-sm font-medium">
              {question.subject}
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-6">{question.question}</h3>
          <div className="space-y-3">
            {question.options.map((option, index) => {
              let buttonClass = 'p-4 rounded-2xl border-2 transition-all text-left font-medium ';
              
              if (showResult) {
                if (index === question.correctAnswer) {
                  buttonClass += 'bg-green-100 border-green-500 text-green-700';
                } else if (index === selectedAnswer) {
                  buttonClass += 'bg-red-100 border-red-500 text-red-700';
                } else {
                  buttonClass += 'bg-gray-50 border-gray-200 text-gray-500';
                }
              } else {
                buttonClass += 'border-gray-200 hover:border-violet-500 hover:bg-violet-50';
              }

              return (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswer(index)}
                  disabled={showResult}
                  className={buttonClass}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center text-sm font-bold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                    {showResult && index === question.correctAnswer && (
                      <CheckCircle className="w-5 h-5 ml-auto text-green-500" />
                    )}
                    {showResult && index === selectedAnswer && index !== question.correctAnswer && (
                      <XCircle className="w-5 h-5 ml-auto text-red-500" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Finished state
  return (
    <div className="space-y-6 p-6">
      <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Trophy className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Chúc mừng!</h2>
        <p className="text-gray-500 mb-6">Bạn đã hoàn thành bài quiz</p>
        
        <div className="flex items-center justify-center gap-8 mb-8">
          <div className="text-center">
            <p className="text-5xl font-bold text-violet-600">{score}</p>
            <p className="text-gray-500">Điểm số</p>
          </div>
          <div className="w-px h-16 bg-gray-200" />
          <div className="text-center">
            <p className="text-5xl font-bold text-gray-800">{quizQuestions.length}</p>
            <p className="text-gray-500">Tổng câu</p>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={handleStartGame}
            className="px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-2xl font-medium flex items-center gap-2 hover:shadow-lg transition-all"
          >
            <Play className="w-5 h-5" />
            Chơi lại
          </button>
          <button
            onClick={() => setGameState('menu')}
            className="px-6 py-3 bg-gray-100 text-gray-600 rounded-2xl font-medium hover:bg-gray-200 transition-colors"
          >
            Quay về
          </button>
        </div>
      </div>
    </div>
  );
}
