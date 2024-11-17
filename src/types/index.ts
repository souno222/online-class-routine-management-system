export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface ClassTime {
  start: string;
  end: string;
}

export interface RoutineEntry {
  id: string;
  day: string;
  time: ClassTime;
  subjectCode: string;
  teacherInitials: string;
  room: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  subjectCode: string;
}

export interface Exam {
  id: string;
  subjectCode: string;
  date: Date;
  duration: number;
  room: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'routine' | 'assignment' | 'exam' | 'general';
  read: boolean;
  createdAt: Date;
}