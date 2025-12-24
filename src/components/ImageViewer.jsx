import { useState } from 'react';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

function ImageViewer({ screenshots, captions, onClose, initialIndex = 0 }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center transition-colors z-10"
      >
        <FiX className="text-white text-xl" />
      </button>

      {/* Image Counter */}
      <div className="absolute top-4 left-4 bg-slate-800 px-3 py-1.5 rounded-lg text-white text-sm z-10">
        {currentIndex + 1} / {screenshots.length}
      </div>

      {/* Previous Button */}
      {screenshots.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevImage();
          }}
          className="absolute left-4 w-12 h-12 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center transition-colors z-10"
        >
          <FiChevronLeft className="text-white text-2xl" />
        </button>
      )}

      {/* Image */}
      <div 
        className="max-w-4xl max-h-[90vh] px-16"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={screenshots[currentIndex]}
          alt={captions[currentIndex]}
          className="max-w-full max-h-[85vh] object-contain rounded-lg"
        />
        <p className="text-center text-gray-300 mt-4">
          {captions[currentIndex]}
        </p>
      </div>

      {/* Next Button */}
      {screenshots.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextImage();
          }}
          className="absolute right-4 w-12 h-12 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center transition-colors z-10"
        >
          <FiChevronRight className="text-white text-2xl" />
        </button>
      )}

      {/* Swipe hint for mobile */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-500 text-xs">
        Swipe or use arrow keys to navigate
      </div>
    </div>
  );
}

export default ImageViewer;
