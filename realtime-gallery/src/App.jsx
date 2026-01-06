import Gallery from "./components/Gallery";
import Feed from "./components/Feed";

export default function App() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="flex-1">
        <header className="p-4 bg-white shadow">
          <h1 className="text-xl font-bold">
            📸 Real-Time Image Gallery
          </h1>
        </header>

        <main className="p-6">
          <Gallery />
        </main>
      </div>

      <Feed />
    </div>
  );
}
