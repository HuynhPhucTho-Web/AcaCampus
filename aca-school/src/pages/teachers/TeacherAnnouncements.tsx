import { useAppStore } from '../../store/useAppStore';

export default function TeacherAnnouncements() {
  const notifications = useAppStore((s) => s.notifications);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Giáo viên • Thông báo</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">Đăng lịch kiểm tra, nghỉ học, hoạt động trường (placeholder).</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <h3 className="font-semibold">Danh sách thông báo (mock)</h3>

          <div className="mt-4 space-y-3">
            {notifications.slice(0, 6).map((n) => (
              <div key={n.id} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60">
                <p className="font-semibold">{n.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{n.content}</p>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  {n.author} • {n.date}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <h3 className="font-semibold">Tạo thông báo (placeholder)</h3>

          <div className="mt-4 space-y-3">
            <div className="space-y-1">
              <label className="text-sm text-gray-600 dark:text-gray-300">Tiêu đề</label>
              <input className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900" placeholder="Nhập tiêu đề..." />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-600 dark:text-gray-300">Nội dung</label>
              <textarea className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900" rows={5} placeholder="Nhập nội dung..." />
            </div>

            <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold hover:opacity-90 transition-opacity">
              Đăng thông báo
            </button>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              (Placeholder) API đăng thông báo sẽ được tích hợp sau.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
