import React, { useState } from 'react';
import { Download, Edit2, Trash2 } from 'lucide-react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { useRoutineStore } from '../store/routineStore';
import { useAuthStore } from '../store/authStore';
import EditRoutineModal from '../components/EditRoutineModal';
import { RoutineEntry } from '../types';
import toast from 'react-hot-toast';

export default function Routine() {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin';
  const { routine, updateRoutine, deleteRoutine } = useRoutineStore();
  const [editModal, setEditModal] = useState({
    isOpen: false,
    day: '',
    timeSlot: '',
    data: {} as Partial<RoutineEntry>,
  });

  const timeSlots = [
    '9:00-9:50', '9:50-10:40', '10:40-11:30', '11:30-12:20',
    '12:20-13:10', '13:10-14:00', '14:00-14:50', '14:50-15:40',
    '15:40-16:30', '16:30-17:20', '17:20-18:10'
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const downloadPDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(16);
    doc.text('Class Routine', 14, 15);
    
    // Prepare table data
    const tableData = days.map(day => {
      return [
        day,
        ...timeSlots.map(slot => {
          const class_ = routine[day]?.[slot];
          if (class_) {
            return `${class_.subjectCode}\n${class_.room}\n${class_.teacherInitials}`;
          }
          return '—';
        })
      ];
    });

    // Add table headers
    const headers = [
      ['Day/Time', ...timeSlots]
    ];

    // Configure table
    (doc as any).autoTable({
      head: headers,
      body: tableData,
      startY: 25,
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      columnStyles: {
        0: { cellWidth: 20 }, // Day column
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontSize: 8,
        fontStyle: 'bold',
      },
      theme: 'grid',
      didDrawPage: function(data: any) {
        // Add footer
        doc.setFontSize(8);
        doc.text(
          `Generated on ${new Date().toLocaleDateString()}`,
          14,
          doc.internal.pageSize.height - 10
        );
      },
    });

    doc.save('class-routine.pdf');
    toast.success('Routine downloaded successfully');
  };

  const handleEdit = (day: string, timeSlot: string, data?: RoutineEntry) => {
    setEditModal({
      isOpen: true,
      day,
      timeSlot,
      data: data || {},
    });
  };

  const handleSave = (entry: Partial<RoutineEntry>) => {
    updateRoutine(
      entry.day!,
      `${entry.time?.start}-${entry.time?.end}`,
      entry as RoutineEntry
    );
    toast.success('Routine updated successfully');
  };

  const handleDelete = (day: string, timeSlot: string) => {
    if (confirm('Are you sure you want to delete this class?')) {
      deleteRoutine(day, timeSlot);
      toast.success('Class deleted successfully');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Class Routine</h1>
        <button
          onClick={downloadPDF}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Day/Time
              </th>
              {timeSlots.map((slot) => (
                <th
                  key={slot}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {slot}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {days.map((day) => (
              <tr key={day}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {day}
                </td>
                {timeSlots.map((slot) => {
                  const class_ = routine[day]?.[slot];
                  return (
                    <td
                      key={slot}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {class_ ? (
                        <div className="relative group">
                          <div>
                            <div className="font-medium text-gray-900">
                              {class_.subjectCode}
                            </div>
                            <div className="text-xs text-gray-500">
                              Room: {class_.room} • {class_.teacherInitials}
                            </div>
                          </div>
                          {isAdmin && (
                            <div className="absolute top-0 right-0 hidden group-hover:flex space-x-2">
                              <button
                                onClick={() => handleEdit(day, slot, class_)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(day, slot)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          {isAdmin ? (
                            <button
                              onClick={() => handleEdit(day, slot)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                          ) : (
                            '—'
                          )}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditRoutineModal
        isOpen={editModal.isOpen}
        onClose={() => setEditModal({ ...editModal, isOpen: false })}
        onSave={handleSave}
        initialData={editModal.data}
        day={editModal.day}
        timeSlot={editModal.timeSlot}
      />
    </div>
  );
}