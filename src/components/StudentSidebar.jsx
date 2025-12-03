import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function StudentSidebar() {
  const location = useLocation();
  const { dark, setDark } = useTheme();

  const activeClass = (path) =>
    location.pathname === path
      ? "bg-blue-600 text-white"
      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700";

  return (
    <div className="w-64 min-h-screen bg-white dark:bg-gray-900 shadow border-r p-4 space-y-2">

      <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
        Student Panel
      </h1>

      <Link to="/dashboard" className={`block px-4 py-2 rounded ${activeClass("/dashboard")}`}>
        Dashboard
      </Link>

      <Link to="/profile" className={`block px-4 py-2 rounded ${activeClass("/profile")}`}>
        الملف الشخصي
      </Link>

      <Link to="/applications" className={`block px-4 py-2 rounded ${activeClass("/applications")}`}>
        طلباتي
      </Link>

      {/* ✅ زر Dark Mode */}
      <button
        onClick={() => setDark(!dark)}
        className="w-full mt-6 bg-gray-200 dark:bg-gray-700 text-black dark:text-white py-2 rounded"
      >
        {dark ? "☀️ الوضع النهاري" : "🌙 الوضع الليلي"}
      </button>
    </div>
  );
}
