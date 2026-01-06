import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../api/firebase";

export default function Feed() {
  // Store all live feed items
  const [items, setItems] = useState([]);

  // Listen to global feed in real-time
  useEffect(() => {
    const q = query(
      collection(db, "feed"),
      orderBy("createdAt", "desc")
    );

    // Real-time Firestore listener
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(list);
    });

    // Cleanup listener on unmount
    return () => unsub();
  }, []);

  return (
    <div className="w-72 bg-white border-l p-4 h-screen overflow-y-auto">
      {/* Feed title */}
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <span className="text-red-500">●</span>
        Live Feed
      </h3>

      {/* Feed items */}
      <div className="space-y-3 text-sm">
        {items.map((i) => (
          <div
            key={i.id}
            className="bg-gray-50 border rounded-md px-3 py-2"
          >
            <p className="text-gray-700">
              {i.message}
            </p>
          </div>
        ))}

        {/* Empty state */}
        {items.length === 0 && (
          <p className="text-xs text-gray-400 italic">
            No activity yet
          </p>
        )}
      </div>
    </div>
  );
}
