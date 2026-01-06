import { useEffect, useState } from "react";
import { fetchImages } from "../api/unsplash";
import ImageModal from "./ImageModal";
import ImageCard from "./ImageCard";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      const data = await fetchImages(page);
      if (mounted) {
        setImages((prev) => [...prev, ...data]);
        setLoading(false);
      }
    };

    load();
    return () => (mounted = false);
  }, [page]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <ImageCard
            key={`${img.id}-${index}`}
            image={img}
            onClick={() => setSelected(img)}
          />
        ))}
      </div>

      <div className="text-center mt-6">
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>

      {selected && (
        <ImageModal
          key={selected.id}
          image={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
