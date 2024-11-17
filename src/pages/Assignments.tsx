import React from 'react';
import { PlusCircle, Calendar } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Assignments() {
  const { user } = useAuthStore();
  const isTeacher = user?.role === 'teacher';

  const assignments = [
    {
      id: 1,
      title: 'Database Design Project',
      subject: 'CSE303',
      deadline: '2024-03-25',
      description: 'Design and implement a database system for a hospital management system.',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Algorithm Analysis',
      subject: 'CSE225',
      deadline: '2024-03-28',
      description: 'Analyze the time complexity of given algorithms and provide detailed reports.',
      status: 'submitted'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
        {isTeacher && (
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Assignment
          </button>
        )}
      </div>

      <div className="grid gap-6">
        {assignments.map((assignment) => (
          <div
            key={assignment.id}
            className="bg-white shadow overflow-hidden sm:rounded-lg"
          >
            <div className="px-4 py-5 sm:px-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {assignment.title}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {assignment.subject}
                  </p>
                </div>
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    assignment.status === 'submitted'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {assignment.status}
                </span>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <div className="text-sm text-gray-500 mb-4">
                {assignment.description}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                Due: {assignment.deadline}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}