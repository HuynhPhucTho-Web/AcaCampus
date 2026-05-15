import { useAppStore } from '../../store/useAppStore';

export default function TeacherAssignments() {
  const documents = useAppStore((s) => s.documents);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Giáo viên • Bài tập</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">Tạo bài tập, deadline, upload file, chấm điểm (placeholder)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <h3 className="font-semibold">Danh sách bài tập (placeholder)</h3>
          <div className="mt-4 space-y-3">
            {[
              { title: 'Bài tập Toán 15 phút - Đại số', due: '2026-05-16 17:00', status: 'Chưa chấm' },
              { title: 'Đề cương 1 tiết - Ngữ văn', due: '2026-05-18 08:00', status: 'Đã chấm một phần' },
              { title: 'Bài tập Hóa - Trắc nghiệm', due: '2026-05-20 09:30', status: 'Chưa nộp' },
            ].map((a, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{a.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Deadline: {a.due}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                    {a.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <h3 className="font-semibold">Upload & tạo mới (placeholder)</h3>
          <div className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60">
              <p className="font-medium text-gray-800 dark:text-gray-100">📎 Chọn file</p>
              <p className="text-xs mt-1">Hỗ trợ PDF/Word/Slide/video (placeholder)</p>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60">
              <p className="font-medium text-gray-800 dark:text-gray-100">🗓️ Chọn deadline</p>
              <p className="text-xs mt-1">Tạo bài tập theo tiết/học kỳ (placeholder)</p>
            </div>
            <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold hover:opacity-90 transition-opacity">
              Tạo bài tập
            </button>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              (Placeholder) Sẽ liên kết với hệ thống bài tập & nộp bài thật sau.
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
        <h3 className="font-semibold">Tài liệu gợi ý (placeholder)</h3>
        <div className="mt-3 text-sm text-gray-600 dark:text-gray-300 space-y-2">
          <div>• Tổng tài liệu trong hệ thống: {documents.length}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Trang này sẽ dùng chung kho tài liệu để đính kèm bài tập.
          </div>
        </div>
      </div>
    </div>
  );
}
