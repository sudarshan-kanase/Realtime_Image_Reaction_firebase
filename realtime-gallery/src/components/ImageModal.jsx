import EmojiBar from "./EmojiBar";
import Comments from "./Comments";

export default function ImageModal({ image, onClose }) {
  if (!image) return null;

  return (
    // Overlay
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-3">
      {/* Modal container */}
      <div
        className="
          bg-white
          w-full
          max-w-4xl
          max-h-[95vh]
          rounded-lg
          shadow-xl
          relative
          flex
          flex-col
          overflow-hidden
        "
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="
            absolute
            top-3
            right-3
            z-10
            text-2xl
            text-gray-600
            hover:text-black
          "
        >
          ✖
        </button>

        {/* Image section */}
        <div className="flex-1 flex items-center justify-center bg-black">
          <img
            src={image.urls.regular}
            alt={image.alt_description}
            className="
              max-h-[60vh]
              w-auto
              max-w-full
              object-contain
            "
          />
        </div>

        {/* Actions + comments */}
        <div className="p-4 overflow-y-auto">
          <EmojiBar imageId={image.id} />
          <Comments imageId={image.id} />
        </div>
      </div>
    </div>
  );
}
