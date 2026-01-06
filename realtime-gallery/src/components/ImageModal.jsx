import EmojiBar from "./EmojiBar";
import Comments from "./Comments";

export default function ImageModal({ image, onClose }) {
  if (!image) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl"
        >
          ✖
        </button>

        <img
          src={image.urls.regular}
          alt={image.alt_description}
          className="rounded w-full"
        />

        <EmojiBar imageId={image.id} />
        <Comments imageId={image.id} />
      </div>
    </div>
  );
}
