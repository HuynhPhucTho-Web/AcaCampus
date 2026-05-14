import { useAppStore } from '../store/useAppStore';
import { useState } from 'react';
import {
  Send,
  Search,
  MoreVertical,
  User,
  Check,
  CheckCheck,
} from 'lucide-react';
import type { Message } from '../stypes';

export default function Messages() {
  const { conversations, messages, addMessage, markConversationRead, user } = useAppStore();
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]?.id || '');
  const [newMessage, setNewMessage] = useState('');

  const currentMessages = messages[selectedConversation] || [];
  const currentConversation = conversations.find((c) => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: user?.id || 'user',
      senderName: user?.name || 'Bạn',
      receiverId: currentConversation?.participantId || '',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      isRead: false,
    };

    addMessage(selectedConversation, message);
    setNewMessage('');
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">💬 Tin Nhắn</h2>
        <p className="text-white/90">Kết nối với giáo viên và phụ huynh</p>
      </div>

      {/* Messages Container */}
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden h-[600px]">
        <div className="flex h-full">
          {/* Conversations List */}
          <div className="w-80 border-r border-gray-100 flex flex-col">
            <div className="p-4 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => {
                    setSelectedConversation(conversation.id);
                    markConversationRead(conversation.id);
                  }}
                  className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                    selectedConversation === conversation.id ? 'bg-purple-50' : ''
                  }`}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-gray-800">{conversation.participantName}</p>
                      <span className="text-xs text-gray-400">{conversation.lastMessageTime}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unreadCount > 0 && (
                    <span className="w-5 h-5 bg-purple-500 text-white text-xs rounded-full flex items-center justify-center">
                      {conversation.unreadCount}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-800">{currentConversation?.participantName}</p>
                  <p className="text-xs text-gray-500">Trực tuyến</p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <MoreVertical className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentMessages.map((msg) => {
                const isMe = msg.senderId === user?.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] p-4 rounded-3xl ${
                        isMe
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p>{msg.content}</p>
                      <div className={`flex items-center justify-end gap-1 mt-1 ${
                        isMe ? 'text-white/70' : 'text-gray-400'
                      }`}>
                        <span className="text-xs">{msg.timestamp}</span>
                        {isMe && (msg.isRead ? <CheckCheck className="w-3 h-3" /> : <Check className="w-3 h-3" />)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Nhập tin nhắn..."
                  className="flex-1 px-4 py-3 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <button
                  onClick={handleSendMessage}
                  className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl flex items-center justify-center hover:shadow-lg transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
