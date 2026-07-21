import React, { useState, useEffect } from "react";
import { getEvents, registerEvent, createOrder, verifyPayment } from "../../../services/marathonApi";

const EventsRegisterTab = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [tshirtSize, setTshirtSize] = useState("M");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await getEvents();
      if (res.events) setEvents(res.events);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const regRes = await registerEvent({
        eventId: selectedEvent._id,
        tshirtSize,
        emergencyContact
      });
      if (regRes.message === "You are already registered for this event.") {
        setMessage("You are already registered for this event.");
        return;
      }

      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        setMessage("Failed to load payment gateway");
        return;
      }

      const orderRes = await createOrder({ eventId: selectedEvent._id, amount: selectedEvent.price });
      if (!orderRes.order) throw new Error("Order creation failed");

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY || "test_key",
        amount: orderRes.order.amount,
        currency: orderRes.order.currency,
        name: "Vadodara Marathon",
        description: selectedEvent.title,
        order_id: orderRes.order.id,
        handler: async function (response) {
          try {
            await verifyPayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              paymentId: orderRes.paymentId
            });
            setMessage("Registration and Payment Successful!");
            setSelectedEvent(null);
          } catch (err) {
            setMessage("Payment verification failed");
          }
        },
        prefill: {
          name: `${user.fname} ${user.lname}`,
          email: user.email,
          contact: user.phone_number
        },
        theme: { color: "#2563EB" }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (err) {
      setMessage("An error occurred during registration.");
      console.error(err);
    }
  };

  if (loading) return <div>Loading events...</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Upcoming Events</h2>
      {message && <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">{message}</div>}
      
      {!selectedEvent ? (
        <div className="grid md:grid-cols-2 gap-4">
          {events.map((evt) => (
            <div key={evt._id} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition">
              <h3 className="font-bold text-lg">{evt.title}</h3>
              <p className="text-gray-600">{new Date(evt.date).toLocaleDateString()} | {evt.location}</p>
              <p className="mt-2">{evt.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="font-bold text-green-600">₹{evt.price}</span>
                <button onClick={() => setSelectedEvent(evt)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button onClick={() => setSelectedEvent(null)} className="text-blue-600 hover:underline mb-4">&larr; Back to Events</button>
          <div className="border p-6 rounded-lg max-w-lg">
            <h3 className="font-bold text-xl mb-4">Registering for: {selectedEvent.title}</h3>
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-gray-700">T-Shirt Size</label>
                <select value={tshirtSize} onChange={e => setTshirtSize(e.target.value)} className="w-full border p-2 rounded">
                  <option value="S">Small</option>
                  <option value="M">Medium</option>
                  <option value="L">Large</option>
                  <option value="XL">Extra Large</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700">Emergency Contact Number</label>
                <input type="text" value={emergencyContact} onChange={e => setEmergencyContact(e.target.value)} required className="w-full border p-2 rounded" />
              </div>
              <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 font-bold">
                Pay ₹{selectedEvent.price} & Register
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsRegisterTab;
