import { useAppStore } from '../../store/useAppStore';

export default function TeacherLeaveApproval() {
  const leaveRequests = useAppStore((s) => s.leaveRequests);
  const updateLeaveRequest = useAppStore((s) => s.updateLeaveRequest);

  const pending = leaveRequests.filter((r) => r.status === 'pending');

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Giáo viên • Duyệt nghỉ</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">Duyệt / từ chối / phản hồi (placeholder UI)</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <h3 className="font-semibold">Danh sách đơn chờ duyệt</h3>

          <div className="mt-4 space-y-3">
            {pending.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">Không có đơn chờ duyệt.</p>
            ) : (
              pending.map((r) => (
                <div key={r.id} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium">{r.studentName} • {r.classId}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Lý do: {r.reason}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Ngày nghỉ: {r.startDate} → {r.endDate}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Trạng thái: <span className="font-semibold">{r.status}</span>
                      </p>
                    </div>

                    <div className="text-right flex flex-col gap-2 min-w-[160px]">
                      <button
                        onClick={() => updateLeaveRequest(r.id, 'approved', 'Đã duyệt (placeholder)')}
                        className="px-3 py-2 rounded-xl bg-green-600 text-white hover:opacity-90 transition-opacity text-sm font-medium"
                      >
                        Duyệt
                      </button>
                      <button
                        onClick={() => updateLeaveRequest(r.id, 'rejected', 'Từ chối (placeholder)')}
                        className="px-3 py-2 rounded-xl bg-red-600 text-white hover:opacity-90 transition-opacity text-sm font-medium"
                      >
                        Từ chối
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                    Ảnh minh chứng: (placeholder)
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <h3 className="font-semibold">Gợi ý quy trình</h3>
          <ul className="mt-3 text-sm text-gray-600 dark:text-gray-300 space-y-2 list-disc pl-5">
            <li>Kiểm tra lý do + thời gian nghỉ.</li>
            <li>Duyệt: cập nhật status + ghi chú.</li>
            <li>Từ chối: cập nhật status + ghi chú.</li>
          </ul>
          <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            (Placeholder) Phần phản hồi chi tiết sẽ được mở rộng khi có UI/API thật.
          </div>
        </div>
      </div>
    </div>
  );
}
