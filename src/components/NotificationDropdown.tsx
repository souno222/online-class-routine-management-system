import React from 'react';
import { Check } from 'lucide-react';
import { Notification } from '../types';
import toast from 'react-hot-toast';

interface Props {
  notifications: Notification[];
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

export default function NotificationDropdown({ notifications, markAsRead, markAllAsRead }: Props) {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'assignment':
        return '📚';
      case 'routine':
        return '📅';
      case 'exam':
        return '📝';
      default:
        return '📢';
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-1 z-50">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
        <button
          onClick={() => {
            markAllAsRead();
            toast.success('All notifications marked as read');
          }}
          className="text-xs text-blue-600 hover:text-blue-800"
        >
          Mark all as read
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="text-sm text-gray-500 p-4">No notifications</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`px-4 py-3 hover:bg-gray-50 ${
                !notification.read ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start">
                <span className="text-lg mr-3">
                  {getNotificationIcon(notification.type)}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {notification.title}
                  </p>
                  <p className="text-sm text-gray-500">{notification.message}</p>
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="mt-1 flex items-center text-xs text-blue-600 hover:text-blue-800"
                    >
                      <Check className="h-3 w-3 mr-1" />
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}