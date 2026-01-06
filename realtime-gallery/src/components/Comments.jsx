import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../api/firebase";
import { useUserStore } from "../store/userStore";

export default function Comments({ imageId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const { user } = useUserStore();

  useEffect(() => {
    if (!imageId) return;

    const q = query(
      collection(db, "comments"),
      where("imageId", "==", imageId),
      orderBy("createdAt", "asc")
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

  const addComment = async () => {
    if (!text.trim()) return;

    // 🔹 add comment
    await addDoc(collection(db, "comments"), {
      imageId,
      text,
      userId: user.id,
      userName: user.name,
      userColor: user.color,
      createdAt: serverTimestamp(),
    });

    // 🔹 add to global feed
    await addDoc(collection(db, "feed"), {
      type: "comment",
      imageId,
      message: `${user.name} added a comment`,
      createdAt: serverTimestamp(),
    });

    setText("");
  };

  return (
    <div className="mt-4">
      {/* Comments list */}
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {comments.map((c) => (
          <p
            key={c.id}
            className="text-sm bg-gray-100 rounded px-2 py-1"
          >
            <span
              className="font-semibold mr-1"
              style={{ color: c.userColor }}
            >
              {c.userName}:
            </span>
            {c.text}
          </p>
        ))}

        {comments.length === 0 && (
          <p className="text-xs text-gray-400">
            No comments yet
          </p>
        )}
      </div>

      {/* Input box */}
      <div className="flex gap-2 mt-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
          className="
            flex-1 
            border 
            rounded 
            px-2 
            py-1 
            text-sm
            focus:outline-none
            focus:ring-1
            focus:ring-blue-500
          "
        />
        <button
          onClick={addComment}
          className="
            px-3 
            py-1 
            bg-blue-600 
            text-white 
            rounded 
            text-sm
          "
        >
          Send
        </button>
      </div>
    </div>
  );
}
