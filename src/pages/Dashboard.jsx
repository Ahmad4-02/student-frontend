import { useEffect, useState } from "react";
import StudentSidebar from "../components/StudentSidebar";

export default function Dashboard() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("student_data");
    if (data) setStudent(JSON.parse(data));
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/student-auth";
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">

      <StudentSidebar />

      <div className="flex-1 p-6 space-y-6">

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">
            Dashboard الطالب
          </h1>

          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            تسجيل الخروج
          </button>
        </div>

        {student && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-2">
            <p><b>الاسم:</b> {student.firstName} {student.lastName}</p>
            <p><b>الإيميل:</b> {student.email}</p>
            <p><b>الهاتف:</b> {student.phone}</p>
            <p><b>البلد:</b> {student.country}</p>
          </div>
        )}
      </div>
    </div>
  );
}
