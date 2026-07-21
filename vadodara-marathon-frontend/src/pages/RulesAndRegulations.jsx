import React, { useState, useEffect } from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer/Footer";
import apiClient from "../services/api";

const RulesAndRegulations = () => {
  const [tableData, setTableData] = useState([]);
  const [accordionData, setAccordionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get("/api/rules-and-regulations");
        if (res.data && res.data.data) {
          setTableData(res.data.data.tableData || []);
          setAccordionData(res.data.data.accordionData || []);
        }
      } catch (error) {
        console.error("Failed to load rules", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        {/* Banner Section */}
        <div className="bg-sky-50 py-12 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold text-[#542F78]">Rules & Regulations</h1>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-800"></div>
            </div>
          ) : (
            <>
              {/* Table Section */}
              {tableData.length > 0 && (
                <div className="overflow-x-auto shadow-md rounded-lg mb-16 border border-gray-200">
                  <table className="w-full text-sm text-left text-gray-700 border-collapse">
                    <thead className="bg-gray-100 text-gray-900 uppercase font-semibold">
                      <tr>
                        <th colSpan="6" className="text-center py-4 text-lg border-b bg-gray-50">
                          VADODARA INTERNATIONAL MARATHON 2026<br/>
                          <span className="text-sm font-normal normal-case">1st February 2026</span>
                        </th>
                      </tr>
                      <tr>
                        <th className="px-6 py-4 border-b border-r">Sr. No</th>
                        <th className="px-6 py-4 border-b border-r">Event</th>
                        <th className="px-6 py-4 border-b border-r">Categories</th>
                        <th className="px-6 py-4 border-b border-r">Participants</th>
                        <th className="px-6 py-4 border-b border-r">Age Group (Years)</th>
                        <th className="px-6 py-4 border-b">Cut off</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((row, index) => {
                        const rowSpan = row.subCategories && row.subCategories.length > 0 ? row.subCategories.length : 1;
                        return (
                          <React.Fragment key={index}>
                            {row.subCategories && row.subCategories.length > 0 ? (
                              row.subCategories.map((sub, subIndex) => (
                                <tr key={subIndex} className="bg-white border-b hover:bg-gray-50 transition">
                                  {subIndex === 0 && (
                                    <>
                                      <td className="px-6 py-4 border-r whitespace-nowrap align-middle" rowSpan={rowSpan}>{row.srNo}</td>
                                      <td className="px-6 py-4 border-r font-medium whitespace-pre-wrap align-middle" rowSpan={rowSpan}>{row.event}</td>
                                    </>
                                  )}
                                  <td className="px-6 py-4 border-r whitespace-pre-wrap">{sub.category}</td>
                                  <td className="px-6 py-4 border-r whitespace-pre-wrap">{sub.participants}</td>
                                  <td className="px-6 py-4 border-r whitespace-pre-wrap">{sub.ageGroup}</td>
                                  {subIndex === 0 && (
                                    <td className="px-6 py-4 whitespace-nowrap align-middle border-l" rowSpan={rowSpan}>{row.cutOff}</td>
                                  )}
                                </tr>
                              ))
                            ) : (
                                <tr className="bg-white border-b hover:bg-gray-50 transition">
                                  <td className="px-6 py-4 border-r whitespace-nowrap align-middle">{row.srNo}</td>
                                  <td className="px-6 py-4 border-r font-medium whitespace-pre-wrap align-middle">{row.event}</td>
                                  <td className="px-6 py-4 border-r whitespace-pre-wrap"></td>
                                  <td className="px-6 py-4 border-r whitespace-pre-wrap"></td>
                                  <td className="px-6 py-4 border-r whitespace-pre-wrap"></td>
                                  <td className="px-6 py-4 whitespace-nowrap align-middle">{row.cutOff}</td>
                                </tr>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Accordion Section */}
              {accordionData.length > 0 && (
                <div className="max-w-4xl mx-auto space-y-4">
                  <h2 className="text-2xl font-bold text-center text-[#542F78] mb-8">Important Guidelines</h2>
                  {accordionData.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                      <button
                        onClick={() => toggleAccordion(index)}
                        className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none"
                      >
                        <span className="font-semibold text-lg text-gray-800 text-left">{item.title}</span>
                        <svg
                          className={`w-6 h-6 transform transition-transform duration-200 ${
                            openIndex === index ? "rotate-180 text-purple-600" : "text-gray-500"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <div
                        className={`transition-all duration-300 ease-in-out ${
                          openIndex === index ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                        } overflow-hidden bg-white`}
                      >
                        <div className="p-6 text-gray-600 whitespace-pre-wrap leading-relaxed">
                          {item.content}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RulesAndRegulations;
