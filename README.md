# 📸 Real-Time Image Gallery  
### React Intern Assignment

A **multi-user real-time image interaction web application** built with **React**.  
Users can browse images from Unsplash, react with emojis, add comments, and see all interactions update **instantly across multiple users and devices**.

---

## 🔗 Live Demo
👉 **Live App:** (add deployed link here)  
Example: https://realtime-gallery.netlify.app

## 🔗 GitHub Repository
👉 **Source Code:** (add repo link here)  
Example: https://github.com/your-username/realtime-gallery

---

## 🎯 Assignment Objective

Build a real-time image gallery application where:

- Users can view images from **Unsplash**
- Add **emoji reactions** and **comments**
- All interactions sync **instantly**
- A **global live feed** shows activity across images

This assignment focuses on **real-time state handling, React fundamentals, and clean UI/UX**.

---

## 🧱 Tech Stack

- **Frontend:** React (Functional Components)
- **Styling:** Tailwind CSS
- **Real-Time Database:** Firebase Firestore
- **State Management:** Zustand
- **API:** Unsplash API
- **Build Tool:** Vite
- **Deployment:** Netlify / Vercel

---

## ✨ Features

### 🖼️ Gallery
- Responsive image grid
- Pagination using **Load More**
- Images fetched from Unsplash API
- Click image to open modal view

### 😊 Image Interactions (Real-Time)
- Emoji reactions (❤️ 🔥 👍 😂)
- Emoji counts update instantly across tabs
- Image-level real-time synchronization

### 💬 Comments (Real-Time)
- Add comments to images
- Comments appear instantly for all users
- Clean and readable UI
- Basic user identity (random username + color)

### 🔴 Global Live Feed
- Displays activity across all images
- Real-time updates for reactions and comments
- Independent from image-level view

---

## 🔄 Real-Time Architecture

- Firestore **onSnapshot** listeners for real-time updates
- Separate collections:
  - `reactions`
  - `comments`
  - `feed`
- Image-level queries isolate updates
- Feed-level queries provide global activity

---

## ❓ Why Firestore Instead of InstantDB?

Although the assignment mentions **InstantDB**,  
**Firebase Firestore** was used to demonstrate the same real-time concepts:

- Real-time listeners
- Multi-user synchronization
- Event-based updates

The architecture is **backend-agnostic** and can be adapted easily.

---

## 📁 Project Structure

src/
│── api/
│ ├── firebase.js
│ └── unsplash.js
│
│── components/
│ ├── Gallery.jsx
│ ├── ImageCard.jsx
│ ├── ImageModal.jsx
│ ├── EmojiBar.jsx
│ ├── Comments.jsx
│ └── Feed.jsx
│
│── store/
│ └── userStore.js
│
│── App.jsx
│── main.jsx
│── index.css


---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/realtime-gallery.git
cd realtime-gallery

2️⃣ Install Dependencies
npm install

3️⃣ Environment Variables

Create a .env file in the root directory:

VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

VITE_UNSPLASH_ACCESS_KEY=your_unsplash_key

4️⃣ Run Locally
npm run dev

🧪 Testing Real-Time Behavior

Open the app in multiple browser tabs

Add emoji reactions or comments

Observe instant updates across all tabs

🎨 UI / UX Decisions

Clean and minimal layout

Responsive image modal

Scrollable comments section

Sticky and readable live feed

Desktop-first with mobile optimization

🧩 Challenges Faced & Solutions

Comments not syncing initially
→ Fixed by correcting imageId mismatch and clearing old Firestore data

Duplicate React key warnings
→ Fixed using stable composite keys

Modal responsiveness issues
→ Solved using flexible layout and object-contain

Feed visibility issues on small screens
→ Improved with responsive layout adjustments

🚀 Future Improvements

Emoji picker instead of fixed emojis

Edit/delete own comments or reactions

Authentication-based users

Click feed item → focus related image

Performance optimizations for large datasets
