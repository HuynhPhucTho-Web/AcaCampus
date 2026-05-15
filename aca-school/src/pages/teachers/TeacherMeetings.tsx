import { useState } from 'react';

export default function TeacherMeetings() {
  const [provider, setProvider] = useState<'Google Meet' | 'Zoom' | 'Jitsi'>('Google Meet');
  const [roomCode, setRoomCode] = useState('');

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Giáo viên • Họp trực tuyến</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Tích hợp Google Meet / Zoom / Jitsi (placeholder).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <h3 className="font-semibold">Tạo/Tham gia cuộc họp</h3>

          <div className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <div className="space-y-1">
              <label className="block">Nền tảng</label>
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value as 'Google Meet' | 'Zoom' | 'Jitsi')}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
              >
                <option>Google Meet</option>
                <option>Zoom</option>
                <option>Jitsi</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block">Mã phòng / Room code</label>
              <input
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                placeholder="VD: class-10A1-2026"
                className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
              />
            </div>

            <div className="flex gap-3 flex-wrap">
              <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold hover:opacity-90 transition-opacity">
                Tạo cuộc họp (placeholder)
              </button>
              <button className="px-4 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors font-semibold dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/40">
                Tham gia (placeholder)
              </button>
            </div>
          </div>

          <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            (Placeholder) Khi có API/SDK thật, app sẽ sinh URL iframe hoặc chuyển hướng sang nền tảng họp.
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <h3 className="font-semibold">Lịch họp gần đây</h3>
          <div className="mt-4 space-y-3 text-sm">
            {[
              { when: 'Hôm nay 16:00', title: 'Chấm bài thảo luận' },
              { when: 'Ngày mai 09:30', title: 'Họp phụ huynh' },
            ].map((m, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60">
                <p className="text-xs text-gray-500 dark:text-gray-400">{m.when}</p>
                <p className="font-medium">{m.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
