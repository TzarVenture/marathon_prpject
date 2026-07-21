import React, { useState, useEffect } from "react";
import { getEvents, createEvent } from "../../../services/marathonApi";

const EventsTab = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: "", date: "", location: "", distance: "", price: "", description: "" });
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await getEvents();
      if (res.events) setEvents(res.events);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(form).forEach(key => formData.append(key, form[key]));
      if (coverImage) formData.append("coverImage", coverImage);

      await createEvent(formData);
      fetchEvents();
      setForm({ title: "", date: "", location: "", distance: "", price: "", description: "" });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Manage Events</h2>
      
      <form onSubmit={handleSubmit} className="mb-8 space-y-4 border-b pb-8">
        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="border p-2 rounded w-full" required />
          <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="border p-2 rounded w-full" required />
          <input type="text" placeholder="Location" value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="border p-2 rounded w-full" required />
          <input type="text" placeholder="Distance (e.g. 10km)" value={form.distance} onChange={e => setForm({...form, distance: e.target.value})} className="border p-2 rounded w-full" required />
          <input type="number" placeholder="Price (INR)" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="border p-2 rounded w-full" required />
          <input type="file" onChange={e => setCoverImage(e.target.files[0])} className="border p-2 rounded w-full" />
        </div>
        <textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="border p-2 rounded w-full" required />
        <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded">
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>

      <h3 className="text-lg font-semibold mb-4">Existing Events</h3>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100"><th className="p-2 border">Title</th><th className="p-2 border">Date</th><th className="p-2 border">Location</th><th className="p-2 border">Price</th></tr>
        </thead>
        <tbody>
          {events.map((evt, i) => (
            <tr key={i}>
              <td className="p-2 border">{evt.title}</td>
              <td className="p-2 border">{new Date(evt.date).toLocaleDateString()}</td>
              <td className="p-2 border">{evt.location}</td>
              <td className="p-2 border">₹{evt.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventsTab;
