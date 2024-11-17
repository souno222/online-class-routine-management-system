import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { GraduationCap } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useAuthStore((state) => state.setUser);

  // Mock user database
  const mockUsers = {
    'admin@example.com': { id: '1', name: 'Admin User', role: 'admin' },
    'teacher@example.com': { id: '2', name: 'Teacher User', role: 'teacher' },
    'student@example.com': { id: '3', name: 'Student User', role: 'student' },
    'poulami.dutta@gmail.com': { id: '1', name: 'Poulami Dutta', role: 'admin' },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = mockUsers[email as keyof typeof mockUsers];
    
    if (user && password === 'password') {
      setUser({ ...user, email });
      toast.success(`Welcome back, ${user.name}!`);
    } else {
      toast.error('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <GraduationCap className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Class Routine Management
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Demo Accounts (password: password)
        </p>
        <div className="mt-2 text-center text-xs text-gray-500 space-y-1">
          <p>Admin: admin@example.com</p>
          <p>Teacher: teacher@example.com</p>
          <p>Student: student@example.com</p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}