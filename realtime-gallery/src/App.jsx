import { useState } from "react";
import Gallery from "./components/Gallery";
import Feed from "./components/Feed";

export default function App() {
  const [showFeed, setShowFeed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="p-4 bg-white shadow flex justify-between items-center">
        <h1 className="text-lg font-bold">
          📸 Real-Time Image Gallery
        </h1>

        {/* Mobile feed toggle */}
        <button
          onClick={() => setShowFeed((s) => !s)}
          className="lg:hidden text-sm px-3 py-1 bg-blue-600 text-white rounded"
        >
          {showFeed ? "Hide Feed" : "Show Feed"}
        </button>
      </header>

      {/* Main layout */}
      <div className="flex">
        {/* Gallery */}
        <main className="flex-1 p-4">
          <Gallery />
        </main>

        {/* Feed (desktop only) */}
        <div className="hidden lg:block">
          <Feed />
        </div>
      </div>

      {/* Feed (mobile drawer style) */}
      {showFeed && (
        <div className="lg:hidden border-t bg-white">
          <Feed />
        </div>
      )}
    </div>
  );
}
