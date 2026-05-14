import { useAppStore } from '../store/useAppStore';
import { Bell, Calendar, Users, CheckCircle, Clock, Filter } from 'lucide-react';
import { useState } from 'react';

export default function News() {
  const { notifications, markNotificationRead } = useAppStore();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter((n) => !n.isRead)
    : notifications;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <Bell className="w-5 h-5 text-orange-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'event':
        return <Calendar className="w-5 h-5 text-blue-500" />;
      default:
        return <Bell className="w-5 h-5 text-purple-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'border-l-orange-400 bg-orange-50';
      case 'success':
        return 'border-l-green-400 bg-green-50';
      case 'event':
        return 'border-l-blue-400 bg-blue-50';
      default:
        return 'border-l-purple-400 bg-purple-50';
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">🔔 Bảng Tin Thông Báo</h2>
        <p className="text-white/90">Cập nhật thông tin mới nhất từ nhà trường</p>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-4">
        <Filter className="w-5 h-5 text-gray-500" />
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-xl font-medium transition-colors ${
            filter === 'all' 
              ? 'bg-purple-500 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Tất cả ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 rounded-xl font-medium transition-colors ${
            filter === 'unread' 
              ? 'bg-purple-500 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Chưa đọc ({notifications.filter((n) => !n.isRead).length})
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            onClick={() => markNotificationRead(notification.id)}
            className={`bg-white rounded-3xl p-6 shadow-lg border-l-4 cursor-pointer hover:shadow-xl transition-all ${
              getTypeColor(notification.type)
            } ${!notification.isRead ? 'ring-2 ring-purple-200' : ''}`}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                {getTypeIcon(notification.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-800">{notification.title}</h3>
                  <div className="flex items-center gap-2">
                    {!notification.isRead && (
                      <span className="px-2 py-1 bg-purple-500 text-white text-xs rounded-lg">
                        Mới
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-gray-500 text-sm">
                      <Clock className="w-4 h-4" />
                      {notification.date}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mb-3">{notification.content}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Users className="w-4 h-4" />
                  <span>{notification.author}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <div className="text-center py-12">
          <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Không có thông báo nào</p>
        </div>
      )}
    </div>
  );
}
