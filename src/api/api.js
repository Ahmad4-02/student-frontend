import axios from "axios";

const api = axios.create({
  baseURL: "https://student-backend-r6b5.onrender.com/api/", // ✅ الباك إند الحقيقي
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("student_token"); // ✅ نفس المفتاح الذي تستخدمه في تسجيل الدخول
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
