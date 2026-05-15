import { useAppStore } from '../../store/useAppStore';

export default function TeacherAttendance() {
  const classSchedules = useAppStore((s) => s.classSchedules);

  const mockRows = [
    { name: 'Nguyễn Văn A', status: 'Có mặt', time: '—', isLate: false, type: 'phép' },
    { name: 'Trần Thị B', status: 'Vắng', time: '—', isLate: false, type: 'không phép' },
    { name: 'Lê Văn C', status: 'Đi trễ', time: '08:10', isLate: true, type: 'phép' },
    { name: 'Phạm Thị D', status: 'Có mặt', time: '—', isLate: false, type: '—' },
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Giáo viên • Điểm danh</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">Có mặt / Vắng / Đi trễ / Phép - Không phép (placeholder)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <h3 className="font-semibold">Bảng điểm danh</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left">
                <tr className="text-xs text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800">
                  <th className="py-2 pr-3">Học sinh</th>
                  <th className="py-2 pr-3">Trạng thái</th>
                  <th className="py-2 pr-3">Giờ</th>
                  <th className="py-2 pr-3">Loại</th>
                </tr>
              </thead>
              <tbody>
                {mockRows.map((r) => (
                  <tr key={r.name} className="border-b border-gray-50 dark:border-gray-800/40">
                    <td className="py-2 pr-3 font-medium">{r.name}</td>
                    <td className="py-2 pr-3">{r.status}</td>
                    <td className="py-2 pr-3">{r.time}</td>
                    <td className="py-2 pr-3">{r.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex gap-2 flex-wrap">
            <button className="px-4 py-2 rounded-xl bg-purple-600 text-white hover:opacity-90 transition-opacity text-sm font-medium">
              Điểm danh (QR) - Placeholder
            </button>
            <button className="px-4 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors text-sm font-medium dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/40">
              Camera AI - Placeholder
            </button>
            <button className="px-4 py-2 rounded-xl bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors text-sm font-medium dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
              Export Excel - Placeholder
            </button>
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <h3 className="font-semibold">Tiết học hiện tại</h3>
          <div className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-200">
            <div>
              <span className="text-gray-500 dark:text-gray-400">Môn:</span> {classSchedules[0]?.subject || '—'}
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Phòng:</span> {classSchedules[0]?.room || '—'}
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Giáo viên:</span> {classSchedules[0]?.teacher || '—'}
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            Trang này sẽ cho phép tạo phiên điểm danh theo tiết và ghi nhận phép/không phép.
          </p>
        </div>
      </div>
    </div>
  );
}
