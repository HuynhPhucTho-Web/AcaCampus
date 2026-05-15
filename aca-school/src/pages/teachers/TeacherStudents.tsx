import { useAppStore } from '../../store/useAppStore';

export default function TeacherStudents() {
  const grades = useAppStore((s) => s.grades);

  const mockStudents = [
    { name: 'Nguyễn Văn A', behavior: 'Tốt', avg: 8.1 },
    { name: 'Trần Thị B', behavior: 'Khá', avg: 7.4 },
    { name: 'Lê Văn C', behavior: 'Tốt', avg: 8.7 },
    { name: 'Phạm Thị D', behavior: 'Trung bình', avg: 6.9 },
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Giáo viên • Học sinh</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Thông tin học sinh, hạnh kiểm, điểm và lịch sử nghỉ học (placeholder).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <h3 className="font-semibold">Danh sách học sinh</h3>
          <div className="mt-4 space-y-3">
            {mockStudents.map((s) => (
              <div key={s.name} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium">{s.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Hạnh kiểm: {s.behavior}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400">TB (mock)</p>
                    <p className="text-lg font-bold">{s.avg.toFixed(1)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <h3 className="font-semibold">Điểm & thống kê</h3>
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-300 space-y-2">
            <div>• Số bản ghi điểm: {grades.length}</div>
            <div>• Xu hướng: (placeholder)</div>
            <div className="pt-2 text-xs text-gray-500 dark:text-gray-400">
              Trang này sẽ hiển thị lịch sử nghỉ học và liên hệ phụ huynh theo từng học sinh.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
