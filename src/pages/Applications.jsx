import { useEffect, useState } from "react";
import api from "../api/api";

export default function Applications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const res = await api.get("applications");
        setApps(res.data);
      } catch (err) {
        console.error(err);
        alert("فشل تحميل الطلبات");
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, []);

  if (loading) {
    return <div className="p-6">جاري تحميل الطلبات...</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">طلباتي</h1>

      {apps.length === 0 ? (
        <div className="bg-white p-4 rounded shadow">
          لا يوجد طلبات حتى الآن.
        </div>
      ) : (
        apps.map((app) => (
          <div
            key={app._id}
            className="bg-white p-4 rounded shadow border space-y-2"
          >
            <p><b>الجامعة:</b> {app.university}</p>
            <p><b>التخصص:</b> {app.major}</p>
            <p><b>الحالة:</b> {app.status}</p>
          </div>
        ))
      )}
    </div>
  );
}
