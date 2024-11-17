import React from 'react';
import { Clock, Book, Users, Calendar } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Dashboard() {
  const { user } = useAuthStore();

  const stats = [
    { label: 'Current Classes', value: '4', icon: Clock },
    { label: 'Total Subjects', value: '12', icon: Book },
    { label: 'Active Students', value: '156', icon: Users },
    { label: 'Upcoming Exams', value: '3', icon: Calendar },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.label}
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900">
                      {stat.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h2>
          <div className="space-y-3">
            {[
              { time: '9:00 - 9:50', subject: 'CSE101', room: 'Room 301' },
              { time: '10:00 - 10:50', subject: 'MAT201', room: 'Room 205' },
              { time: '11:00 - 11:50', subject: 'PHY101', room: 'Room 401' },
            ].map((class_) => (
              <div
                key={class_.time}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
              >
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">
                    {class_.time}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {class_.subject} • {class_.room}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h2>
          <div className="space-y-3">
            {[
              { title: 'CSE101 Assignment', date: '2024-03-20', type: 'Assignment' },
              { title: 'Midterm Exam', date: '2024-03-25', type: 'Exam' },
              { title: 'Project Submission', date: '2024-03-28', type: 'Project' },
            ].map((deadline) => (
              <div
                key={deadline.title}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
              >
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">
                    {deadline.title}
                  </h3>
                  <p className="text-sm text-gray-500">Due: {deadline.date}</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {deadline.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}