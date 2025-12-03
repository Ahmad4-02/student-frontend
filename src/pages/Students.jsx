import { useState } from "react";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const addStudent = () => {
    if (!name || !email || !phone) {
      alert("يرجى ملء جميع الحقول");
      return;
    }

    setStudents([
      ...students,
      { id: Date.now(), name, email, phone },
    ]);

    setName("");
    setEmail("");
    setPhone("");
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">إدارة الطلاب</h1>

      {/* ✅ إضافة طالب */}
      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        <h2 className="font-semibold text-lg">إضافة طالب</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="اسم الطالب"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="رقم الهاتف"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <button
          onClick={addStudent}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          إضافة
        </button>
      </div>

      {/* ✅ جدول الطلاب */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="font-semibold text-lg mb-4">قائمة الطلاب</h2>

        {students.length === 0 ? (
          <p className="text-gray-500">لا يوجد طلاب بعد</p>
        ) : (
          <table className="w-full text-sm text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">الاسم</th>
                <th className="p-2 border">الإيميل</th>
                <th className="p-2 border">الهاتف</th>
                <th className="p-2 border">إجراء</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="p-2 border">{student.name}</td>
                  <td className="p-2 border">{student.email}</td>
                  <td className="p-2 border">{student.phone}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => deleteStudent(student.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
