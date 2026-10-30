import { stockImageFor } from '../data/stockImages';

// Real session photo with a short caption. Fixed width/height keep the
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
        Photo from a Builds Your Mind session.
      </figcaption>
    </figure>
  );
};

export default StockFigure;
