import { create } from "zustand";

// random username generator
const generateUser = () => {
  const id = Math.random().toString(36).substring(2, 8);
  return {
    id,
    name: `User_${id}`,
    color: "#" + Math.floor(Math.random() * 16777215).toString(16),
  };
};

export const useUserStore = create(() => {
  // localStorage मधून user load
  const saved = localStorage.getItem("rt_user");

  const user = saved ? JSON.parse(saved) : generateUser();

  if (!saved) {
    localStorage.setItem("rt_user", JSON.stringify(user));
  }

  return {
    user,
  };
});
