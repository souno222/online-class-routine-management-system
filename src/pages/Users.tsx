import React, { useState } from 'react';
import { UserPlus, Pencil, Trash2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import UserModal from '../components/UserModal';
import { User } from '../types';
import toast from 'react-hot-toast';

export default function Users() {
  const { user: currentUser } = useAuthStore();
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'John Smith', email: 'john@example.com', role: 'teacher' },
    { id: '2', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'student' },
    { id: '3', name: 'Michael Brown', email: 'michael@example.com', role: 'teacher' },
  ]);

  const [modalState, setModalState] = useState({
    isOpen: false,
    editingUser: null as User | null,
  });

  const handleAdd = () => {
    setModalState({
      isOpen: true,
      editingUser: null,
    });
  };

  const handleEdit = (user: User) => {
    setModalState({
      isOpen: true,
      editingUser: user,
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
      toast.success('User deleted successfully');
    }
  };

  const handleSave = (userData: Partial<User>) => {
    if (modalState.editingUser) {
      // Edit existing user
      setUsers(users.map(user =>
        user.id === modalState.editingUser.id
          ? { ...user, ...userData }
          : user
      ));
      toast.success('User updated successfully');
    } else {
      // Add new user
      const newUser = {
        ...userData,
        id: Math.random().toString(36).substr(2, 9),
      } as User;
      setUsers([...users, newUser]);
      toast.success('User added successfully');
    }
  };

  if (currentUser?.role !== 'admin') {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">You don't have permission to access this page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
        <button
          onClick={handleAdd}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <UserModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, editingUser: null })}
        onSave={handleSave}
        initialData={modalState.editingUser || undefined}
      />
    </div>
  );
}
