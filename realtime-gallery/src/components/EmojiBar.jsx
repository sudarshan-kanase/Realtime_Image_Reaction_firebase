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

// List of available emoji reactions
const EMOJIS = ["❤️", "🔥", "👍", "😂"];

export default function EmojiBar({ imageId }) {
  // Store all reactions for this image
  const [reactions, setReactions] = useState([]);

  // Listen for emoji reactions in real-time
  useEffect(() => {
    if (!imageId) return;

    const q = query(
      collection(db, "reactions"),
      where("imageId", "==", imageId)
    );

    // Real-time Firestore listener
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((doc) => ({
        id: doc.id, // Used for stable identity
        ...doc.data(),
      }));
      setReactions(list);
    });

    // Cleanup listener on unmount
    return () => unsub();
  }, [imageId]);

  // Add a new emoji reaction
  const addReaction = async (emoji) => {
    await addDoc(collection(db, "reactions"), {
      imageId,
      emoji,
      createdAt: serverTimestamp(),
    });
  };

  // Count how many times an emoji was used
  const countByEmoji = (emoji) =>
    reactions.filter((r) => r.emoji === emoji).length;

  return (
    <div className="flex items-center gap-5 mt-4">
      {EMOJIS.map((e) => (
        <button
          key={`emoji-${e}`}
          onClick={() => addReaction(e)}
          className="
            flex 
            items-center 
            gap-1 
            text-2xl 
            px-2 
            py-1
            rounded-md
            hover:bg-gray-100
            hover:scale-110
            transition
          "
        >
          <span>{e}</span>
          <span className="text-sm text-gray-600">
            {countByEmoji(e)}
          </span>
        </button>
      ))}
    </div>
  );
}
