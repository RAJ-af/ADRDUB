import { useState, useEffect } from 'react';
import { FiSave, FiRefreshCw, FiDownload } from 'react-icons/fi';

function AdminDownloads() {
  const [downloads, setDownloads] = useState(0);
  const [customCount, setCustomCount] = useState('');
  const [lastSaved, setLastSaved] = useState(null);

  useEffect(() => {
    loadDownloads();
  }, []);

  const loadDownloads = () => {
    const saved = localStorage.getItem('adr_downloads');
    if (saved) {
      const data = JSON.parse(saved);
      setDownloads(data.totalDownloads);
      setLastSaved(data.lastUpdated);
    }
  };

  const incrementDownload = (amount = 1) => {
    const newCount = downloads + amount;
    saveCount(newCount);
  };

  const setCustomDownloads = () => {
    const count = parseInt(customCount);
    if (!isNaN(count) && count >= 0) {
      saveCount(count);
      setCustomCount('');
    }
  };

  const saveCount = (count) => {
    const data = {
      totalDownloads: count,
      lastUpdated: new Date().toISOString()
    };
    setDownloads(count);
    setLastSaved(data.lastUpdated);
    localStorage.setItem('adr_downloads', JSON.stringify(data));
  };

  const exportData = () => {
    const data = {
      totalDownloads: downloads,
      lastUpdated: lastSaved
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'downloads.json';
    a.click();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        
        <div className="bg-slate-900 rounded-xl p-6">
          <h1 className="text-2xl font-bold mb-2">Download Manager</h1>
          <p className="text-gray-400 text-sm">ADR DUBBED - Admin Panel</p>
        </div>

        {/* Current Stats */}
        <div className="bg-gradient-to-br from-teal-900/30 to-cyan-900/30 rounded-xl p-6 border border-teal-500/20">
          <div className="text-sm text-gray-400 mb-2">Total Downloads</div>
          <div className="text-5xl font-bold text-white mb-4">{downloads.toLocaleString()}</div>
          {lastSaved && (
            <div className="text-xs text-gray-500">
              Last updated: {new Date(lastSaved).toLocaleString()}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => incrementDownload(1)}
              className="px-4 py-3 bg-teal-600 hover:bg-teal-700 rounded-lg font-semibold transition-colors"
            >
              +1 Download
            </button>
            <button
              onClick={() => incrementDownload(10)}
              className="px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
            >
              +10 Downloads
            </button>
            <button
              onClick={() => incrementDownload(100)}
              className="px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors"
            >
              +100 Downloads
            </button>
            <button
              onClick={() => incrementDownload(1000)}
              className="px-4 py-3 bg-amber-600 hover:bg-amber-700 rounded-lg font-semibold transition-colors"
            >
              +1000 Downloads
            </button>
          </div>
        </div>

        {/* Custom Count */}
        <div className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Set Custom Count</h2>
          <div className="flex gap-3">
            <input
              type="number"
              value={customCount}
              onChange={(e) => setCustomCount(e.target.value)}
              placeholder="Enter count..."
              className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:border-teal-500 focus:outline-none"
            />
            <button
              onClick={setCustomDownloads}
              className="px-6 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <FiSave />
              Set
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={loadDownloads}
            className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <FiRefreshCw />
            Reload
          </button>
          <button
            onClick={exportData}
            className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <FiDownload />
            Export JSON
          </button>
        </div>

        <div className="text-center text-sm text-gray-500 pt-4">
          Access: localhost:5173/admin
        </div>
      </div>
    </div>
  );
}

export default AdminDownloads;
