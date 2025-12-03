import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import StudentAuth from "./auth/StudentAuth";
import Profile from "./pages/Profile";
import Applications from "./pages/Applications";


// ✅ تحقق من تسجيل الدخول
const isAuthenticated = () => {
  return !!localStorage.getItem("student_token");
};

function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/student-auth" />;
}

export default function App() {
  return (
    <Routes>
      {/* ✅ صفحة تسجيل الطالب */}
      <Route path="/student-auth" element={<StudentAuth />} />

      {/* داشبورد الطالب بعد الدخول */}
      <Route path="/student/dashboard" element={<Dashboard />} />
      
      {/* إعادة توجيه افتراضية */}
      <Route path="*" element={<Navigate to="/student/login" />} />

      {/* ✅ Dashboard محمي */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      {/* ✅ صفحة الملف الشخصي محمية */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/applications"
        element={
          <ProtectedRoute>
            <Applications />
          </ProtectedRoute>
        }
      />



      {/* ✅ أي رابط غلط يرجع لتسجيل الطالب */}
      <Route path="*" element={<Navigate to="/student-auth" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/applications" element={<Applications />} />

    </Routes>
  );
}
