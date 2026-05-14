import { useAppStore } from '../store/useAppStore';
import {
  TrendingUp,
  Target,
  BookOpen,
  Award,
  ArrowUp,
  Lightbulb,
  Calendar,
  BarChart3,
} from 'lucide-react';

export default function Analysis() {
  const { grades, studyPaths, quizResults } = useAppStore();

  const averageScore = grades.reduce((acc, g) => acc + g.score, 0) / grades.length;
  
  const subjectScores = grades.reduce((acc, grade) => {
    if (!acc[grade.subject]) {
      acc[grade.subject] = [];
    }
    acc[grade.subject].push(grade.score);
    return acc;
  }, {} as Record<string, number[]>);

  const subjectAverages = Object.entries(subjectScores).map(([subject, scores]) => ({
    subject,
    average: scores.reduce((a, b) => a + b, 0) / scores.length,
  }));

  const getScoreColor = (score: number) => {
    if (score >= 9) return 'text-green-500';
    if (score >= 7) return 'text-blue-500';
    if (score >= 5) return 'text-orange-500';
    return 'text-red-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 9) return 'from-green-400 to-emerald-500';
    if (score >= 7) return 'from-blue-400 to-cyan-500';
    if (score >= 5) return 'from-orange-400 to-amber-500';
    return 'from-red-400 to-pink-500';
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">📈 Phân Tích Kết Quả Học Tập</h2>
        <p className="text-white/90">Nhận gợi ý lộ trình học tập personalized cho bạn</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-500">Điểm TB</span>
          </div>
          <p className={`text-3xl font-bold ${getScoreColor(averageScore)}`}>
            {averageScore.toFixed(1)}
          </p>
          <p className="text-sm text-green-500 flex items-center gap-1 mt-1">
            <ArrowUp className="w-4 h-4" />
            +0.5 so với tháng trước
          </p>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-500">Số môn</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">{subjectAverages.length}</p>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-500">Hoàn thành</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">75%</p>
          <p className="text-sm text-gray-500">lộ trình học</p>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-500">Xếp hạng</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">#5</p>
          <p className="text-sm text-green-500 flex items-center gap-1 mt-1">
            <ArrowUp className="w-4 h-4" />
            Top 10%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Performance Chart */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-purple-500" />
            Điểm số theo môn học
          </h3>
          <div className="space-y-4">
            {subjectAverages.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800">{item.subject}</span>
                  <span className={`font-bold ${getScoreColor(item.average)}`}>
                    {item.average.toFixed(1)}
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${getScoreBg(item.average)} rounded-full transition-all duration-500`}
                    style={{ width: `${item.average * 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Study Path Recommendations */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Target className="w-6 h-6 text-purple-500" />
            Lộ trình học tập đề xuất
          </h3>
          <div className="space-y-4">
            {studyPaths.map((path, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-gray-800">{path.subject}</h4>
                  <span className="text-sm text-purple-600">{path.progress}% hoàn thành</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    style={{ width: `${path.progress}%` }}
                  />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {path.recommendations.map((rec, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-white text-purple-600 text-xs rounded-lg"
                    >
                      {rec}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 text-white">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Lightbulb className="w-6 h-6" />
          Gợi ý từ AI
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/20 backdrop-blur rounded-2xl p-4">
            <h4 className="font-bold mb-2">📚 Toán học</h4>
            <p className="text-sm text-white/90">
              Bạn nên ôn tập thêm về đại số tuyến tính. Tham gia các bài tập nâng cao để cải thiện điểm số.
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-2xl p-4">
            <h4 className="font-bold mb-2">🌟 Tiếng Anh</h4>
            <p className="text-sm text-white/90">
              Tập trung vào từ vựng và ngữ pháp. Xem thêm video bài giảng và luyện nghe mỗi ngày.
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-2xl p-4">
            <h4 className="font-bold mb-2">🎯 Mục tiêu</h4>
            <p className="text-sm text-white/90">
              Với tiến độ hiện tại, bạn có thể đạt điểm trung bình 8.5 trong kỳ thi sắp tới!
            </p>
          </div>
        </div>
      </div>

      {/* Quiz History */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-purple-500" />
          Lịch sử làm bài Quiz
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-4 text-gray-500 font-medium">STT</th>
                <th className="text-left py-3 px-4 text-gray-500 font-medium">Ngày</th>
                <th className="text-left py-3 px-4 text-gray-500 font-medium">Điểm số</th>
                <th className="text-left py-3 px-4 text-gray-500 font-medium">Thời gian</th>
              </tr>
            </thead>
            <tbody>
              {quizResults.map((result, index) => (
                <tr key={index} className="border-b border-gray-50 hover:bg-purple-50">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{result.completedAt}</td>
                  <td className="py-3 px-4">
                    <span className={`font-bold ${getScoreColor(result.score)}`}>
                      {result.score}/{result.totalQuestions}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {Math.floor(result.timeSpent / 60)}p {result.timeSpent % 60}s
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
