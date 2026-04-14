import React, { useState } from 'react';
import { Plus, Trash2, Phone } from 'lucide-react';

export default function StudentsTab({ students, onAdd, onDelete }) {
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [phone, setPhone] = useState(''); // New state for phone number

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !rollNo.trim() || !phone.trim()) {
      alert("Please fill in all fields (Name, Roll No, and Phone).");
      return;
    }
    
    if (students.some(s => s.rollNo === rollNo)) {
      alert("A student with this Roll Number already exists.");
      return;
    }

    // Pass the phone number to the database!
    onAdd({ 
      name: name.trim(), 
      rollNo: rollNo.trim(), 
      phone: phone.trim(),
      createdAt: new Date().toISOString() 
    });
    
    // Clear the form
    setName('');
    setRollNo('');
    setPhone('');
  };

  return (
    <div className="space-y-8 p-4">
      {/* Upgraded Add Student Form */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-50 animate-float hover:shadow-2xl transition-all duration-500">
        <h3 className="text-lg font-semibold text-indigo-900 mb-4 flex items-center">
          <span className="bg-indigo-100 text-indigo-600 p-2 rounded-lg mr-3 shadow-sm">🚀</span>
          Add New Student
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" value={name} onChange={e => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all bg-gray-50 hover:bg-white"
              placeholder="e.g. John Doe"
            />
          </div>
          <div className="w-full sm:w-40">
            <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
            <input 
              type="text" value={rollNo} onChange={e => setRollNo(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all bg-gray-50 hover:bg-white"
              placeholder="e.g. CS-101"
            />
          </div>
          <div className="w-full sm:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
            <input 
              type="text" value={phone} onChange={e => setPhone(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all bg-gray-50 hover:bg-white"
              placeholder="e.g. +919876543210"
            />
          </div>
          <button type="submit" className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-500 hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(79,_70,_229,_0.4)] transition-all duration-300 flex items-center justify-center font-medium">
            <Plus size={20} className="mr-2" /> Add 
          </button>
        </form>
      </div>

      {/* Upgraded Student List */}
      <div className="bg-white rounded-2xl shadow-lg border border-indigo-50 overflow-hidden animate-float-delayed hover:shadow-2xl transition-all duration-500">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gradient-to-r from-white to-indigo-50/50">
          <h3 className="text-lg font-semibold text-indigo-900 flex items-center">
            <span className="bg-indigo-100 text-indigo-600 p-2 rounded-lg mr-3 shadow-sm">👨‍🚀</span>
            Class Roster
          </h3>
          <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            {students.length} Students
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/50 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Roll No</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Name</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Phone</th>
                <th className="px-6 py-4 font-semibold text-right uppercase tracking-wider text-xs">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {students.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-400 font-medium">
                    Floating in empty space... Add your first student above! 🌌
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id} className="hover:bg-indigo-50/50 transition-colors duration-200 group">
                    <td className="px-6 py-4 font-mono text-indigo-500 font-medium">{student.rollNo}</td>
                    <td className="px-6 py-4 font-medium text-gray-800">{student.name}</td>
                    <td className="px-6 py-4 text-gray-500 flex items-center mt-2">
                      <Phone size={14} className="mr-2 opacity-50" /> 
                      {student.phone || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => { if(window.confirm(`Remove ${student.name}?`)) onDelete(student.id); }}
                        className="text-red-400 hover:text-white hover:bg-red-500 p-2.5 rounded-xl hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 opacity-50 group-hover:opacity-100"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}