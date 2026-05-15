import { useAppStore } from '../../store/useAppStore';

export default function TeacherGrades() {
  const grades = useAppStore((s) => s.grades);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Giáo viên • Nhập điểm</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">Điểm miệng / 15 phút / 1 tiết / học kỳ (placeholder)</p>
      </div>

      <div className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left">
              <tr className="text-xs text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800">
                <th className="py-2 pr-3">Môn</th>
                <th className="py-2 pr-3">Loại</th>
                <th className="py-2 pr-3">Điểm</th>
                <th className="py-2 pr-3">Thời gian</th>
                <th className="py-2 pr-3">Học kỳ</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((g) => (
                <tr key={g.id} className="border-b border-gray-50 dark:border-gray-800/40">
                  <td className="py-2 pr-3 font-medium">{g.subject}</td>
                  <td className="py-2 pr-3">{g.type}</td>
                  <td className="py-2 pr-3">
                    <span className="font-bold">
                      {g.score}/{g.maxScore}
                    </span>
                  </td>
                  <td className="py-2 pr-3">{g.date}</td>
                  <td className="py-2 pr-3">{g.semester}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          (Placeholder) Tự tính trung bình môn, xếp loại và hiển thị thống kê.
        </div>
      </div>
    </div>
  );
}
