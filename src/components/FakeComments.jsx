import { FiThumbsUp } from 'react-icons/fi';

function FakeComments() {
  const reviews = [
    {
      name: 'Rahul Sharma',
      avatar: 'https://i.pravatar.cc/150?img=12',
      rating: 5,
      verified: true,
      time: '2 days ago',
      comment: 'Best app for Hindi dubbed anime! Quality bahut achha hai. Daily updates milte hai. Highly recommended! 🔥',
      likes: 234
    },
    {
      name: 'Priya Singh',
      avatar: 'https://i.pravatar.cc/150?img=5',
      rating: 5,
      verified: true,
      time: '5 days ago',
      comment: 'Finally ek app jisme latest anime Hindi me milti hai! Download feature bhi bahut useful hai. Love it! ❤️',
      likes: 189
    },
    {
      name: 'Arjun Patel',
      avatar: 'https://i.pravatar.cc/150?img=33',
      rating: 4,
      verified: false,
      time: '1 week ago',
      comment: 'Great app! Dubbing quality top notch hai. Bas thoda aur anime add karo. Overall 10/10 👍',
      likes: 156
    },
    {
      name: 'Sneha Gupta',
      avatar: 'https://i.pravatar.cc/150?img=9',
      rating: 5,
      verified: true,
      time: '1 week ago',
      comment: 'Mujhe isko use karte hue 2 mahine ho gaye. Best app for anime lovers! No ads, smooth playback! 🎉',
      likes: 298
    },
    {
      name: 'Vikram Kumar',
      avatar: 'https://i.pravatar.cc/150?img=15',
      rating: 5,
      verified: true,
      time: '2 weeks ago',
      comment: 'Bhai ekdum mast app hai! Naruto, One Piece sab Hindi me mil jaata hai. Download speed bhi fast hai! 🚀',
      likes: 421
    },
    {
      name: 'Anjali Verma',
      avatar: 'https://i.pravatar.cc/150?img=20',
      rating: 4,
      verified: false,
      time: '3 weeks ago',
      comment: 'UI design bahut clean hai. Episodes easily mil jaate hai. Thoda improve kar sakte ho but overall amazing! ⭐',
      likes: 167
    }
  ];

  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Reviews</h2>
        <span className="text-gray-400 text-sm">{reviews.length} reviews</span>
      </div>

      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="bg-slate-900 rounded-xl p-5 hover:bg-slate-800 transition-colors border border-slate-800">
            {/* Header */}
            <div className="flex items-start gap-4 mb-3">
              <img 
                src={review.avatar} 
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${review.name.replace(' ', '+')}&background=0ea5e9&color=fff&size=128`;
                }}
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-white truncate">{review.name}</h3>
                  {review.verified && (
                    <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-md flex-shrink-0">
                      Verified
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${
                          i < review.rating ? 'text-amber-500' : 'text-gray-600'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-gray-500 text-xs">{review.time}</span>
                </div>
              </div>
            </div>

            {/* Comment */}
            <p className="text-gray-300 text-sm leading-relaxed mb-3 ml-16">
              {review.comment}
            </p>

            {/* Likes */}
            <div className="flex items-center gap-2 ml-16">
              <button className="flex items-center gap-1.5 text-gray-400 hover:text-teal-400 transition-colors">
                <FiThumbsUp className="text-base" />
                <span className="text-xs">{review.likes}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FakeComments;
