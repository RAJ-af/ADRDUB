import { FiThumbsUp, FiStar } from 'react-icons/fi';

function FakeComments() {
  const reviews = [
    {
      name: 'Rahul Sharma',
      avatar: 'https://ui-avatars.com/api/?name=RS&background=0ea5e9&color=fff&size=120&bold=true',
      rating: 5,
      time: '2 days ago',
      comment: 'Best app for Hindi dubbed anime! Quality bahut achha hai. Daily updates milte hai. Highly recommended! 🔥',
      likes: 234
    },
    {
      name: 'Priya Singh',
      avatar: 'https://ui-avatars.com/api/?name=PS&background=ec4899&color=fff&size=120&bold=true',
      rating: 5,
      time: '5 days ago',
      comment: 'Finally ek app jisme latest anime Hindi me milti hai! Download feature bhi bahut useful hai. Love it! ❤️',
      likes: 189
    },
    {
      name: 'Arjun Patel',
      avatar: 'https://ui-avatars.com/api/?name=AP&background=10b981&color=fff&size=120&bold=true',
      rating: 4,
      time: '1 week ago',
      comment: 'Great app! Dubbing quality top notch hai. Bas thoda aur anime add karo. Overall 10/10 👍',
      likes: 156
    },
    {
      name: 'Sneha Gupta',
      avatar: 'https://ui-avatars.com/api/?name=SG&background=f97316&color=fff&size=120&bold=true',
      rating: 5,
      time: '1 week ago',
      comment: 'Mujhe isko use karte hue 2 mahine ho gaye. Best app for anime lovers! No ads, smooth playback! 🎉',
      likes: 298
    },
    {
      name: 'Vikram Kumar',
      avatar: 'https://ui-avatars.com/api/?name=VK&background=6366f1&color=fff&size=120&bold=true',
      rating: 5,
      time: '2 weeks ago',
      comment: 'Bhai ekdum mast app hai! Naruto, One Piece sab Hindi me mil jaata hai. Download speed bhi fast hai! 🚀',
      likes: 421
    },
    {
      name: 'Anjali Verma',
      avatar: 'https://ui-avatars.com/api/?name=AV&background=8b5cf6&color=fff&size=120&bold=true',
      rating: 4,
      time: '3 weeks ago',
      comment: 'UI design bahut clean hai. Episodes easily mil jaate hai. Thoda improve kar sakte ho but overall amazing! ⭐',
      likes: 167
    }
  ];

  return (
    <div className="px-4 py-6 mb-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">User Reviews</h2>
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <FiStar key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-white font-medium text-sm">4.8/5</span>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/30">
            <div className="flex items-start gap-3">
              <img 
                src={review.avatar} 
                alt={review.name}
                className="w-12 h-12 rounded-full flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white text-sm mb-1">{review.name}</h3>
                
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <FiStar 
                        key={i} 
                        className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">{review.time}</span>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  {review.comment}
                </p>

                <button className="flex items-center gap-1.5 text-gray-400 hover:text-blue-400 transition-colors">
                  <FiThumbsUp className="w-3.5 h-3.5" />
                  <span className="text-xs">{review.likes}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FakeComments;
