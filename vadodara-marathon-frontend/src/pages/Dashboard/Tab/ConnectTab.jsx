import React, { useState, useEffect } from "react";
import { getBrandParticipants } from "../../../services/marathonApi"; // Reuse this api as it fetches users/influencers
import { FaUserCircle } from "react-icons/fa";

const ConnectTab = () => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const res = await getBrandParticipants();
        if (res.data) setParticipants(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchParticipants();
  }, []);

  if (loading) return <div>Loading participants...</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Connect with Participants</h2>
      
      <div className="grid md:grid-cols-3 gap-4">
        {participants.map((p, i) => (
          <div key={i} className="border p-4 rounded-lg flex items-center gap-4 hover:shadow-md transition">
            <FaUserCircle className="w-12 h-12 text-gray-400" />
            <div>
              <h3 className="font-bold">{p.fname} {p.lname}</h3>
              <p className="text-sm text-gray-600">{p.location?.city || "Unknown City"}</p>
            </div>
          </div>
        ))}
        {participants.length === 0 && <p className="text-gray-500">No participants found.</p>}
      </div>
    </div>
  );
};

export default ConnectTab;
