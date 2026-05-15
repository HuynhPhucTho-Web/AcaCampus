import { useAppStore } from '../../store/useAppStore';

export default function TeacherSchedule() {
  const schedules = useAppStore((s) => s.classSchedules);

  const todayLabel = 'Hôm nay (placeholder)';
  const todayItems = schedules.slice(0, 6);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Giáo viên • Lịch dạy</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">{todayLabel}</p>
      </div>

      <div className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="space-y-3">
          {todayItems.map((it) => (
            <div key={it.id} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold">{it.subject}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Tiết {it.period} • {it.room}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 dark:text-gray-400">Phòng</p>
                <p className="font-bold">{it.room}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
