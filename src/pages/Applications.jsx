import { useEffect, useState } from "react";
import api from "../api/api";

export default function Applications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
  fetch("http://localhost:5000/api/applications")
    .then(res => res.json())
    .then(data => setApplications(data));
}, []);


  useEffect(() => {
    api.get("/posts?_limit=5").then((res) => {
      const data = res.data.map((item) => ({
        id: item.id,
        program: item.title,
        status: "قيد المراجعة",
      }));

      setApplications(data);
    });
  }, []);

  

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      <h1 className="text-2xl font-bold text-blue-600">
        الطلبات (من API)
      </h1>

      <div className="bg-white p-4 rounded shadow">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">اسم البرنامج</th>
              <th className="border p-2">الحالة</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app, i) => (
              <tr key={app.id}>
                <td className="border p-2">{i + 1}</td>
                <td className="border p-2">{app.program}</td>
                <td className="border p-2">{app.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
