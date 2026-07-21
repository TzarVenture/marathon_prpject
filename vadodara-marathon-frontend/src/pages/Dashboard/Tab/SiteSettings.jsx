import React, { useState, useEffect } from "react";
import { fetchSiteSettings, updateSiteSettings } from "../../../services/marathonApi";

const SiteSettingsTab = () => {
  const [settings, setSettings] = useState({ title: "", headerText: "" });
  const [logo, setLogo] = useState(null);
  const [favicon, setFavicon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchSiteSettings().then(res => {
      if (res.data) setSettings(res.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", settings.title);
      formData.append("headerText", settings.headerText);
      if (logo) formData.append("logo", logo);
      if (favicon) formData.append("favicon", favicon);

      await updateSiteSettings(formData);
      setStatus("Settings updated successfully!");
    } catch (err) {
      setStatus("Failed to update settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Site Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Site Title</label>
          <input type="text" value={settings.title} onChange={(e) => setSettings({...settings, title: e.target.value})} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Header Text</label>
          <input type="text" value={settings.headerText} onChange={(e) => setSettings({...settings, headerText: e.target.value})} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Logo</label>
          <input type="file" onChange={(e) => setLogo(e.target.files[0])} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Favicon</label>
          <input type="file" onChange={(e) => setFavicon(e.target.files[0])} className="w-full border p-2 rounded" />
        </div>
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? "Saving..." : "Save Settings"}
        </button>
      </form>
      {status && <p className="mt-4 text-green-600">{status}</p>}
    </div>
  );
};

export default SiteSettingsTab;
