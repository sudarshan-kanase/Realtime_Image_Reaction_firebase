import EmojiBar from "./EmojiBar";
import Comments from "./Comments";

export default function ImageModal({ image, onClose }) {
  // Do not render modal if no image is selected
  if (!image) return null;

  return (
    // Modal overlay
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      {/* Modal container */}
      <div className="bg-white rounded-lg max-w-3xl w-full p-5 relative shadow-lg">
        {/* Close button */}
        <button
          onClick={onClose}
          className="
            absolute
            top-3
            right-3
            text-xl
            text-gray-600
            hover:text-black
            transition
          "
        >
          ✖
        </button>

        {/* Selected image */}
        <img
          src={image.urls.regular}
          alt={image.alt_description}
          className="rounded-md w-full max-h-[70vh] object-contain"
        />

        {/* Emoji reactions */}
        <EmojiBar imageId={image.id} />

        {/* Image comments */}
        <Comments imageId={image.id} />
      </div>
    </div>
  );
}
