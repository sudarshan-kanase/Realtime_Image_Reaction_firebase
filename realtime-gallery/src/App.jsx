import Gallery from "./components/Gallery";
import Feed from "./components/Feed";

export default function App() {
  return (
    // Main app wrapper
    <div className="min-h-screen flex bg-gray-100">
      {/* Left section: Gallery */}
      <div className="flex-1 flex flex-col">
        {/* App header */}
        <header className="p-4 bg-white shadow-sm border-b">
          <h1 className="text-xl font-bold text-gray-800">
            📸 Real-Time Image Gallery
          </h1>
        </header>

        {/* Main content */}
        <main className="p-6 flex-1 overflow-y-auto">
          <Gallery />
        </main>
      </div>

      {/* Right section: Live Feed */}
      <Feed />
    </div>
  );
}
