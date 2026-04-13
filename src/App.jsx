import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, onSnapshot, addDoc, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { LayoutDashboard, Users, CalendarCheck, BarChart3, Loader2 } from 'lucide-react';

// Import all your separated components
import NavItem from './components/NavItem';
import DashboardTab from './components/DashboardTab';
import StudentsTab from './components/StudentsTab';
import AttendanceTab from './components/AttendanceTab';
import ReportsTab from './components/ReportsTab';

// --- Firebase Initialization ---
let firebaseConfig = {
  apiKey: "AIzaSyBfwcF6saz3Xs5PNtgbvUcKj5Iz7C7E2_c",
  authDomain: "attendify-8bf31.firebaseapp.com",
  projectId: "attendify-8bf31",
  storageBucket: "attendify-8bf31.firebasestorage.app",
  messagingSenderId: "310272296314",
  appId: "1:310272296314:web:a0f3a821745bbd402502c3",
  measurementId: "G-RHTFMMH1LV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = 'student-attendance-app';

export default function App() {
    const [user, setUser] = useState(null);
    const [isInitializing, setIsInitializing] = useState(true);

    // Data States
    const [students, setStudents] = useState([]);
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [isLoadingData, setIsLoadingData] = useState(true);

    // UI States
    const [currentTab, setCurrentTab] = useState('dashboard');

    // --- Authentication Effect ---
    useEffect(() => {
        const initAuth = async () => {
            try {
                await signInAnonymously(auth);
            } catch (error) {
                console.error("Auth error:", error);
            }
        };
        initAuth();

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsInitializing(false);
        });
        return () => unsubscribe();
    }, []);

    // --- Data Fetching Effect ---
    useEffect(() => {
        if (!user) return;
        setIsLoadingData(true);

        const studentsRef = collection(db, 'artifacts', appId, 'users', user.uid, 'students');
        const attendanceRef = collection(db, 'artifacts', appId, 'users', user.uid, 'attendance');

        const unsubStudents = onSnapshot(studentsRef, (snapshot) => {
            const studentData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            studentData.sort((a, b) => a.rollNo.localeCompare(b.rollNo));
            setStudents(studentData);
            setIsLoadingData(false);
        });

        const unsubAttendance = onSnapshot(attendanceRef, (snapshot) => {
            const records = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAttendanceRecords(records);
        });

        return () => {
            unsubStudents();
            unsubAttendance();
        };
    }, [user]);

    // --- Helper Functions ---
    const handleAddStudent = async (student) => {
        if (!user) return;
        const studentsRef = collection(db, 'artifacts', appId, 'users', user.uid, 'students');
        await addDoc(studentsRef, student);
    };

    const handleDeleteStudent = async (studentId) => {
        if (!user) return;
        const studentDocRef = doc(db, 'artifacts', appId, 'users', user.uid, 'students', studentId);
        await deleteDoc(studentDocRef);
    };

    const handleSaveAttendance = async (dateStr, recordData) => {
        if (!user) return;
        const recordDocRef = doc(db, 'artifacts', appId, 'users', user.uid, 'attendance', dateStr);
        await setDoc(recordDocRef, {
            date: dateStr,
            records: recordData,
            updatedAt: new Date().toISOString()
        });
        alert('Attendance saved successfully!');
    };

    if (isInitializing) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center text-indigo-600">
                    <Loader2 className="h-12 w-12 animate-spin mb-4" />
                    <p className="text-lg font-medium text-gray-700">Initializing Space Environment...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <div className="w-64 bg-indigo-900 text-white flex flex-col shadow-xl z-10">
                <div className="p-6">
                    <h1 className="text-2xl font-bold tracking-tight">Attendify</h1>
                    <p className="text-indigo-300 text-sm mt-1">Teacher Portal</p>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" isActive={currentTab === 'dashboard'} onClick={() => setCurrentTab('dashboard')} />
                    <NavItem icon={<Users size={20} />} label="Students" isActive={currentTab === 'students'} onClick={() => setCurrentTab('students')} />
                    <NavItem icon={<CalendarCheck size={20} />} label="Mark Attendance" isActive={currentTab === 'attendance'} onClick={() => setCurrentTab('attendance')} />
                    <NavItem icon={<BarChart3 size={20} />} label="Reports" isActive={currentTab === 'reports'} onClick={() => setCurrentTab('reports')} />
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto bg-gray-50">
                <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800 capitalize">{currentTab.replace('-', ' ')}</h2>
                    <div className="text-sm text-gray-500">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </header>

                <main className="p-8">
                    {isLoadingData ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
                        </div>
                    ) : (
                        <>
                            {currentTab === 'dashboard' && <DashboardTab students={students} attendanceRecords={attendanceRecords} />}
                            {currentTab === 'students' && <StudentsTab students={students} onAdd={handleAddStudent} onDelete={handleDeleteStudent} />}
                            {currentTab === 'attendance' && <AttendanceTab students={students} attendanceRecords={attendanceRecords} onSave={handleSaveAttendance} />}
                            {currentTab === 'reports' && <ReportsTab students={students} attendanceRecords={attendanceRecords} />}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}