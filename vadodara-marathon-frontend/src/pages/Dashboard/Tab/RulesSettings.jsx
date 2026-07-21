import React, { useState, useEffect } from "react";
import apiClient from "../../../services/api";
import { toast } from "react-toastify";
import { FaPlus, FaTrash } from "react-icons/fa";

const RulesSettings = () => {
  const [tableData, setTableData] = useState([]);
  const [accordionData, setAccordionData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRulesData();
  }, []);

  const fetchRulesData = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/api/rules-and-regulations");
      if (res.data && res.data.data) {
        setTableData(res.data.data.tableData || []);
        setAccordionData(res.data.data.accordionData || []);
      }
    } catch (error) {
      toast.error("Failed to fetch rules data");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await apiClient.put("/api/rules-and-regulations", {
        tableData,
        accordionData,
      });
      toast.success("Rules and Regulations updated successfully");
    } catch (error) {
      toast.error("Failed to update rules data");
    } finally {
      setLoading(false);
    }
  };

  // Event Handlers
  const addEvent = () => {
    setTableData([
      ...tableData,
      { srNo: "", event: "", cutOff: "", subCategories: [] },
    ]);
  };

  const updateEvent = (index, field, value) => {
    const newData = [...tableData];
    newData[index][field] = value;
    setTableData(newData);
  };

  const removeEvent = (index) => {
    const newData = tableData.filter((_, i) => i !== index);
    setTableData(newData);
  };

  // SubCategory Handlers
  const addSubCategory = (eventIndex) => {
    const newData = [...tableData];
    newData[eventIndex].subCategories.push({ category: "", participants: "", ageGroup: "" });
    setTableData(newData);
  };

  const updateSubCategory = (eventIndex, subIndex, field, value) => {
    const newData = [...tableData];
    newData[eventIndex].subCategories[subIndex][field] = value;
    setTableData(newData);
  };

  const removeSubCategory = (eventIndex, subIndex) => {
    const newData = [...tableData];
    newData[eventIndex].subCategories = newData[eventIndex].subCategories.filter((_, i) => i !== subIndex);
    setTableData(newData);
  };

  // Accordion Handlers
  const addAccordionItem = () => {
    setAccordionData([...accordionData, { title: "", content: "" }]);
  };

  const updateAccordionItem = (index, field, value) => {
    const newData = [...accordionData];
    newData[index][field] = value;
    setAccordionData(newData);
  };

  const removeAccordionItem = (index) => {
    const newData = accordionData.filter((_, i) => i !== index);
    setAccordionData(newData);
  };

  if (loading && tableData.length === 0) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      {/* Table Settings */}
      <div className="bg-white p-6 rounded-lg shadow border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Rules Table Data</h2>
          <button
            onClick={addEvent}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            <FaPlus /> Add Event
          </button>
        </div>
        
        <div className="space-y-6">
          {tableData.map((eventRow, eventIndex) => (
            <div key={eventIndex} className="border border-gray-300 rounded p-4 bg-gray-50 relative">
              <button
                onClick={() => removeEvent(eventIndex)}
                className="absolute top-4 right-4 text-red-600 hover:text-red-800"
                title="Remove Event"
              >
                <FaTrash />
              </button>
              <div className="grid grid-cols-3 gap-4 mb-4 pr-8">
                <div>
                  <label className="block text-xs font-bold mb-1">Sr No</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    value={eventRow.srNo}
                    onChange={(e) => updateEvent(eventIndex, "srNo", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Event Name</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    value={eventRow.event}
                    onChange={(e) => updateEvent(eventIndex, "event", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Cut Off Time</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    value={eventRow.cutOff}
                    onChange={(e) => updateEvent(eventIndex, "cutOff", e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-4 border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-gray-700">Sub-categories</h4>
                  <button
                    onClick={() => addSubCategory(eventIndex)}
                    className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 flex items-center gap-1"
                  >
                    <FaPlus size={10} /> Add Sub-category
                  </button>
                </div>
                {eventRow.subCategories && eventRow.subCategories.length > 0 ? (
                  <table className="w-full text-sm bg-white border">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2 text-left">Category</th>
                        <th className="border p-2 text-left">Participants</th>
                        <th className="border p-2 text-left">Age Group</th>
                        <th className="border p-2 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {eventRow.subCategories.map((sub, subIndex) => (
                        <tr key={subIndex}>
                          <td className="border p-2">
                            <input
                              type="text"
                              className="w-full border p-1 rounded"
                              value={sub.category}
                              onChange={(e) => updateSubCategory(eventIndex, subIndex, "category", e.target.value)}
                            />
                          </td>
                          <td className="border p-2">
                            <input
                              type="text"
                              className="w-full border p-1 rounded"
                              value={sub.participants}
                              onChange={(e) => updateSubCategory(eventIndex, subIndex, "participants", e.target.value)}
                            />
                          </td>
                          <td className="border p-2">
                            <input
                              type="text"
                              className="w-full border p-1 rounded"
                              value={sub.ageGroup}
                              onChange={(e) => updateSubCategory(eventIndex, subIndex, "ageGroup", e.target.value)}
                            />
                          </td>
                          <td className="border p-2 text-center">
                            <button
                              onClick={() => removeSubCategory(eventIndex, subIndex)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FaTrash size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-sm text-gray-500">No sub-categories added.</p>
                )}
              </div>
            </div>
          ))}
          {tableData.length === 0 && <p className="text-gray-500">No events added yet.</p>}
        </div>
      </div>

      {/* Accordion Settings */}
      <div className="bg-white p-6 rounded-lg shadow border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Accordion Data (Rules)</h2>
          <button
            onClick={addAccordionItem}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            <FaPlus /> Add Rule
          </button>
        </div>

        <div className="space-y-4">
          {accordionData.map((item, index) => (
            <div key={index} className="border rounded p-4 relative group">
              <button
                onClick={() => removeAccordionItem(index)}
                className="absolute top-4 right-4 text-red-600 hover:text-red-800"
              >
                <FaTrash />
              </button>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={item.title}
                  onChange={(e) => updateAccordionItem(index, "title", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Content</label>
                <textarea
                  className="w-full border p-2 rounded h-24"
                  value={item.content}
                  onChange={(e) => updateAccordionItem(index, "content", e.target.value)}
                />
              </div>
            </div>
          ))}
          {accordionData.length === 0 && <p className="text-gray-500">No rules added yet.</p>}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-6 py-2 bg-green-600 text-white font-bold rounded hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default RulesSettings;
