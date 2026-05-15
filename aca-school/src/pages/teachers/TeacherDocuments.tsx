import { useAppStore } from '../../store/useAppStore';

export default function TeacherDocuments() {
  const documents = useAppStore((s) => s.documents);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Giáo viên • Tài liệu</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">Upload PDF/Word/slide/video + phân theo môn (placeholder)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-semibold">Danh sách tài liệu</h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">Tổng: {documents.length}</span>
          </div>

          <div className="mt-4 space-y-3">
            {documents.slice(0, 8).map((d) => (
              <div key={d.id} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs text-purple-700 dark:text-purple-300">{d.subject} • {d.type.toUpperCase()}</p>
                    <p className="font-semibold mt-1">{d.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                      {d.description}
                    </p>
                  </div>
                  <div className="text-right text-xs text-gray-500 dark:text-gray-400">
                    <div>📥 {d.downloads}</div>
                    <div className="mt-2">{d.uploadDate}</div>
                  </div>
                </div>
                <div className="mt-3">
                  <button className="px-3 py-2 rounded-xl bg-purple-600 text-white text-sm font-medium hover:opacity-90 transition-opacity">
                    Mở tài liệu
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <h3 className="font-semibold">Upload mới (placeholder)</h3>

          <div className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60">
              <p className="font-medium text-gray-800 dark:text-gray-100">📎 Tải file</p>
              <p className="text-xs mt-1">PDF / Word / slide / video (placeholder)</p>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60">
              <p className="font-medium text-gray-800 dark:text-gray-100">🏷️ Chọn môn</p>
              <p className="text-xs mt-1">Toán / Lý / Hóa / ... (placeholder)</p>
            </div>
            <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold hover:opacity-90 transition-opacity">
              Upload
            </button>
          </div>

          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            (Placeholder) Tính năng phân quyền + lưu file sẽ được tích hợp khi có API.
          </p>
        </div>
      </div>
    </div>
  );
}
