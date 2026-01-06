import { useEffect, useState } from "react";
import { fetchImages } from "../api/unsplash";
import ImageModal from "./ImageModal";
import ImageCard from "./ImageCard";

export default function Gallery() {
  // Store all loaded images
  const [images, setImages] = useState([]);

  // Current page number for pagination
  const [page, setPage] = useState(1);

  // Loading state for button and UX
  const [loading, setLoading] = useState(false);

  // Selected image for modal view
  const [selected, setSelected] = useState(null);

  // Load images whenever page number changes
  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);

      // Fetch images from Unsplash API
      const data = await fetchImages(page);

      if (mounted) {
        // Append new images to existing list
        setImages((prev) => [...prev, ...data]);
        setLoading(false);
      }
    };

    load();

    // Cleanup to avoid state update on unmounted component
    return () => {
      mounted = false;
    };
  }, [page]);

  return (
    <>
      {/* Image grid */}
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((img, index) => (
          <ImageCard
            key={`${img.id}-${index}`}
            image={img}
            onClick={() => setSelected(img)}
          />
        ))}
      </div>

      {/* Load more button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={loading}
          className="
            px-6
            py-2
            bg-blue-600
            text-white
            rounded-md
            text-sm
            hover:bg-blue-700
            transition
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>

      {/* Image modal */}
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
