export default function ImageCard({ image, onClick }) {
  return (
    <img
      src={image.urls.small}
      alt={image.alt_description}
      onClick={onClick}
      className="
        rounded-lg 
        cursor-pointer 
        hover:scale-105 
        transition 
        shadow-sm
      "
    />
  );
}
