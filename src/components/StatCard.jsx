import React from 'react';

export default function StatCard({ title, value, icon, subtitle }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4">
            <div className="p-3 bg-gray-50 rounded-lg">
                {icon}
            </div>
            <div>
                <h4 className="text-sm font-medium text-gray-500">{title}</h4>
                <div className="text-2xl font-bold text-gray-900">{value}</div>
                {subtitle && <div className="text-xs text-amber-500 mt-1">{subtitle}</div>}
            </div>
        </div>
    );
}