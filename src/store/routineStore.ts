import { create } from 'zustand';
import { RoutineEntry } from '../types';

interface RoutineState {
  routine: Record<string, Record<string, RoutineEntry>>;
  updateRoutine: (day: string, time: string, entry: RoutineEntry) => void;
  deleteRoutine: (day: string, time: string) => void;
}

export const useRoutineStore = create<RoutineState>((set) => ({
  routine: {
    'Monday': {
      '9:00-9:50': { id: '1', day: 'Monday', time: { start: '9:00', end: '9:50' }, subjectCode: 'CSE101', teacherInitials: 'JD', room: '301' },
      '10:00-10:50': { id: '2', day: 'Monday', time: { start: '10:00', end: '10:50' }, subjectCode: 'MAT201', teacherInitials: 'RK', room: '205' },
    },
    // Add more initial data as needed
  },
  updateRoutine: (day, time, entry) =>
    set((state) => ({
      routine: {
        ...state.routine,
        [day]: {
          ...state.routine[day],
          [time]: entry,
        },
      },
    })),
  deleteRoutine: (day, time) =>
    set((state) => {
      const newDay = { ...state.routine[day] };
      delete newDay[time];
      return {
        routine: {
          ...state.routine,
          [day]: newDay,
        },
      };
    }),
}));