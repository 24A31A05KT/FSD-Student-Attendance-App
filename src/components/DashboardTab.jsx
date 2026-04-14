import React from 'react';
import { Users, CheckCircle2, BarChart3 } from 'lucide-react';
import StatCard from './StatCard';

export default function DashboardTab({ students, attendanceRecords }) {
    const today = new Date().toISOString().split('T')[0];
    const todayRecord = attendanceRecords.find(r => r.date === today);

    const totalStudents = students.length;
    let presentToday = 0;
    let absentToday = 0;

    if (todayRecord && todayRecord.records) {
        Object.values(todayRecord.records).forEach(status => {
            if (status === 'Present' || status === 'Late') presentToday++;
            if (status === 'Absent') absentToday++;
        });
    }

    const attendanceRate = totalStudents > 0 && todayRecord
        ? Math.round((presentToday / totalStudents) * 100)
        : 0;

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Students" value={totalStudents} icon={<Users className="text-blue-500" size={24} />} />
                <StatCard
                    title="Present Today"
                    value={todayRecord ? presentToday : '-'}
                    subtitle={!todayRecord ? "Attendance not marked" : null}
                    icon={<CheckCircle2 className="text-green-500" size={24} />}
                />
                <StatCard
                    title="Today's Attendance Rate"
                    value={todayRecord ? `${attendanceRate}%` : '-'}
                    icon={<BarChart3 className="text-indigo-500" size={24} />}
                />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Guide</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Navigate to the <strong>Students</strong> tab to build your class roster.</li>
                    <li>Use <strong>Mark Attendance</strong> daily to record student presence.</li>
                    <li>Check <strong>Reports</strong> to see historical attendance percentages for each student.</li>
                </ul>
            </div>
        </div>
    );
}