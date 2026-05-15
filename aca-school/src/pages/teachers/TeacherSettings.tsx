import { useAppStore } from '../../store/useAppStore';

export default function TeacherSettings() {
  const theme = useAppStore((s) => s.theme);
  const language = useAppStore((s) => s.language);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Giáo viên • Cài đặt</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Settings placeholder (theme/language) — phần cấu hình nâng cao sẽ tích hợp sau.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <h3 className="font-semibold">Giao diện</h3>
          <div className="mt-3 text-sm text-gray-600 dark:text-gray-300 space-y-2">
            <div>
              <span className="font-medium">Theme:</span> {theme}
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <h3 className="font-semibold">Ngôn ngữ</h3>
          <div className="mt-3 text-sm text-gray-600 dark:text-gray-300 space-y-2">
            <div>
              <span className="font-medium">Language:</span> {language}
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
        <h3 className="font-semibold">Tuỳ chọn nâng cao (placeholder)</h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          (Placeholder) sau này có thể thêm: quản lý quyền, cấu hình lớp dạy, thiết lập thông báo, tích hợp AI…
        </p>
      </div>
    </div>
  );
}
