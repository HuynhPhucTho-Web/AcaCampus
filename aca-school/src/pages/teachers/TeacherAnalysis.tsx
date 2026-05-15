import { useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore';

export default function TeacherAnalysis() {
  const grades = useAppStore((s) => s.grades);

  const analysis = useMemo(() => {
    const avg = grades.length
      ? grades.reduce((sum, g) => sum + g.score, 0) / grades.length
      : 0;

    const weak = grades.filter((g) => (g.score / (g.maxScore || 1)) * 10 < 6.5).length;

    const attendanceRate = Math.max(0, Math.min(100, 93 - weak * 2)); // mock
    return { avg, weak, attendanceRate };
  }, [grades]);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Giáo viên • Phân tích</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Thống kê điểm trung bình lớp, học sinh yếu, tỉ lệ chuyên cần, biểu đồ tiến bộ (placeholder).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <p className="text-sm text-gray-500">Điểm TB lớp</p>
          <p className="text-2xl font-bold mt-2">{analysis.avg.toFixed(1)}</p>
          <p className="text-xs text-gray-500 mt-1">(mock từ dữ liệu grades)</p>
        </div>

        <div className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <p className="text-sm text-gray-500">Học sinh yếu</p>
          <p className="text-2xl font-bold mt-2">{analysis.weak}</p>
          <p className="text-xs text-gray-500 mt-1">(placeholder)</p>
        </div>

        <div className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <p className="text-sm text-gray-500">Tỉ lệ chuyên cần</p>
          <p className="text-2xl font-bold mt-2">{analysis.attendanceRate.toFixed(0)}%</p>
          <p className="text-xs text-gray-500 mt-1">(mock)</p>
        </div>
      </div>

      <div className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
        <h3 className="font-semibold">Biểu đồ tiến bộ</h3>
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-56 rounded-xl bg-gray-50 dark:bg-gray-800/60 flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
            Placeholder Chart.js / Recharts
          </div>
          <div className="h-56 rounded-xl bg-gray-50 dark:bg-gray-800/60 flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
            Placeholder bảng/insight AI
          </div>
        </div>
      </div>
    </div>
  );
}
