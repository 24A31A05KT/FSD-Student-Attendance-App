import React, { useMemo } from 'react';
import { BarChart3, Send } from 'lucide-react';

export default function ReportsTab({ students, attendanceRecords }) {
  const stats = useMemo(() => {
    return students.map(student => {
      let present = 0, absent = 0, late = 0, totalClasses = 0;

      attendanceRecords.forEach(record => {
        if (record.records && record.records[student.id]) {
          totalClasses++;
          const status = record.records[student.id];
          if (status === 'Present') present++;
          if (status === 'Absent') absent++;
          if (status === 'Late') late++;
        }
      });

      const attended = present + late; 
      const percentage = totalClasses > 0 ? Math.round((attended / totalClasses) * 100) : 0;
      return { ...student, present, absent, late, totalClasses, percentage };
    });
  }, [students, attendanceRecords]);

  // --- n8n Automation Function ---
  const triggerN8nAutomation = async (studentStat) => {
    if (!studentStat.phone) {
      alert(`Cannot send! No phone number saved for ${studentStat.name}.`);
      return;
    }

    // ⚠️ PASTE YOUR N8N TEST WEBHOOK URL HERE:
    // ⚠️ PASTE YOUR N8N TEST WEBHOOK URL HERE:
const n8nWebhookUrl = 'https://jagan1997.app.n8n.cloud/webhook-test/7c9c684e-f120-4c5a-971c-bc1802957d97';
    try {
      // We package the data into a JSON box and shoot it to n8n
      const response = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentName: studentStat.name,
          phoneNumber: studentStat.phone,
          attendancePercentage: studentStat.percentage,
          daysPresent: studentStat.present,
          daysAbsent: studentStat.absent
        })
      });

      if (response.ok) {
        alert(`✅ Data sent successfully to n8n for ${studentStat.name}!`);
      } else {
        alert('❌ n8n received the signal, but there was an error.');
      }
    } catch (error) {
      console.error("Error sending to n8n:", error);
      alert('🚨 Could not connect to n8n. Is the URL correct and is n8n listening?');
    }
  };

  if (students.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
        <BarChart3 className="mx-auto h-12 w-12 text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-900">No Data Available</h3>
        <p className="text-gray-500 mt-2">Add students and mark attendance to see reports.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-800">Overall Attendance Report</h3>
        <p className="text-sm text-gray-500 mt-1">Summary of all recorded classes ({attendanceRecords.length} total sessions)</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-white border-b border-gray-200 text-gray-700">
            <tr>
              <th className="px-6 py-4 font-semibold">Roll No</th>
              <th className="px-6 py-4 font-semibold">Name</th>
              <th className="px-6 py-4 font-semibold text-center text-green-600">Present</th>
              <th className="px-6 py-4 font-semibold text-center text-red-600">Absent</th>
              <th className="px-6 py-4 font-semibold text-right">Attendance %</th>
              <th className="px-6 py-4 font-semibold text-center">Auto Alert</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {stats.map(stat => (
              <tr key={stat.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-mono text-gray-500">{stat.rollNo}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{stat.name}</td>
                <td className="px-6 py-4 text-center font-medium">{stat.present}</td>
                <td className="px-6 py-4 text-center font-medium">{stat.absent}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end">
                    <span className={`font-bold ${stat.percentage >= 75 ? 'text-green-600' : stat.percentage >= 51 ? 'text-amber-500' : 'text-red-600'}`}>
                      {stat.percentage}%
                    </span>
                  </div>
                  <div className="w-24 h-1.5 bg-gray-200 rounded-full mt-2 ml-auto overflow-hidden">
                    <div className={`h-full rounded-full ${stat.percentage >= 75 ? 'bg-green-500' : stat.percentage >= 51 ? 'bg-amber-400' : 'bg-red-500'}`} style={{ width: `${stat.percentage}%` }}></div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <button 
                    onClick={() => triggerN8nAutomation(stat)}
                    className="inline-flex items-center justify-center p-2 bg-indigo-100 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-lg transition-colors duration-200 shadow-sm"
                    title="Send to n8n"
                  >
                    <Send size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}