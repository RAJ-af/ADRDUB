
import { FiStar, FiThumbsUp } from 'react-icons/fi';
import { IoShieldCheckmarkOutline } from 'react-icons/io5';

function FakeComments() {
  const reviews = [
    {
      name: 'Rahul Sharma',
      avatar: 'https://ui-avatars.com/api/?name=Rahul+Sharma&background=0ea5e9&color=fff&size=150',
      rating: 5,
      time: '2 days ago',
      comment: 'Best app for Hindi dubbed anime! Quality bahut achha hai. Daily updates milte hai. Highly recommended! 🔥',
      likes: 234
    },
    {
      name: 'Priya Singh',
      avatar: 'https://i.pravatar.cc/150?img=45',
      rating: 5,
      time: '5 days ago',
      comment: 'Finally ek app jisme latest anime Hindi me milti hai! Download feature bhi bahut useful hai. Love it! ❤️',
      likes: 189
    },
    {
      name: 'Arjun Patel',
      avatar: 'https://i.pravatar.cc/150?img=68',
      rating: 4,
      time: '1 week ago',
      comment: 'Great app! Dubbing quality top notch hai. Bas thoda aur anime add karo. Overall 10/10 👍',
      likes: 156
    },
    {
      name: 'Sneha Gupta',
      avatar: 'https://ui-avatars.com/api/?name=Sneha+Gupta&background=f97316&color=fff&size=150',
      rating: 5,
      time: '1 week ago',
      comment: 'Mujhe isko use karte hue 2 mahine ho gaye. Best app for anime lovers! No ads, smooth playback! 🎉',
      likes: 298
    },
    {
      name: 'Vikram Kumar',
      avatar: 'https://i.pravatar.cc/150?img=51',
      rating: 5,
      time: '2 weeks ago',
      comment: 'Bhai ekdum mast app hai! Naruto, One Piece sab Hindi me mil jaata hai. Download speed bhi fast hai! 🚀',
      likes: 421
    },
    {
      name: 'Anjali Verma',
      avatar: 'https://ui-avatars.com/api/?name=Anjali+Verma&background=8b5cf6&color=fff&size=150',
      rating: 4,
      time: '3 weeks ago',
      comment: 'UI design bahut clean hai. Episodes easily mil jaate hai. Thoda improve kar sakte ho but overall amazing! ⭐',
      likes: 167
    }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-2xl shadow-xl p-8 mb-8 border border-blue-800/30">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          User Reviews
        </h2>
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <FiStar key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-gray-300 font-medium">4.8/5</span>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all">
            {/* User Info */}
            <div className="flex items-start gap-4 mb-3">
              <img 
                src={review.avatar} 
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/50"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-white">{review.name}</h3>
                </div>
                
                {/* Rating & Time */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <FiStar 
                        key={i} 
                        className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">{review.time}</span>
                </div>

                {/* Comment */}
                <p className="text-gray-300 leading-relaxed">
                  {review.comment}
                </p>

                {/* Likes */}
                <button className="flex items-center gap-2 mt-3 text-gray-400 hover:text-blue-400 transition-colors">
                  <FiThumbsUp className="w-4 h-4" />
                  <span className="text-sm">{review.likes}</span>
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

