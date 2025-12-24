import { useState, useEffect } from 'react';
import { FiDownload, FiCalendar, FiPackage, FiMessageCircle, FiCheck, FiClock, FiUsers, FiStar } from 'react-icons/fi';
import { FaTelegram } from 'react-icons/fa';
import SimpleDownload from './components/SimpleDownload';
import FakeComments from './components/FakeComments';
import ImageViewer from './components/ImageViewer';
import { getTotalDownloads } from './utils/analytics';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [appData, setAppData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  useEffect(() => {
  // Check localStorage first
  const savedConfig = localStorage.getItem('appConfig');
  
  if (savedConfig) {
    // Use edited config from admin dashboard
    try {
      setAppData(JSON.parse(savedConfig));
      setLoading(false);
    } catch (error) {
      console.error('Failed to parse saved config:', error);
      loadDefaultConfig();
    }
  } else {
    loadDefaultConfig();
  }
}, []);

const loadDefaultConfig = () => {
  fetch('/config.json')
    .then(res => res.json())
    .then(data => {
      setAppData(data);
      setLoading(false);
    })
    .catch(err => {
      console.error('Config load failed:', err);
      setLoading(false);
    });
};

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading || !appData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-teal-500 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Simple gradient background */}
      <div className="fixed inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black"></div>
      
      {/* Subtle accent */}
      <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'bg-slate-950/80 backdrop-blur-xl border-b border-slate-800' : ''}`}>
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={appData.logoUrl} 
              alt="Logo"
              className="w-11 h-11 rounded-xl object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="w-11 h-11 bg-teal-600 rounded-xl flex items-center justify-center" style={{display: 'none'}}>
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-white">{appData.appName}</div>
              <div className="text-xs text-teal-500">{appData.developer}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-lg">
            <div className="text-amber-500 text-sm">★</div>
            <div className="text-sm font-semibold">{appData.rating}</div>
          </div>
        </div>
      </header>

      <div className="relative z-10 pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4">
          
          {/* Hero - Asymmetric layout */}
          <div className="mb-16">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Left - Icon */}
              <div>
                <img 
                  src={appData.logoUrl}
                  alt={appData.appName}
                  className="w-28 h-28 rounded-3xl object-cover shadow-xl"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-28 h-28 bg-teal-600 rounded-3xl flex items-center justify-center shadow-xl" style={{display: 'none'}}>
                  <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              
              {/* Right - Info */}
              <div className="flex-1">
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">{appData.appName}</h1>
                <p className="text-xl text-gray-400 mb-6">{appData.tagline}</p>
                
                <div className="flex flex-wrap gap-2 mb-6 text-sm">
                  <span className="px-3 py-1 bg-slate-800 rounded-md text-gray-300">{appData.developer}</span>
                  <span className="px-3 py-1 bg-slate-800 rounded-md text-gray-400">v{appData.version}</span>
                  <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-md">No ads</span>
                </div>

                {/* Stats - Asymmetric grid WITH REAL DOWNLOAD COUNT */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-slate-900 rounded-xl p-4">
                    <div className="text-2xl font-bold text-white mb-1">{appData.rating}</div>
                    <div className="text-xs text-gray-400">{appData.reviewCount} reviews</div>
                  </div>
                  <div className="bg-slate-900 rounded-xl p-4">
                    <div className="text-2xl font-bold text-white mb-1">{getTotalDownloads().toLocaleString()}</div>
                    <div className="text-xs text-gray-400">downloads</div>
                  </div>
                  <div className="bg-slate-900 rounded-xl p-4">
                    <div className="text-2xl font-bold text-white mb-1">{appData.size}</div>
                    <div className="text-xs text-gray-400">APK size</div>
                  </div>
                </div>

                {/* Simple Download Component */}
                <SimpleDownload apkUrl={appData.apkDownloadUrl} />
              </div>
            </div>
          </div>

          {/* WHY section - Human story */}
          <div className="mb-16 bg-slate-900 rounded-2xl p-8 border-l-4 border-teal-500">
            <h2 className="text-2xl font-bold text-white mb-4">Why ADR Dubbed?</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We started ADR Dubbed because most anime never reaches Indian fans in Hindi. Big platforms either don't dub, or take months to release episodes.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We dub manually with real voice artists, episode by episode, and upload daily. No subscription. No delays. Just anime in Hindi.
            </p>
          </div>

          {/* What you get - Asymmetric cards */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">What you get</h2>
            
            {/* First row - one full width */}
            <div className="mb-4">
              <div className="bg-slate-900 rounded-xl p-6 hover:bg-slate-800 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-teal-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiClock className="text-teal-500 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">Daily episode updates</h3>
                    <p className="text-sm text-gray-400">New episodes every day. We don't wait for seasons to finish.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Second row - two half width */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-900 rounded-xl p-6 hover:bg-slate-800 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiCheck className="text-blue-500 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">Hindi dubbing by ADR Team</h3>
                    <p className="text-sm text-gray-400">Real dubbing with AI-assisted production.</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 rounded-xl p-6 hover:bg-slate-800 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiUsers className="text-purple-500 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">Anime not officially in Hindi</h3>
                    <p className="text-sm text-gray-400">We dub shows that aren't available in Hindi anywhere else.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Third row - two half width */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-900 rounded-xl p-6 hover:bg-slate-800 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiDownload className="text-green-500 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">Offline downloads</h3>
                    <p className="text-sm text-gray-400">Save episodes. Watch offline.</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 rounded-xl p-6 hover:bg-slate-800 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiStar className="text-amber-500 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">Affordable premium plan</h3>
                    <p className="text-sm text-gray-400">Low-cost premium. Free version also available.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Screenshots - Tilted, uneven spacing + CLICKABLE */}
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

          {/* FAKE COMMENTS */}
          <FakeComments />

          {/* App info - Simple table */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">App information</h2>
            <div className="bg-slate-900 rounded-xl divide-y divide-slate-800">
              <div className="flex justify-between items-center p-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <FiPackage />
                  <span>Version</span>
                </div>
                <span className="font-medium text-white">{appData.version}</span>
              </div>
              <div className="flex justify-between items-center p-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <FiPackage />
                  <span>Size</span>
                </div>
                <span className="font-medium text-white">{appData.size}</span>
              </div>
              <div className="flex justify-between items-center p-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <FiCalendar />
                  <span>Updated</span>
                </div>
                <span className="font-medium text-white">{appData.lastUpdate}</span>
              </div>
              <div className="flex justify-between items-center p-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <FiCalendar />
                  <span>Released</span>
                </div>
                <span className="font-medium text-white">{appData.releaseDate}</span>
              </div>
            </div>
          </div>

          {/* Telegram - Different style */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <a href={appData.telegram.channelUrl} target="_blank" rel="noopener noreferrer" className="block bg-blue-600 hover:bg-blue-700 rounded-xl p-6 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <FaTelegram className="text-3xl text-white" />
                <div>
                  <div className="font-bold text-white">Join our Telegram</div>
                  <div className="text-sm text-blue-100">Get daily updates</div>
                </div>
              </div>
              <p className="text-sm text-blue-50">New episodes announced instantly. Join 15,000+ anime fans.</p>
            </a>

            <a href={appData.telegram.supportUrl} target="_blank" rel="noopener noreferrer" className="block bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl p-6 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <FiMessageCircle className="text-3xl text-teal-500" />
                <div>
                  <div className="font-bold text-white">Need help?</div>
                  <div className="text-sm text-gray-400">Contact developer</div>
                </div>
              </div>
              <p className="text-sm text-gray-400">Report issues or request anime. We reply within 24 hours.</p>
            </a>
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
