import { useState, useEffect } from 'react';
import { FiSave, FiUpload, FiTrash2, FiEye, FiEyeOff, FiDownload, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { getTotalDownloads, getDownloadHistory } from '../utils/analytics';

function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [config, setConfig] = useState(null);
  const [totalDownloads, setTotalDownloads] = useState(0);
  const [downloadHistory, setDownloadHistory] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [saveStatus, setSaveStatus] = useState(''); // 'saved', 'saving', 'error'
  const [hasChanges, setHasChanges] = useState(false);

  const ADMIN_PASSWORD = 'admin123';

  useEffect(() => {
    const isAuth = sessionStorage.getItem('adminAuth') === 'true';
    setAuthenticated(isAuth);

    if (isAuth) {
      loadData();
    }
  }, []);

  const loadData = async () => {
    try {
      // Check if edited config exists in localStorage
      const savedConfig = localStorage.getItem('appConfig');
      
      if (savedConfig) {
        // Use edited version
        setConfig(JSON.parse(savedConfig));
      } else {
        // Load from public folder
        const response = await fetch('/config.json');
        const data = await response.json();
        setConfig(data);
        // Save initial version to localStorage
        localStorage.setItem('appConfig', JSON.stringify(data));
      }
      
      setTotalDownloads(getTotalDownloads());
      setDownloadHistory(getDownloadHistory());
    } catch (error) {
      console.error('Failed to load config:', error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      loadData();
    } else {
      alert('Invalid password!');
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
    setPassword('');
  };

  const handleConfigChange = (field, value) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleScreenshotChange = (index, value) => {
    const newScreenshots = [...config.screenshots];
    newScreenshots[index] = value;
    setConfig(prev => ({
      ...prev,
      screenshots: newScreenshots
    }));
    setHasChanges(true);
  };

  const handleCaptionChange = (index, value) => {
    const newCaptions = [...config.screenshotCaptions];
    newCaptions[index] = value;
    setConfig(prev => ({
      ...prev,
      screenshotCaptions: newCaptions
    }));
    setHasChanges(true);
  };

  const addScreenshot = () => {
    setConfig(prev => ({
      ...prev,
      screenshots: [...prev.screenshots, ''],
      screenshotCaptions: [...prev.screenshotCaptions, 'New screenshot']
    }));
    setHasChanges(true);
  };

  const removeScreenshot = (index) => {
    if (confirm('Are you sure you want to remove this screenshot?')) {
      setConfig(prev => ({
        ...prev,
        screenshots: prev.screenshots.filter((_, i) => i !== index),
        screenshotCaptions: prev.screenshotCaptions.filter((_, i) => i !== index)
      }));
      setHasChanges(true);
    }
  };

  const handleSaveChanges = () => {
    try {
      setSaveStatus('saving');
      
      // Save to localStorage
      localStorage.setItem('appConfig', JSON.stringify(config));
      
      // Reload the page to apply changes
      setTimeout(() => {
        setSaveStatus('saved');
        setHasChanges(false);
        
        // Show success message
        setTimeout(() => {
          setSaveStatus('');
          alert('✅ Changes saved successfully! Refresh your main page to see updates.');
        }, 500);
      }, 500);
    } catch (error) {
      console.error('Save failed:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handleDownloadConfig = () => {
    const jsonString = JSON.stringify(config, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetDownloadCount = () => {
    if (confirm('Are you sure you want to reset download count?')) {
      localStorage.setItem('totalDownloads', '0');
      localStorage.setItem('downloadHistory', '[]');
      setTotalDownloads(0);
      setDownloadHistory([]);
    }
  };

  const resetToDefault = () => {
    if (confirm('This will reset all changes to default config. Are you sure?')) {
      localStorage.removeItem('appConfig');
      loadData();
      setHasChanges(false);
      alert('Reset to default config!');
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-slate-900 rounded-2xl p-8 max-w-md w-full border border-slate-800">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-800 text-white px-4 py-3 rounded-lg border border-slate-700 focus:border-teal-500 focus:outline-none"
                  placeholder="Enter admin password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-500 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with sticky save bar */}
        <div className="sticky top-0 bg-slate-950 z-50 pb-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-gray-400 mt-1">Manage your app configuration</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Save Changes Bar */}
          {hasChanges && (
            <div className="bg-amber-900/30 border border-amber-500/30 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiAlertCircle className="text-amber-500" />
                <span className="text-amber-200">You have unsaved changes</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={resetToDefault}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-sm"
                >
                  Reset
                </button>
                <button
                  onClick={handleSaveChanges}
                  disabled={saveStatus === 'saving'}
                  className="flex items-center gap-2 bg-teal-600 hover:bg-teal-500 disabled:bg-teal-700 px-6 py-2 rounded-lg transition-colors font-semibold"
                >
                  {saveStatus === 'saving' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : saveStatus === 'saved' ? (
                    <>
                      <FiCheck />
                      Saved!
                    </>
                  ) : (
                    <>
                      <FiSave />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400">Total Downloads</h3>
              <FiDownload className="text-teal-500" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">{totalDownloads.toLocaleString()}</div>
            <button
              onClick={resetDownloadCount}
              className="text-xs text-red-400 hover:text-red-300"
            >
              Reset count
            </button>
          </div>

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
            <h3 className="text-gray-400 mb-2">Recent Downloads</h3>
            <div className="text-3xl font-bold text-white">{downloadHistory.length}</div>
            <p className="text-xs text-gray-500">Last 100 downloads tracked</p>
          </div>

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
            <h3 className="text-gray-400 mb-2">App Version</h3>
            <div className="text-3xl font-bold text-white">v{config.version}</div>
            <button
              onClick={handleDownloadConfig}
              className="text-xs text-teal-400 hover:text-teal-300 mt-2"
            >
              Download config.json
            </button>
          </div>
        </div>

        {/* Config Editor */}
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 mb-6">
          <h2 className="text-xl font-bold mb-6">App Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">App Name</label>
              <input
                type="text"
                value={config.appName}
                onChange={(e) => handleConfigChange('appName', e.target.value)}
                className="w-full bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-700 focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Developer</label>
              <input
                type="text"
                value={config.developer}
                onChange={(e) => handleConfigChange('developer', e.target.value)}
                className="w-full bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-700 focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Version</label>
              <input
                type="text"
                value={config.version}
                onChange={(e) => handleConfigChange('version', e.target.value)}
                className="w-full bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-700 focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Size</label>
              <input
                type="text"
                value={config.size}
                onChange={(e) => handleConfigChange('size', e.target.value)}
                className="w-full bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-700 focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Rating</label>
              <input
                type="text"
                value={config.rating}
                onChange={(e) => handleConfigChange('rating', e.target.value)}
                className="w-full bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-700 focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Review Count</label>
              <input
                type="text"
                value={config.reviewCount}
                onChange={(e) => handleConfigChange('reviewCount', e.target.value)}
                className="w-full bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-700 focus:border-teal-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Tagline</label>
            <input
              type="text"
              value={config.tagline}
              onChange={(e) => handleConfigChange('tagline', e.target.value)}
              className="w-full bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-700 focus:border-teal-500 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Logo URL</label>
            <input
              type="text"
              value={config.logoUrl}
              onChange={(e) => handleConfigChange('logoUrl', e.target.value)}
              className="w-full bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-700 focus:border-teal-500 focus:outline-none"
              placeholder="https://i.ibb.co/..."
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">APK Download URL</label>
            <input
              type="text"
              value={config.apkDownloadUrl}
              onChange={(e) => handleConfigChange('apkDownloadUrl', e.target.value)}
              className="w-full bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-700 focus:border-teal-500 focus:outline-none"
              placeholder="https://download..."
            />
          </div>
        </div>

        {/* Screenshots */}
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Screenshots</h2>
            <button
              onClick={addScreenshot}
              className="flex items-center gap-2 bg-teal-600 hover:bg-teal-500 px-4 py-2 rounded-lg text-sm transition-colors"
            >
              <FiUpload />
              Add Screenshot
            </button>
          </div>

          <div className="space-y-4">
            {config.screenshots.map((screenshot, index) => (
              <div key={index} className="flex gap-4 items-start bg-slate-800 p-4 rounded-lg">
                <div className="flex-1">
                  <label className="block text-sm text-gray-400 mb-2">Screenshot URL {index + 1}</label>
                  <input
                    type="text"
                    value={screenshot}
                    onChange={(e) => handleScreenshotChange(index, e.target.value)}
                    className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-teal-500 focus:outline-none"
                    placeholder="https://i.ibb.co/..."
                  />
                  <label className="block text-sm text-gray-400 mb-2 mt-3">Caption</label>
                  <input
                    type="text"
                    value={config.screenshotCaptions[index]}
                    onChange={(e) => handleCaptionChange(index, e.target.value)}
                    className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:border-teal-500 focus:outline-none"
                  />
                </div>
                <button
                  onClick={() => removeScreenshot(index)}
                  className="mt-8 p-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
          <h3 className="text-lg font-bold text-blue-400 mb-2">📝 How to use:</h3>
          <ol className="text-sm text-gray-300 space-y-2 list-decimal list-inside">
            <li>Edit any field above</li>
            <li>Click "Save Changes" button (appears when you make changes)</li>
            <li>Changes will be saved to localStorage automatically</li>
            <li>Your main page will update instantly on refresh</li>
            <li>Optional: Download config.json to backup your settings</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
