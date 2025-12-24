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
    <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          User Reviews
        </h2>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-lg">⭐</span>
            ))}
          </div>
          <span className="text-gray-600 font-medium">4.8/5</span>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
            {/* User Info */}
            <div className="flex items-start gap-4 mb-3">
              <img 
                src={review.avatar} 
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-800">{review.name}</h3>
                  {review.verified && (
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs font-medium rounded">
                      Verified
                    </span>
                  )}
                </div>
                
                {/* Rating & Time */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{review.time}</span>
                </div>

                {/* Comment */}
                <p className="text-gray-700 leading-relaxed">
                  {review.comment}
                </p>

                {/* Likes */}
                <button className="flex items-center gap-2 mt-3 text-gray-500 hover:text-sky-500 transition-colors">
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

