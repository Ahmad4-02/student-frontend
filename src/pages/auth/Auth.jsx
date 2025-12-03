import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../../api/auth";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();

  // ✅ فحص إذا كان النص عربي
  const isArabic = (text) => /[\u0600-\u06FF]/.test(text);

  const validate = (name, value) => {
    let error = "";

    if (!value.trim()) {
      error = "هذا الحقل مطلوب";
    } else {
      if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
        error = "بريد غير صالح";
      }
      if (name === "password" && value.length < 6) {
        error = "كلمة المرور على الأقل 6 أحرف";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validate(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;
    Object.keys(form).forEach((key) => {
      if (!isLogin || key !== "name") {
        if (!form[key]) {
          validate(key, form[key]);
          hasError = true;
        }
      }
    });

    if (hasError) return;

    setLoading(true);

    try {
      if (isLogin) {
        const res = await loginAPI(form.email, form.password);
        localStorage.setItem("access_token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));

        setModalMessage("تم تسجيل الدخول بنجاح ✅");
        setShowModal(true);

        setTimeout(() => {
          setShowModal(false);
          navigate("/dashboard");
        }, 1500);
      } else {
        await registerAPI(form);

        setModalMessage("تم إنشاء الحساب بنجاح ✅");
        setShowModal(true);

        setTimeout(() => {
          setShowModal(false);
          setIsLogin(true);
        }, 1500);
      }
    } catch (err) {
      setModalMessage("البريد مستخدم مسبقًا ❌");
      setShowModal(true);
      setTimeout(() => setShowModal(false), 1500);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (name) =>
    `w-full px-4 py-2 border rounded-lg outline-none ${
      errors[name]
        ? "border-red-500"
        : form[name]
        ? "border-green-500"
        : "border-gray-300"
    }`;

  const checkIconPosition = (value) =>
    isArabic(value) ? "left-3" : "right-3";

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

          <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
            {isLogin ? "تسجيل الدخول" : "إنشاء حساب"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            {!isLogin && (
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="الاسم الكامل"
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass("name")}
                />

                {form.name && !errors.name && (
                  <span
                    className={`absolute top-3 text-green-500 ${checkIconPosition(
                      form.name
                    )}`}
                  >
                    ✔
                  </span>
                )}

                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name}
                  </p>
                )}
              </div>
            )}

            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="البريد الإلكتروني"
                value={form.email}
                onChange={handleChange}
                className={inputClass("email")}
              />
              {form.email && !errors.email && (
                <span className="absolute top-3 right-3 text-green-500">
                  ✔
                </span>
              )}
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                type="text"
                name="phone"
                placeholder="رقم الهاتف"
                value={form.phone}
                onChange={handleChange}
                className={inputClass("phone")}
              />
              {form.phone && !errors.phone && (
                <span className="absolute top-3 right-3 text-green-500">
                  ✔
                </span>
              )}
            </div>

            <div className="relative">
              <input
                type="password"
                name="password"
                placeholder="كلمة المرور"
                value={form.password}
                onChange={handleChange}
                className={inputClass("password")}
              />
              {form.password && !errors.password && (
                <span className="absolute top-3 right-3 text-green-500">
                  ✔
                </span>
              )}
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              {loading
                ? "جارٍ المعالجة..."
                : isLogin
                ? "دخول"
                : "تسجيل"}
            </button>
          </form>

          <div className="text-center mt-4 text-sm">
            {isLogin ? (
              <span>
                ليس لديك حساب؟{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-blue-600 font-medium"
                >
                  إنشاء حساب
                </button>
              </span>
            ) : (
              <span>
                لديك حساب؟{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-blue-600 font-medium"
                >
                  تسجيل دخول
                </button>
              </span>
            )}
          </div>

        </div>
      </div>

      {/* ✅ Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white px-8 py-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-bold mb-4">{modalMessage}</p>
          </div>
        </div>
      )}
    </>
  );
}
