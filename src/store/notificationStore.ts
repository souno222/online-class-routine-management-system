import { create } from 'zustand';
import { Notification } from '../types';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [
    {
      id: '1',
      title: 'New Assignment Posted',
      message: 'Database Design Project due on March 25',
      type: 'assignment',
      read: false,
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'Routine Updated',
      message: 'Class schedule has been updated for next week',
      type: 'routine',
      read: false,
      createdAt: new Date(),
    },
    {
      id: '3',
      title: 'Upcoming Exam',
      message: 'Mid-term examination starts next week',
      type: 'exam',
      read: false,
      createdAt: new Date(),
    },
  ],
  unreadCount: 3,
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        {
          ...notification,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date(),
        },
        ...state.notifications,
      ],
      unreadCount: state.unreadCount + 1,
    })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
      unreadCount: state.unreadCount - 1,
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),
}));