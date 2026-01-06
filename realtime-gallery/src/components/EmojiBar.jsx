import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../api/firebase";

const EMOJIS = ["❤️", "🔥", "👍", "😂"];

export default function EmojiBar({ imageId }) {
  const [reactions, setReactions] = useState([]);

  useEffect(() => {
    if (!imageId) return;

    const q = query(
      collection(db, "reactions"),
      where("imageId", "==", imageId)
    );

    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((doc) => ({
        id: doc.id,      // ✅ VERY IMPORTANT
        ...doc.data(),
      }));

      setReactions(list);
    });

    return () => unsub();
  }, [imageId]);

  const addReaction = async (emoji) => {
    await addDoc(collection(db, "reactions"), {
      imageId,
      emoji,
      createdAt: serverTimestamp(),
    });
  };

  const countByEmoji = (emoji) =>
    reactions.filter((r) => r.emoji === emoji).length;

  return (
    <div className="flex gap-6 mt-4">
      {EMOJIS.map((e) => (
        <button
          key={`emoji-${e}`}
          onClick={() => addReaction(e)}
          className="flex items-center gap-1 text-2xl hover:scale-125 transition"
        >
          {e}
          <span className="text-sm text-gray-600">
            {countByEmoji(e)}
          </span>
        </button>
      ))}
    </div>
  );
}
