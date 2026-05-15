import { useAppStore } from '../../store/useAppStore';

export default function TeacherForum() {
  const forumPosts = useAppStore((s) => s.forumPosts);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Giáo viên • Diễn đàn</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">Hỏi bài / thảo luận / đăng bài học (placeholder)</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-semibold">Bài đăng nổi bật</h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Tổng: {forumPosts.length}
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {forumPosts.slice(0, 5).map((p) => (
              <div key={p.id} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs text-purple-700 dark:text-purple-300">{p.subject} • {p.category}</p>
                    <p className="font-semibold mt-1">{p.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                      {p.content}
                    </p>
                  </div>
                  <div className="text-right text-xs text-gray-500 dark:text-gray-400">
                    <div>❤️ {p.likes}</div>
                    <div>💬 {p.replies}</div>
                  </div>
                </div>
                <p className="text-[11px] text-gray-400 mt-3">{p.createdAt}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <h3 className="font-semibold">Tạo bài (placeholder)</h3>
          <div className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60">
              <p className="font-medium">Chủ đề</p>
              <p className="text-xs mt-1">Toán / Lý / Hóa ...</p>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60">
              <p className="font-medium">Nội dung bài học</p>
              <p className="text-xs mt-1">Mô tả ngắn / hướng dẫn ...</p>
            </div>
            <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold hover:opacity-90 transition-opacity">
              Đăng bài
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
