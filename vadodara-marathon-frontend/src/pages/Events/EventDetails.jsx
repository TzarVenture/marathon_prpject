import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer/Footer";
import { getEventById } from "../../services/marathonApi";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id);
        if (data.event) {
          setEvent(data.event);
        }
      } catch (err) {
        console.error("Error fetching event details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (!event) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <h2 className="text-2xl font-bold text-gray-700">Event not found</h2>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          
          {/* Cover Image Placeholder or Real Image */}
          <div className="h-64 bg-blue-600 relative flex items-center justify-center">
            {event.coverImage ? (
              <img src={event.coverImage} alt={event.title} className="w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-90"></div>
            )}
            <h1 className="relative z-10 text-white text-3xl md:text-5xl font-extrabold px-4 text-center tracking-wide shadow-black drop-shadow-md">
              {event.title}
            </h1>
          </div>

          {/* Event Content */}
          <div className="p-8 md:p-12 space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Event Details</h2>
              <h3 className="text-xl font-semibold text-blue-600">🏃‍♂️ {event.title} 🏃‍♀️</h3>
              <p className="text-gray-600 font-medium italic mt-2">✨ An Accurately Measured & MSDAA Certified Course ✨</p>
              <p className="text-gray-700 mt-4">📜 Official Qualifier for all major Half Marathons across Pan India 🇮🇳</p>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <p className="text-lg font-bold text-gray-800 flex items-center gap-2">
                📅 <span className="text-blue-700">Date:</span> {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-lg font-bold text-gray-800 mt-2 flex items-center gap-2">
                📍 <span className="text-blue-700">Location:</span> {event.location}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Categories */}
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  🏁 Race Categories & Fees:
                </h4>
                <ul className="space-y-3 font-medium text-gray-700">
                  {event.distance?.split(',').map((dist, idx) => (
                    <li key={idx} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
                      🔥 {dist.trim()} Competitive – ₹{event.price}
                    </li>
                  ))}
                  {/* Fallback if no specific distance was provided */}
                  {!event.distance && (
                     <li className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
                      🔥 General Category – ₹{event.price}
                    </li>
                  )}
                </ul>
              </div>

              {/* Giveaways */}
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  🎽 Participants Giveaways:
                </h4>
                <ul className="space-y-2 text-gray-700 font-medium">
                  <li className="flex items-center gap-2">1️⃣ Official Race Day Jersey 👕</li>
                  <li className="flex items-center gap-2">2️⃣ Coloured Finisher Medal 🏅</li>
                  <li className="flex items-center gap-2">3️⃣ Healthy Breakfast 🍎</li>
                  <li className="flex items-center gap-2">4️⃣ Digital Certificate 📄</li>
                  <li className="flex items-center gap-2">5️⃣ Zumba Session 💃</li>
                  <li className="flex items-center gap-2">6️⃣ Post-Workout Cool Down 🧘‍♀️</li>
                </ul>
              </div>
            </div>

            <div className="text-center pt-6 border-t border-gray-200">
              <p className="text-xl font-bold text-gray-800 mb-2">💪 Run Strong. Run Certified. Run for Glory!</p>
              <p className="text-blue-600 font-semibold mb-8">#CityRun2026 #CertifiedRun #MSDAA #RunForHealth</p>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Ready to Join?</h3>
                <p className="text-gray-600 mb-6">Don't miss out on this amazing event!</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link 
                    to="/register" 
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-transform transform hover:scale-105 shadow-md"
                  >
                    Register Now
                  </Link>
                  <a 
                    href="https://chat.whatsapp.com/example" 
                    target="_blank" 
                    rel="noreferrer"
                    className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-transform transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
                  >
                    Join Community Group
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EventDetails;
