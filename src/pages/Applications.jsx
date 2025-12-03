import { useEffect, useState } from "react";

export default function Applications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("student_token");

    fetch("https://student-backend-r6b5.onrender.com/api/applications", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setApps(data));
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">طلباتي</h1>

      {apps.map((app) => (
        <div
          key={app._id}
          className="bg-white p-4 rounded shadow flex justify-between"
        >
          <span>{app.title}</span>
          <span className="text-blue-600">{app.status}</span>
        </div>
      ))}
    </div>
  );
}
