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
      {/* ✅ صفحة تسجيل الدخول */}
      <Route path="/student-auth" element={<StudentAuth />} />

      {/* ✅ Dashboard محمي */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* ✅ الملف الشخصي محمي */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* ✅ الطلبات محمية */}
      <Route
        path="/applications"
        element={
          <ProtectedRoute>
            <Applications />
          </ProtectedRoute>
        }
      />

      {/* ✅ أي رابط خاطئ يرجع لتسجيل الدخول */}
      <Route path="*" element={<Navigate to="/student-auth" />} />
    </Routes>
  );
}
