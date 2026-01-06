export default function ImageCard({ image, onClick }) {
  return (
    // Single image card used inside the gallery grid
    <img
      src={image.urls.small}
      alt={image.alt_description}
      onClick={onClick}
      className="
        rounded-lg
        cursor-pointer
        shadow-sm
        transition
        duration-300
        hover:scale-105
        hover:shadow-md
      "
    />
  );
}
