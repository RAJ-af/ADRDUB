import { useState } from 'react';
import { FiDownload, FiCheck } from 'react-icons/fi';
import { trackDownload } from '../utils/analytics';

function SimpleDownload({ apkUrl }) {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    
    // Track download
    const newCount = trackDownload();
    console.log('Download tracked! Total:', newCount);
    
    // Start download
    window.location.href = apkUrl;
    
    // Update UI
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="w-full bg-teal-600 hover:bg-teal-500 disabled:bg-teal-700 text-white py-4 px-6 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-teal-500/20"
      >
        {downloading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Starting download...</span>
          </>
        ) : downloaded ? (
          <>
            <FiCheck className="text-xl" />
            <span>Downloaded!</span>
          </>
        ) : (
          <>
            <FiDownload className="text-xl" />
            <span>Download APK</span>
          </>
        )}
      </button>
      <p className="text-xs text-center text-gray-500">
        Direct download • No waiting • No ads
      </p>
    </div>
  );
}

export default SimpleDownload;
