import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function StudentAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("https://student-backend-r6b5.onrender.com/api/student/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    localStorage.setItem("student_token", data.token);
    localStorage.setItem("student_data", JSON.stringify(data.student));

    navigate("/dashboard");
  } catch (err) {
    alert("فشل الاتصال بالسيرفر");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow w-80 space-y-3"
      >
        <h2 className="text-xl font-bold text-center">تسجيل دخول الطالب</h2>

        <input
          type="email"
          placeholder="البريد"
          className="w-full border p-2 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="كلمة المرور"
          className="w-full border p-2 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          دخول
        </button>
      </form>
    </div>
  );
}
