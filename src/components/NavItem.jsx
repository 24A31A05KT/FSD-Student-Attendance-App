import React from 'react';

export default function NavItem({ icon, label, isActive, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${isActive
                    ? 'bg-indigo-700 text-white shadow-md'
                    : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
                }`}
        >
            {icon}
            <span className="font-medium">{label}</span>
        </button>
    );
}
