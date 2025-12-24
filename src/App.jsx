import { useState, useEffect } from 'react';
import { FiDownload, FiCalendar, FiPackage, FiMessageCircle, FiCheck, FiClock, FiUsers, FiStar } from 'react-icons/fi';
import { FaTelegram } from 'react-icons/fa';
import SimpleDownload from './components/SimpleDownload';
import FakeComments from './components/FakeComments';
import ImageViewer from './components/ImageViewer';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [appData, setAppData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetch('/config.json')
      .then(res => res.json())
      .then(data => {
        setAppData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading config:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!appData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 flex items-center justify-center">
        <div className="text-red-400 text-xl">Failed to load app data</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all ${
        scrolled ? 'bg-slate-950/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={appData.logoUrl} 
              alt={appData.appName}
              className="w-10 h-10 rounded-xl"
            />
            <div>
              <h1 className="text-white font-bold text-lg">{appData.appName}</h1>
              <p className="text-gray-400 text-xs">{appData.developer}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <FiStar className="text-amber-500 fill-amber-500" />
            <span className="text-white font-bold">{appData.rating}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-12">
        <div className="relative">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="relative inline-block mb-6">
              <img 
                src={appData.logoUrl} 
                alt={appData.appName}
                className="w-32 h-32 rounded-3xl shadow-2xl shadow-teal-500/20"
              />
              <div className="absolute -bottom-2 -right-2 bg-teal-500 w-10 h-10 rounded-full flex items-center justify-center">
                <FiCheck className="text-white text-xl" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-3">{appData.appName}</h1>
            <p className="text-gray-300 text-lg mb-4">{appData.tagline}</p>
            
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="bg-slate-800 px-3 py-1 rounded-lg text-sm text-gray-300">
                {appData.developer}
              </span>
              <span className="bg-slate-800 px-3 py-1 rounded-lg text-sm text-gray-300">
                v{appData.version}
              </span>
              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-lg text-sm font-semibold">
                No ads
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-slate-900 rounded-xl p-4">
                <div className="text-3xl font-bold text-white mb-1">{appData.rating}</div>
                <div className="flex items-center justify-center gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="w-3 h-3 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <div className="text-xs text-gray-400">{appData.reviewCount} reviews</div>
              </div>
              
              <div className="bg-slate-900 rounded-xl p-4">
                <div className="text-3xl font-bold text-white mb-1">{appData.downloads}</div>
                <div className="text-sm text-gray-300 mb-1">downloads</div>
                <div className="text-xs text-gray-400"><FiUsers className="inline mr-1" />Users</div>
              </div>
              
              <div className="bg-slate-900 rounded-xl p-4">
                <div className="text-3xl font-bold text-white mb-1">{appData.size}</div>
                <div className="text-sm text-gray-300 mb-1">APK size</div>
                <div className="text-xs text-gray-400"><FiPackage className="inline mr-1" />File</div>
              </div>
            </div>

            {/* Download Button */}
            <SimpleDownload apkUrl={appData.apkDownloadUrl} />
          </div>

          {/* App Information */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">App information</h2>
            <div className="bg-slate-900 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <FiPackage className="text-gray-400" />
                  <span className="text-gray-300">Version</span>
                </div>
                <span className="text-white font-semibold">{appData.version}</span>
              </div>
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <FiPackage className="text-gray-400" />
                  <span className="text-gray-300">Size</span>
                </div>
                <span className="text-white font-semibold">{appData.size}</span>
              </div>
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <FiClock className="text-gray-400" />
                  <span className="text-gray-300">Updated</span>
                </div>
                <span className="text-white font-semibold">{appData.lastUpdate}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FiCalendar className="text-gray-400" />
                  <span className="text-gray-300">Released</span>
                </div>
                <span className="text-white font-semibold">{appData.releaseDate}</span>
              </div>
            </div>
          </div>

          {/* Screenshots - Clickable */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Screenshots</h2>
            <div className="flex gap-6 overflow-x-auto pb-4">
              {appData.screenshots.map((screenshot, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 cursor-pointer" 
                  style={{
                    transform: `rotate(${index % 2 === 0 ? '-2deg' : '2deg'})`,
                    marginTop: index % 2 === 0 ? '0' : '20px'
                  }}
                  onClick={() => {
                    setViewerIndex(index);
                    setViewerOpen(true);
                  }}
                >
                  <div className="bg-slate-900 p-2 rounded-2xl hover:bg-slate-800 transition-colors">
                    <img 
                      src={screenshot} 
                      alt={appData.screenshotCaptions[index]}
                      className="w-44 h-[380px] object-cover rounded-xl"
                    />
                    <div className="text-xs text-gray-400 mt-2 px-2">
                      {appData.screenshotCaptions[index]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fake Comments */}
          <FakeComments />

          {/* Telegram Section */}
          <div className="mb-16">
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-8 text-center">
              <FaTelegram className="text-white text-5xl mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Join our Telegram</h3>
              <p className="text-blue-100 mb-6">Get daily updates</p>
              <p className="text-blue-50 mb-6 text-sm leading-relaxed">
                New episodes announced instantly. Join 15,000+ anime fans.
              </p>
              <a 
                href={appData.telegram.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                Join Channel
              </a>
            </div>
          </div>

          {/* Support Section */}
          <div className="mb-16">
            <div className="bg-slate-900 rounded-2xl p-8 text-center">
              <FiMessageCircle className="text-teal-500 text-5xl mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Need help?</h3>
              <p className="text-gray-400 mb-6">Contact developer</p>
              <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                Report issues or request anime. We reply within 24 hours.
              </p>
              <a 
                href={appData.telegram.supportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-teal-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-teal-500 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>

          {/* Footer */}
          <footer className="text-center py-8 border-t border-slate-800">
            <p className="text-gray-400 text-sm">Built by {appData.developer}</p>
            <p className="text-gray-600 text-xs mt-1">© 2025 • Made for anime fans in India</p>
          </footer>

        </div>
      </div>

      {/* Image Viewer Modal */}
      {viewerOpen && (
        <ImageViewer
          screenshots={appData.screenshots}
          captions={appData.screenshotCaptions}
          initialIndex={viewerIndex}
          onClose={() => setViewerOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
