import { useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore';

export default function TeacherMessages() {
  const conversations = useAppStore((s) => s.conversations);
  const messages = useAppStore((s) => s.messages);

  const selectedConversationId = conversations[0]?.id;

  const thread = useMemo(() => {
    if (!selectedConversationId) return [];
    return messages[selectedConversationId] || [];
  }, [messages, selectedConversationId]);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Giáo viên • Nhắn tin</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">Giáo viên ↔ học sinh, giáo viên ↔ phụ huynh (placeholder)</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-1 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <h3 className="font-semibold">Cuộc trò chuyện</h3>
          <div className="mt-4 space-y-3">
            {conversations.map((c) => (
              <div key={c.id} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{c.participantName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{c.lastMessage}</p>
                  </div>
                  {c.unreadCount > 0 && (
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-purple-600 text-white">
                      {c.unreadCount}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-gray-400 mt-2">{c.lastMessageTime}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="xl:col-span-2 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <h3 className="font-semibold">Nội dung</h3>

          <div className="mt-4 max-h-[420px] overflow-y-auto space-y-3">
            {thread.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">Chưa có tin nhắn.</p>
            ) : (
              thread.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.senderId === 'teacher1' ? 'justify-start' : 'justify-end'}`}
                >
                  <div className="max-w-[75%] px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800/60 text-sm">
                    <p className="text-xs text-gray-500 dark:text-gray-400">{m.senderName}</p>
                    <p className="mt-1 whitespace-pre-line">{m.content}</p>
                    <p className="text-[11px] text-gray-400 mt-2">{m.timestamp}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 text-sm text-gray-500 dark:text-gray-400">
            (Placeholder) Input chat + gửi tin nhắn sẽ được tích hợp theo API thật.
          </div>
        </div>
      </div>
    </div>
  );
}
