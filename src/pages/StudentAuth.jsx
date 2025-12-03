import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentAuth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
        
        <div className="flex justify-between mb-6">
          <button
            className={`w-1/2 py-2 ${isLogin ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setIsLogin(true)}
          >
            تسجيل الدخول
          </button>
          <button
            className={`w-1/2 py-2 ${!isLogin ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setIsLogin(false)}
          >
            إنشاء حساب
          </button>
        </div>

        {isLogin ? <StudentLogin /> : <StudentRegister onSuccess={() => setIsLogin(true)} />}
      </div>
    </div>
  );
}

/* ================= Login ================= */

function StudentLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setError("يرجى تعبئة جميع الحقول");
      return;
    }

    localStorage.setItem("student_token", "demo");
    navigate("/student/dashboard");

  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-center">دخول الطالب</h2>

      <Input value={email} setValue={setEmail} placeholder="البريد الإلكتروني" />
      <Input value={password} setValue={setPassword} placeholder="كلمة المرور" type="password" />

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        تسجيل الدخول
      </button>
    </div>
  );
}

/* ================= Register ================= */

function StudentRegister({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleRegister = () => {
    for (let key in form) {
      if (!form[key]) {
        setError("يرجى تعبئة جميع الحقول");
        return;
      }
    }

    setError("");
    setSuccess(true);

    setTimeout(() => {
      onSuccess();
    }, 1500);
  };

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold text-center">إنشاء حساب طالب</h2>

      {Object.keys(form).map((key) => (
        <Input
          key={key}
          placeholder={getLabel(key)}
          value={form[key]}
          setValue={(v) => handleChange(key, v)}
        />
      ))}

      {error && <p className="text-red-600 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">تم إنشاء الحساب بنجاح ✅</p>}

      <button
        onClick={handleRegister}
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        إنشاء الحساب
      </button>
    </div>
  );
}

/* ================= Input Component ================= */

function Input({ value, setValue, placeholder, type = "text" }) {
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`w-full border p-2 rounded ${
          !value ? "border-red-400" : "border-green-500"
        }`}
        placeholder={placeholder}
      />
      {value && (
        <span className="absolute top-2 right-2 text-green-600">✔</span>
      )}
    </div>
  );
}

function getLabel(key) {
  const map = {
    name: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    country: "البلد",
    password: "كلمة المرور",
  };
  return map[key];
}
