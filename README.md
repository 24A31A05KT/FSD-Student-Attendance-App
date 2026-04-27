# 📚 Student Attendance App (Attendify)

A modern **Student Attendance Management System** built using React, Firebase, and Tailwind CSS.
This app allows teachers to manage students, mark attendance, and generate reports efficiently.

---

## 🚀 Features

* 👨‍🎓 Add & manage student records
* 📅 Mark daily attendance (Present / Absent / Late)
* 📊 Dashboard with real-time statistics
* 📈 Attendance reports & analytics
* 📱 WhatsApp integration (via n8n webhook)
* 🔐 Firebase authentication & database

---

## 🛠️ Tech Stack

* ⚛️ React (Frontend)
* ⚡ Vite (Build tool)
* 🔥 Firebase (Auth + Firestore Database)
* 🎨 Tailwind CSS (Styling)
* 📦 Lucide Icons

Dependencies used: 

---

## 📂 Project Structure

```
student-attendance-app/
│── src/
│   ├── components/
│   │   ├── DashboardTab.jsx
│   │   ├── StudentsTab.jsx
│   │   ├── AttendanceTab.jsx
│   │   ├── ReportsTab.jsx
│   │   └── NavItem.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
│── index.html
│── package.json
│── tailwind.config.js
│── vite.config.js
```

Main entry file: 

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/24A31A05KT/FSD-Student-Attendance-App
cd FSD-Student-Attendance-App
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the project

```bash
npm run dev
```

### 4️⃣ Open in browser

```
http://localhost:5173
```

---

## 🔥 Firebase Configuration

Firebase is already configured in the app: 

To use your own Firebase:

1. Create a project in Firebase Console
2. Replace config inside `App.jsx`

---

## 📊 Modules

### 📌 Dashboard

* Shows total students
* Displays attendance stats

### 👨‍🎓 Students

* Add / delete students
* Store roll number & phone number

### 📅 Attendance

* Mark daily attendance
* Save records in Firebase

### 📈 Reports

* View attendance percentage
* Send data to n8n webhook

---

## 🔗 Automation (n8n)

The app integrates with **n8n webhook** for sending attendance reports: 

---

## 🎯 Future Improvements

* Admin login system
* Export reports (PDF/Excel)
* Student login portal
* Mobile app version

---

## 🤝 Contributing

Feel free to fork this repo and contribute improvements!

---

## 📜 License

This project is for educational purposes.

---

## 👨‍💻 Author

**Jagan Raju**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
