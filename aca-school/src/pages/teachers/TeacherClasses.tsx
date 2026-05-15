import { useAppStore } from '../../store/useAppStore';

export default function TeacherClasses() {
  const user = useAppStore((s) => s.user);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Giáo viên • Lớp học</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Danh sách lớp dạy (placeholder). {user?.name ? `Xin chào, ${user.name}` : ''}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['12A1', '11A3', '10B2'].map((cls) => (
          <div key={cls} className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
            <p className="text-sm text-gray-500">Lớp</p>
            <p className="text-xl font-bold mt-1">{cls}</p>
            <div className="mt-3 space-y-1 text-sm text-gray-600 dark:text-gray-300">
              <div>• Sĩ số: 38</div>
              <div>• Môn học: Toán, Văn</div>
              <div>• GVCN: Giáo viên chủ nhiệm</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
