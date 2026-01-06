import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../api/firebase";

export default function Feed() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "feed"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(list);
    });

    return () => unsub();
  }, []);

  return (
<aside className="w-full lg:w-80 bg-white border-l h-[60vh] lg:h-screen overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 p-4 border-b">
        <h3 className="font-semibold flex items-center gap-2">
          <span className="text-red-500 text-sm">●</span>
          Live Feed
        </h3>
      </div>

      {/* Feed items */}
      <div className="p-4 space-y-3 text-sm">
        {items.map((i) => (
          <div
            key={i.id}
            className="bg-gray-50 border rounded-lg px-3 py-2"
          >
            <p className="text-gray-700">
              {i.message}
            </p>
          </div>
        ))}

        {items.length === 0 && (
          <p className="text-xs text-gray-400 italic text-center">
            No activity yet
          </p>
        )}
      </div>
    </aside>
  );
}
