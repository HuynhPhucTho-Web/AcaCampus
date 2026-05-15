import { useAppStore } from '../../store/useAppStore';

export default function TeacherQuizManagement() {
  const quizResults = useAppStore((s) => s.quizResults);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Giáo viên • Quản lý quiz</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Tạo trắc nghiệm, random câu hỏi, giới hạn thời gian, auto chấm điểm, leaderboard (placeholder).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <h3 className="font-semibold">Kết quả quiz (mock)</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left">
                <tr className="text-xs text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800">
                  <th className="py-2 pr-3">Quiz</th>
                  <th className="py-2 pr-3">Điểm</th>
                  <th className="py-2 pr-3">Hoàn thành</th>
                  <th className="py-2 pr-3">Thời gian</th>
                </tr>
              </thead>
              <tbody>
                {quizResults.map((r) => (
                  <tr key={r.quizId} className="border-b border-gray-50 dark:border-gray-800/40">
                    <td className="py-2 pr-3 font-medium">#{r.quizId}</td>
                    <td className="py-2 pr-3">
                      {r.score}/{r.totalQuestions}
                    </td>
                    <td className="py-2 pr-3 text-gray-600 dark:text-gray-300">{r.completedAt}</td>
                    <td className="py-2 pr-3 text-gray-600 dark:text-gray-300">{r.timeSpent}s</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <h3 className="font-semibold">Tạo quiz mới (placeholder)</h3>
          <div className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60">
              <p className="font-medium">📌 Tiêu đề quiz</p>
              <p className="text-xs mt-1">Chọn môn + độ khó</p>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60">
              <p className="font-medium">⏱️ Thời gian làm bài</p>
              <p className="text-xs mt-1">Giới hạn thời gian (placeholder)</p>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60">
              <p className="font-medium">🎲 Random câu hỏi</p>
              <p className="text-xs mt-1">Random từ ngân hàng câu hỏi</p>
            </div>
            <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold hover:opacity-90 transition-opacity">
              Tạo quiz
            </button>
          </div>
          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            (Placeholder) Hệ thống leaderboard + auto chấm sẽ được tích hợp sau.
          </p>
        </div>
      </div>
    </div>
  );
}
