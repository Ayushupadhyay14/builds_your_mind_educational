import { stockImageFor } from '../data/stockImages';

// Illustrative stock photo with an honest caption. Fixed width/height keep the
// layout stable (no shift) and the image is lazy-loaded below the fold.
const StockFigure = ({ pageId }) => {
  const img = stockImageFor(pageId);
  if (!img) return null;
  return (
    <figure className="max-w-4xl mx-auto">
      <img
        src={img.src}
        alt={img.alt}
        width={img.width}
        height={img.height}
        loading="lazy"
        decoding="async"
        className="w-full h-auto rounded-2xl shadow-xl"
      />
      <figcaption className="mt-3 text-sm text-gray-600 text-center">
        Illustrative stock photograph, not one of our sessions.
      </figcaption>
    </figure>
  );
};

export default StockFigure;
