// ✅ تسجيل الدخول
export const loginAPI = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const students = JSON.parse(localStorage.getItem("students")) || [];

      const user = students.find(
        (s) => s.email === email && s.password === password
      );

      if (user) {
        resolve({
          token: "demo_token_123",
          user: {
            id: user.id,
            name: user.name,
            role: "student",
            email: user.email,
          },
        });
      } else {
        reject("بيانات خاطئة");
      }
    }, 800);
  });
};

// ✅ إنشاء حساب وتخزينه
export const registerAPI = async (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const students = JSON.parse(localStorage.getItem("students")) || [];

      const alreadyExists = students.some(
        (s) => s.email === data.email
      );

      if (alreadyExists) {
        reject("هذا البريد مستخدم مسبقًا");
        return;
      }

      const newStudent = {
        id: Date.now(),
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      };

      students.push(newStudent);
      localStorage.setItem("students", JSON.stringify(students));

      resolve({
        message: "تم إنشاء الحساب بنجاح",
        user: newStudent,
      });
    }, 800);
  });
};
