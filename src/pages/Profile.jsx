import { useEffect, useState } from "react";

export default function Profile() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("student_data");
    if (data) {
      setStudent(JSON.parse(data));
    }
  }, []);

  if (!student) {
    return (
      <div className="p-6">
        <div className="bg-white p-6 rounded shadow text-gray-500">
          لا توجد بيانات طالب
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow space-y-4">

        <h1 className="text-2xl font-bold text-center text-blue-600">
          الملف الشخصي
        </h1>

        <div className="space-y-2">
          <p><b>الاسم:</b> {student.firstName} {student.lastName}</p>
          <p><b>الإيميل:</b> {student.email}</p>
          <p><b>الهاتف:</b> {student.phone}</p>
          <p><b>البلد:</b> {student.country}</p>
        </div>

        <button
          onClick={() => window.history.back()}
          className="w-full mt-4 bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
        >
          رجوع
        </button>

      </div>
    </div>
  );
}
