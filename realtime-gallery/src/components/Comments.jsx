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
import { useUserStore } from "../store/userStore";

export default function Comments({ imageId }) {
  // Store comments for this image
  const [comments, setComments] = useState([]);

  // Input value
  const [text, setText] = useState("");

  // Current user (from Zustand)
  const { user } = useUserStore();

  // Listen to comments for the selected image (REAL-TIME)
  useEffect(() => {
    if (!imageId) return;

    const q = query(
      collection(db, "comments"),
      where("imageId", "==", imageId)
    );

    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(list);
    });

    return () => unsub();
  }, [imageId]);

  // Add new comment
  const addComment = async () => {
    if (!text.trim()) return;

    await addDoc(collection(db, "comments"), {
      imageId,
      text,
      userId: user.id,
      userName: user.name,
      userColor: user.color,
      createdAt: serverTimestamp(),
    });

    await addDoc(collection(db, "feed"), {
      type: "comment",
      imageId,
      message: `${user.name} added a comment`,
      createdAt: serverTimestamp(),
    });

    setText("");
  };

  return (
    <div className="mt-6 border-t pt-4">
      {/* Comments list */}
      <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
        {comments.map((c) => (
          <div
            key={c.id}
            className="
              bg-gray-50
              border
              rounded-lg
              px-4
              py-2
              text-sm
              shadow-sm
            "
          >
            <div className="flex items-center gap-2 mb-1">
              <span
                className="font-semibold text-sm"
                style={{ color: c.userColor }}
              >
                {c.userName}
              </span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {c.text}
            </p>
          </div>
        ))}

        {/* Empty state */}
        {comments.length === 0 && (
          <p className="text-xs text-gray-400 italic">
            No comments yet. Be the first to comment.
          </p>
        )}
      </div>

      {/* Comment input */}
      <div className="flex items-center gap-3 mt-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="
            flex-1
            border
            rounded-full
            px-4
            py-2
            text-sm
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />
        <button
          onClick={addComment}
          className="
            px-5
            py-2
            bg-blue-600
            text-white
            rounded-full
            text-sm
            hover:bg-blue-700
            transition
            disabled:opacity-50
          "
        >
          Send
        </button>
      </div>
    </div>
  );
}
