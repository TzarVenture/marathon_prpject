import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer/Footer";
import { getEvents } from "../../services/marathonApi";
import { FaCalendarAlt, FaMapMarkerAlt, FaFilter, FaWhatsapp, FaArrowRight } from "react-icons/fa";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCity, setFilterCity] = useState("All Cities");
  const [filterCategory, setFilterCategory] = useState([]);

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const data = await getEvents();
        setEvents(data.events || data.data || []);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEventsData();
  }, []);

  const cities = ["All Cities", "Mumbai", "Delhi, NCR", "Chandigarh", "Vadodara"];
  const categories = ["Full Marathon", "Half Marathon", "10 Kilometers", "5 Kilometers", "50 Kilometers"];

  const handleCategoryChange = (cat) => {
    setFilterCategory(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const filteredEvents = events.filter((event) => {
    const matchCity = filterCity === "All Cities" || event.location.includes(filterCity);
    const matchCat = filterCategory.length === 0 || filterCategory.some(cat => event.distance && event.distance.includes(cat));
    return matchCity && matchCat;
  });

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Filter */}
          <div className="w-full md:w-1/4 bg-white rounded-xl shadow-sm p-6 h-fit border border-gray-100">
            <div className="flex items-center gap-2 mb-6 text-gray-800 font-bold text-lg">
              <div className="bg-blue-500 text-white p-2 rounded"><FaFilter size={14}/></div>
              Find Your Perfect Race
            </div>

            <div className="mb-8">
              <h3 className="flex items-center gap-2 font-semibold text-gray-700 mb-4">
                <FaMapMarkerAlt className="text-gray-400" /> Location
              </h3>
              <div className="space-y-3 pl-1 h-48 overflow-y-auto custom-scrollbar">
                {cities.map((city) => (
                  <label key={city} className={`flex items-center gap-3 cursor-pointer ${filterCity === city ? "bg-blue-50 py-2 px-3 rounded-md text-blue-700" : "px-3 text-gray-600"}`}>
                    <input
                      type="radio"
                      name="city"
                      className="form-radio text-blue-500 w-4 h-4"
                      checked={filterCity === city}
                      onChange={() => setFilterCity(city)}
                    />
                    <span className="text-sm font-medium">{city}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="flex items-center gap-2 font-semibold text-gray-700 mb-4">
                <div className="border border-gray-400 p-1 rounded-sm"><span className="block w-2 h-2 bg-gray-400"></span></div> Race Categories
              </h3>
              <div className="space-y-3 pl-1">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer px-3 text-gray-600">
                    <input
                      type="checkbox"
                      className="form-checkbox text-purple-500 w-4 h-4 rounded"
                      checked={filterCategory.includes(cat)}
                      onChange={() => handleCategoryChange(cat)}
                    />
                    <span className="text-sm font-medium">{cat}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Events List */}
          <div className="w-full md:w-3/4">
            <div className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4 mb-6 border border-gray-100">
              <div className="bg-blue-500 text-white p-3 rounded-lg">
                <FaCalendarAlt size={20} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Great! {filteredEvents.length} events found</h2>
                <p className="text-green-500 text-sm flex items-center gap-1">
                  <span className="w-4 h-4 rounded-full border border-green-500 flex items-center justify-center text-xs">✓</span>
                  Showing available events based on your criteria
                </p>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-10 text-center text-gray-500">
                No events found matching your filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredEvents.map((event) => (
                  <div key={event._id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex gap-2 flex-wrap">
                          {event.distance?.split(',').map(d => (
                            <span key={d} className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                              {d.trim().substring(0,3).toUpperCase()}
                            </span>
                          ))}
                        </div>
                        <span className="bg-orange-400 text-white text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                          ⚠️ Unverified
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-6">{event.title}</h3>
                      
                      <div className="bg-blue-50/50 rounded-lg p-3 flex items-center gap-3 mb-3">
                        <div className="bg-blue-500 text-white p-2 rounded-md"><FaCalendarAlt /></div>
                        <div>
                          <p className="text-xs text-blue-500 font-semibold uppercase">Event Date</p>
                          <p className="text-sm font-bold text-gray-700">
                            {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}, {new Date(event.date).toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'})}
                          </p>
                        </div>
                      </div>

                      <div className="bg-green-50/50 rounded-lg p-3 flex items-center gap-3 mb-6">
                        <div className="bg-green-500 text-white p-2 rounded-md"><FaMapMarkerAlt /></div>
                        <div>
                          <p className="text-xs text-green-600 font-semibold uppercase">Location</p>
                          <p className="text-sm font-bold text-gray-700">{event.location}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-auto">
                      <a 
                        href="https://chat.whatsapp.com/example" 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex-1 bg-green-400 hover:bg-green-500 text-white py-3 rounded-lg font-semibold flex justify-center items-center gap-2 transition"
                      >
                        Join Community <FaWhatsapp size={18} />
                      </a>
                      <Link 
                        to={`/events/${event._id}`}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex justify-center items-center gap-2 transition"
                      >
                        View Details <FaArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EventsPage;
