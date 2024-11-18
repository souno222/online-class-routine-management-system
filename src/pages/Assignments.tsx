import React, { useState } from 'react';
import { PlusCircle, Pencil, Trash2, Calendar } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import AssignmentModal from '../components/AssignmentModal';
import { Assignment } from '../types';
import toast from 'react-hot-toast';

export default function Assignments() {
  const { user } = useAuthStore();
  const isTeacher = user?.role === 'teacher';

  const subjects = [
    { code: 'CSE303', name: 'Database Systems' },
    { code: 'CSE225', name: 'Algorithms' },
    { code: 'MAT201', name: 'Linear Algebra' },
  ];

  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: '1',
      title: 'Database Design Project',
      subjectCode: 'CSE303',
      deadline: new Date('2024-03-25'),
      description: 'Design and implement a database system for a hospital management system.',
    },
    {
      id: '2',
      title: 'Algorithm Analysis',
      subjectCode: 'CSE225',
      deadline: new Date('2024-03-28'),
      description: 'Analyze the time complexity of given algorithms and provide detailed reports.',
    },
  ]);

  const [modalState, setModalState] = useState({
    isOpen: false,
    editingAssignment: null as Assignment | null,
  });

  const handleAdd = () => {
    setModalState({
      isOpen: true,
      editingAssignment: null,
    });
  };

  const handleEdit = (assignment: Assignment) => {
    setModalState({
      isOpen: true,
      editingAssignment: assignment,
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this assignment?')) {
      setAssignments(assignments.filter(assignment => assignment.id !== id));
      toast.success('Assignment deleted successfully');
    }
  };

  const handleSave = (assignmentData: Partial<Assignment>) => {
    if (modalState.editingAssignment) {
      // Edit existing assignment
      setAssignments(assignments.map(assignment =>
        assignment.id === modalState.editingAssignment.id
          ? { ...assignment, ...assignmentData }
          : assignment
      ));
      toast.success('Assignment updated successfully');
    } else {
      // Add new assignment
      const newAssignment = {
        ...assignmentData,
        id: Math.random().toString(36).substr(2, 9),
      } as Assignment;
      setAssignments([...assignments, newAssignment]);
      toast.success('Assignment created successfully');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
        {isTeacher && (
          <button
            onClick={handleAdd}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
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
                    {assignment.subjectCode}
                  </p>
                </div>
                {isTeacher && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(assignment)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(assignment.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <div className="text-sm text-gray-500 mb-4">
                {assignment.description}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                Due: {assignment.deadline.toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      <AssignmentModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, editingAssignment: null })}
        onSave={handleSave}
        initialData={modalState.editingAssignment || undefined}
        subjects={subjects}
      />
    </div>
  );
}
