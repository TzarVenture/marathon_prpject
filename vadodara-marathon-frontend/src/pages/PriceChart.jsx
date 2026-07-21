import React, { useState, useEffect } from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer/Footer";
import apiClient from "../services/api";

const PriceChart = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get("/api/price-chart");
        if (res.data && res.data.data) {
          setTableData(res.data.data.tableData || []);
        }
      } catch (error) {
        console.error("Failed to load price chart", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        {/* Banner Section */}
        <div className="bg-purple-800 py-12 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold text-white">Price Chart</h1>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-800"></div>
            </div>
          ) : (
            <>
              {/* Table Section */}
              {tableData.length > 0 ? (
                <div className="overflow-x-auto shadow-md rounded-lg mb-16 border border-gray-200">
                  <table className="w-full text-sm text-left text-gray-700 border-collapse">
                    <thead className="bg-gray-100 text-gray-900 uppercase font-semibold">
                      <tr>
                        <th colSpan="8" className="text-center py-4 text-lg border-b bg-gray-50">
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
                        <th className="px-6 py-4 border-b border-r">Registration Amount<br/><span className="text-xs normal-case font-normal">(including GST and Convenience fees)</span></th>
                        <th className="px-6 py-4 border-b border-r">Early Bird Registration Amount<br/><span className="text-xs normal-case font-normal">(valid till 31st August)</span></th>
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
                                  <td className="px-6 py-4 border-r whitespace-nowrap font-medium text-gray-800">{sub.registrationAmount}</td>
                                  <td className="px-6 py-4 border-r whitespace-nowrap font-medium text-green-700">{sub.earlyBirdAmount}</td>
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
                                  <td className="px-6 py-4 border-r whitespace-nowrap"></td>
                                  <td className="px-6 py-4 border-r whitespace-nowrap"></td>
                                  <td className="px-6 py-4 whitespace-nowrap align-middle">{row.cutOff}</td>
                                </tr>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-20 text-gray-500 text-lg">No price chart data available at the moment.</div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PriceChart;
