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
    <div className="w-72 bg-white border-l p-4">
      <h3 className="font-semibold mb-3">
        🔴 Live Feed
      </h3>

      <div className="space-y-2 text-sm">
        {items.map((i) => (
          <p key={i.id} className="text-gray-700">
            {i.message}
          </p>
        ))}
      </div>
    </div>
  );
}
