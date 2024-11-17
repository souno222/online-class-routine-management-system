import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  BookOpen, 
  Clock,
  FileText,
  PlusCircle
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Sidebar() {
  const { user } = useAuthStore();

  const getMenuItems = () => {
    const commonItems = [
      { icon: Calendar, label: 'Dashboard', path: '/' },
      { icon: Clock, label: 'Routine', path: '/routine' },
    ];

    switch (user?.role) {
      case 'admin':
        return [
          ...commonItems,
          { icon: Users, label: 'Users', path: '/users' },
          { icon: BookOpen, label: 'Subjects', path: '/subjects' },
          { icon: FileText, label: 'Assignments', path: '/assignments' },
        ];
      case 'teacher':
        return [
          ...commonItems,
          { icon: FileText, label: 'Assignments', path: '/assignments' },
          { icon: PlusCircle, label: 'Add Exam', path: '/add-exam' }
        ];
      case 'student':
        return [
          ...commonItems,
          { icon: FileText, label: 'Assignments', path: '/assignments' }
        ];
      default:
        return commonItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-4">
        <div className="px-4 py-3 mb-6 bg-blue-50 rounded-lg">
          <p className="text-sm font-medium text-blue-700">Logged in as</p>
          <p className="text-sm text-blue-900">{user?.name}</p>
          <p className="text-xs text-blue-600 capitalize">{user?.role}</p>
        </div>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
