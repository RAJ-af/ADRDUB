import { useState, useEffect } from 'react';
import { FiDownload, FiCalendar, FiPackage, FiMessageCircle, FiCheck, FiClock, FiUsers, FiStar } from 'react-icons/fi';
import { FaTelegram } from 'react-icons/fa';
import SimpleDownload from './components/SimpleDownload';

function App() {
  // ===== STATE MANAGEMENT =====
  // scrolled: Track navbar background on scroll
  // appData: App configuration from API/cache
  // loading: Loading state for initial render
  const [scrolled, setScrolled] = useState(false);
  const [appData, setAppData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ===== CONFIG LOADING WITH REDIS SUPPORT =====
  // Priority: API (Redis) → localStorage → config.json
  // Auto-refreshes every 30 seconds for admin updates
  useEffect(() => {
    const loadConfig = async () => {
      try {
        // STEP 1: Try loading from Redis API
        // Cache-busting with timestamp to always get fresh data
        const res = await fetch(`/api/config?t=${Date.now()}`, {
          headers: { 'Cache-Control': 'no-cache' }
        });

        if (res.ok) {
          const data = await res.json();
          setAppData(data);
          setLoading(false);
          // Cache in localStorage for offline access
          localStorage.setItem('appConfig', JSON.stringify(data));
          console.log('✅ Config loaded from API (Redis)');
          return;
        }
      } catch (error) {
        console.warn('⚠️ API failed, trying fallback...', error);
      }

      // STEP 2: Try loading from localStorage (offline fallback)
      try {
        const cached = localStorage.getItem('appConfig');
        if (cached) {
          const data = JSON.parse(cached);
          setAppData(data);
          setLoading(false);
          console.log('✅ Config loaded from localStorage');
          return;
        }
      } catch (error) {
        console.warn('⚠️ localStorage failed', error);
      }

      // STEP 3: Final fallback - Load from local config.json
      fetch('/config.json')
        .then(res => res.json())
        .then(data => {
          setAppData(data);
          setLoading(false);
          console.log('✅ Config loaded from config.json');
        })
        .catch(err => {
          console.error('❌ All config sources failed:', err);
          setLoading(false);
        });
    };

    // Initial load
    loadConfig();

    // Auto-refresh every 30 seconds to sync admin changes
    const interval = setInterval(loadConfig, 30000);
    return () => clearInterval(interval);
  }, []);

  // ===== SCROLL HANDLER FOR NAVBAR =====
  // Shows navbar background when scrolled down
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ===== LOADING STATE =====
  if (loading || !appData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-teal-500 text-xl">Loading...</div>
      </div>
    );
  }

  // ===== FAKE REVIEWS DATA =====
  // Static reviews matching screenshots
  const fakeReviews = [
    {
      name: 'Rahul Sharma',
      initials: 'RS',
      color: '#0ea5e9',
      stars: 5,
      date: '2 days ago',
      text: 'Best app for Hindi dubbed anime! Quality bahut achha hai. Daily updates milte hai. Highly recommended! 🔥',
      likes: 234
    },
    {
      name: 'Priya Singh',
      initials: 'PS',
      color: '#ec4899',
      stars: 5,
      date: '5 days ago',
      text: 'Finally ek app jisme latest anime Hindi me milti hai! Download feature bhi bahut useful hai. Love it! ❤️',
      likes: 189
    },
    {
      name: 'Arjun Patel',
      initials: 'AP',
      color: '#10b981',
      stars: 4,
      date: '1 week ago',
      text: 'Great app! Dubbing quality top notch hai. Bas thoda aur anime add karo. Overall 10/10 👍',
      likes: 156
    },
    {
      name: 'Sneha Gupta',
      initials: 'SG',
      color: '#f97316',
      stars: 5,
      date: '1 week ago',
      text: 'Mujhe isko use karte hue 2 mahine ho gaye. Best app for anime lovers! No ads, smooth playback! 🎉',
      likes: 298
    },
    {
      name: 'Vikram Kumar',
      initials: 'VK',
      color: '#8b5cf6',
      stars: 5,
      date: '2 weeks ago',
      text: 'Bhai ekdum mast app hai! Naruto, One Piece sab Hindi me mil jaata hai. Download speed bhi fast hai! 🚀',
      likes: 421
    },
    {
      name: 'Anjali Verma',
      initials: 'AV',
      color: '#a855f7',
      stars: 4,
      date: '3 weeks ago',
      text: 'UI design bahut clean hai. Episodes easily mil jaate hai. Thoda improve kar sakte ho but overall amazing! ⭐',
      likes: 167
    }
  ];

  // ===== MAIN UI RENDER =====
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* ===== BACKGROUND GRADIENTS ===== */}
      <div className="fixed inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black"></div>
      <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>

      {/* ===== FIXED HEADER ===== */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'bg-slate-950/80 backdrop-blur-xl border-b border-slate-800' : ''}`}>
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo & App Name */}
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
            {/* Fallback icon if logo fails */}
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

          {/* Rating Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-lg">
            <div className="text-amber-500 text-sm">★</div>
            <div className="text-sm font-semibold">{appData.rating}</div>
          </div>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <div className="relative z-10 pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4">

          {/* ===== HERO SECTION - Asymmetric layout ===== */}
          <div className="mb-16">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Left - App Icon */}
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

              {/* Right - App Info */}
              <div className="flex-1">
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">{appData.appName}</h1>
                <p className="text-xl text-gray-400 mb-6">{appData.tagline}</p>

                {/* Tags - Developer, Version, No ads */}
                <div className="flex flex-wrap gap-2 mb-6 text-sm">
                  <span className="px-3 py-1 bg-slate-800 rounded-md text-gray-300">{appData.developer}</span>
                  <span className="px-3 py-1 bg-slate-800 rounded-md text-gray-400">v{appData.version}</span>
                  <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-md">No ads</span>
                </div>

                {/* Stats Grid - Rating, Downloads, Size */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-slate-900 rounded-xl p-4">
                    <div className="text-2xl font-bold text-white mb-1">{appData.rating}</div>
                    <div className="text-xs text-gray-400">{appData.reviewCount} reviews</div>
                  </div>
                  <div className="bg-slate-900 rounded-xl p-4">
                    <div className="text-2xl font-bold text-white mb-1">{appData.downloads}</div>
                    <div className="text-xs text-gray-400">downloads</div>
                  </div>
                  <div className="bg-slate-900 rounded-xl p-4">
                    <div className="text-2xl font-bold text-white mb-1">{appData.size}</div>
                    <div className="text-xs text-gray-400">APK size</div>
                  </div>
                </div>

                {/* Download Button Component */}
                <SimpleDownload apkUrl={appData.apkDownloadUrl} />
              </div>
            </div>
          </div>

          {/* ===== WHY ADR DUBBED SECTION ===== */}
          <div className="mb-16 bg-slate-900 rounded-2xl p-8 border-l-4 border-teal-500">
            <h2 className="text-2xl font-bold text-white mb-4">Why ADR Dubbed?</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We started ADR Dubbed because most anime never reaches Indian fans in Hindi. Big platforms either don't dub, or take months to release episodes.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We dub manually with real voice artists, episode by episode, and upload daily. No subscription. No delays. Just anime in Hindi.
            </p>
          </div>

          {/* ===== FEATURES - Asymmetric cards ===== */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">What you get</h2>

            {/* First row - Full width card */}
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

            {/* Second row - Two half width cards */}
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

            {/* Third row - Two half width cards */}
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

          {/* ===== SCREENSHOTS - Tilted cards ===== */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Screenshots</h2>
            <div className="flex gap-6 overflow-x-auto pb-4">
              {appData.screenshots.map((screenshot, index) => (
                <div key={index} className="flex-shrink-0" style={{
                  transform: `rotate(${index % 2 === 0 ? '-2deg' : '2deg'})`,
                  marginTop: index % 2 === 0 ? '0' : '20px'
                }}>
                  <div className="bg-slate-900 p-2 rounded-2xl">
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

          {/* ===== USER REVIEWS SECTION ===== */}
          {/* Fake reviews matching screenshots */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">User Reviews</h2>
              <div className="flex items-center gap-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <span className="text-white font-semibold">{appData.rating}/5</span>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {fakeReviews.map((review, index) => (
                <div key={index} className="bg-slate-900 rounded-xl p-5">
                  <div className="flex items-start gap-3 mb-3">
                    {/* User Avatar with initials */}
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0" 
                      style={{backgroundColor: review.color}}
                    >
                      {review.initials}
                    </div>
                    <div className="flex-1">
                      {/* Name and date */}
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-semibold text-white">{review.name}</div>
                        <div className="text-xs text-gray-500">{review.date}</div>
                      </div>
                      {/* Star rating */}
                      <div className="flex text-amber-500 text-sm mb-2">
                        {[...Array(review.stars)].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                        {[...Array(5 - review.stars)].map((_, i) => (
                          <span key={i} className="text-gray-600">★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Review text */}
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">{review.text}</p>

                  {/* Like count with thumbs up icon */}
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    <span>{review.likes}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ===== APP INFORMATION TABLE ===== */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">App information</h2>
            <div className="bg-slate-900 rounded-xl divide-y divide-slate-800">
              {/* Version */}
              <div className="flex justify-between items-center p-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <FiPackage />
                  <span>Version</span>
                </div>
                <span className="font-medium text-white">{appData.version}</span>
              </div>
              {/* Size */}
              <div className="flex justify-between items-center p-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <FiPackage />
                  <span>Size</span>
                </div>
                <span className="font-medium text-white">{appData.size}</span>
              </div>
              {/* Updated date */}
              <div className="flex justify-between items-center p-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <FiCalendar />
                  <span>Updated</span>
                </div>
                <span className="font-medium text-white">{appData.lastUpdate}</span>
              </div>
              {/* Release date */}
              <div className="flex justify-between items-center p-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <FiCalendar />
                  <span>Released</span>
                </div>
                <span className="font-medium text-white">{appData.releaseDate}</span>
              </div>
            </div>
          </div>

          {/* ===== TELEGRAM & SUPPORT CTA ===== */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {/* Telegram Channel Card */}
            <a 
              href={appData.telegram.channelUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block bg-blue-600 hover:bg-blue-700 rounded-xl p-6 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <FaTelegram className="text-3xl text-white" />
                <div>
                  <div className="font-bold text-white">Join our Telegram</div>
                  <div className="text-sm text-blue-100">Get daily updates</div>
                </div>
              </div>
              <p className="text-sm text-blue-50">
                New episodes announced instantly. Join 15,000+ anime fans.
              </p>
            </a>

            {/* Support Card */}
            <a 
              href={appData.telegram.supportUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl p-6 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <FiMessageCircle className="text-3xl text-teal-500" />
                <div>
                  <div className="font-bold text-white">Need help?</div>
                  <div className="text-sm text-gray-400">Contact developer</div>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Report issues or request anime. We reply within 24 hours.
              </p>
            </a>
          </div>

          {/* ===== FOOTER ===== */}
          <footer className="text-center py-8 border-t border-slate-800">
            <p className="text-gray-400 text-sm">Built by {appData.developer}</p>
            <p className="text-gray-600 text-xs mt-1">© 2025 • Made for anime fans in India</p>
          </footer>

        </div>
      </div>
    </div>
  );
}

export default App;
