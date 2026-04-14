import React, { useState, useEffect } from 'react';
import { Users, Save, CheckCircle2, XCircle, Clock } from 'lucide-react';

export default function AttendanceTab({ students, attendanceRecords, onSave }) {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [currentRecord, setCurrentRecord] = useState({});

    useEffect(() => {
        const existing = attendanceRecords.find(r => r.date === selectedDate);
        if (existing && existing.records) {
            setCurrentRecord(existing.records);
        } else {
            const defaultRecord = {};
            students.forEach(s => { defaultRecord[s.id] = 'Present'; });
            setCurrentRecord(defaultRecord);
        }
    }, [selectedDate, attendanceRecords, students]);

    const handleStatusChange = (studentId, status) => {
        setCurrentRecord(prev => ({ ...prev, [studentId]: status }));
    };

    const handleSave = () => {
        onSave(selectedDate, currentRecord);
    };

    if (students.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                <Users className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No Students Found</h3>
                <p className="text-gray-500 mt-2">Please add students in the Students tab before marking attendance.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[calc(100vh-140px)]">
            <div className="p-6 border-b border-gray-100 bg-gray-50 flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center space-x-4">
                    <label className="font-medium text-gray-700">Date:</label>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="rounded-md border border-gray-300 px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <button
                    onClick={handleSave}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition shadow-sm flex items-center"
                >
                    <Save size={18} className="mr-2" /> Save Attendance
                </button>
            </div>

            <div className="overflow-auto flex-1 p-6">
                <div className="space-y-3">
                    {students.map(student => {
                        const status = currentRecord[student.id] || 'Present';
                        return (
                            <div key={student.id} className="flex flex-wrap items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-indigo-300 transition bg-white shadow-sm">
                                <div className="flex-1 min-w-[200px] mb-2 sm:mb-0">
                                    <div className="font-semibold text-gray-900">{student.name}</div>
                                    <div className="text-sm text-gray-500 font-mono">{student.rollNo}</div>
                                </div>

                                <div className="flex rounded-md shadow-sm" role="group">
                                    <button
                                        type="button"
                                        onClick={() => handleStatusChange(student.id, 'Present')}
                                        className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${status === 'Present'
                                                ? 'bg-green-100 text-green-700 border-green-200 z-10 ring-1 ring-green-500'
                                                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        <span className="flex items-center"><CheckCircle2 size={16} className="mr-1.5" /> Present</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleStatusChange(student.id, 'Absent')}
                                        className={`px-4 py-2 text-sm font-medium border-t border-b ${status === 'Absent'
                                                ? 'bg-red-100 text-red-700 border-red-200 z-10 ring-1 ring-red-500'
                                                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        <span className="flex items-center"><XCircle size={16} className="mr-1.5" /> Absent</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleStatusChange(student.id, 'Late')}
                                        className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${status === 'Late'
                                                ? 'bg-amber-100 text-amber-700 border-amber-200 z-10 ring-1 ring-amber-500'
                                                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        <span className="flex items-center"><Clock size={16} className="mr-1.5" /> Late</span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
