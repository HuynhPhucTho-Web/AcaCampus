import { useAppStore } from '../../store/useAppStore';

export default function TeacherDashboard() {
  const { notifications, leaveRequests, grades } = useAppStore();

  const newNotifications = notifications.filter((n) => !n.isRead).slice(0, 5);
  const pendingLeaves = leaveRequests.filter((r) => r.status === 'pending').length;

  const classStats = (() => {
    const avg =
      grades.length > 0
        ? grades.reduce((sum, g) => sum + (g.score / (g.maxScore || 1)) * 100, 0) / grades.length
        : 0;

    const attendanceRate = Math.max(0, Math.min(100, 92 - pendingLeaves * 3)); // mock
    return {
      avgPercent: avg,
      attendanceRate,
    };
  })();

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Giáo viên • Trang chủ</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">Tổng quan lớp học của bạn.</p>
        </div>
      </div>

      {/* Today schedule / absent / notifications / grading deadlines / class statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <p className="text-sm text-gray-500">Lịch dạy hôm nay</p>
          <p className="text-xl font-bold mt-2">Tiết 1 - Toán</p>
          <p className="text-xs text-gray-500 mt-1">Phòng 101 • 08:00</p>
        </div>

        <div className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <p className="text-sm text-gray-500">Số học sinh vắng</p>
          <p className="text-xl font-bold mt-2">2</p>
          <p className="text-xs text-gray-500 mt-1">Cập nhật gần nhất</p>
        </div>

        <div className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <p className="text-sm text-gray-500">Thông báo mới</p>
          <p className="text-xl font-bold mt-2">{newNotifications.length}</p>
          <p className="text-xs text-gray-500 mt-1">Bạn có tin cần xem</p>
        </div>

        <div className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <p className="text-sm text-gray-500">Deadline chấm bài</p>
          <p className="text-xl font-bold mt-2">Hôm nay</p>
          <p className="text-xs text-gray-500 mt-1">Trước 17:00</p>
        </div>

        <div className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <p className="text-sm text-gray-500">Thống kê lớp</p>
          <p className="text-xl font-bold mt-2">{classStats.attendanceRate.toFixed(0)}%</p>
          <p className="text-xs text-gray-500 mt-1">Tỉ lệ chuyên cần (ước tính)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <h3 className="font-semibold">Thông báo mới</h3>
          <div className="mt-3 space-y-3">
            {newNotifications.length === 0 ? (
              <p className="text-sm text-gray-500">Không có thông báo mới.</p>
            ) : (
              newNotifications.map((n) => (
                <div key={n.id} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60">
                  <p className="font-medium">{n.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{n.content}</p>
                  <p className="text-xs text-gray-500 mt-1">{n.date}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <h3 className="font-semibold">Duyệt nghỉ</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Số đơn đang chờ duyệt: <span className="font-bold">{pendingLeaves}</span>
          </p>
          <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            (Placeholder) Bạn sẽ thấy danh sách chi tiết trong trang “Duyệt nghỉ”.
          </div>
        </div>
      </div>
    </div>
  );
}
