 Real-Time Image Gallery (React Intern Assignment)

A multi-user real-time image interaction web application built with React.
Users can browse images, react with emojis, add comments, and see all interactions update instantly across multiple users and devices.

 Live Demo

 (Add deployed URL here)
Example: https://your-project.vercel.app

 GitHub Repository

 (Add repo link here)
Example: https://github.com/your-username/realtime-gallery

 Assignment Objective

Build a real-time image gallery application where:

Users can view images from Unsplash

Add emoji reactions and comments

All interactions sync instantly for other users

A global live feed shows activity across images

This project focuses on real-time state handling, React fundamentals, and clean UI/UX.

 Tech Stack

Frontend: React (Functional Components)

Styling: Tailwind CSS

Real-time Database: Firebase Firestore

State Management: Zustand

API: Unsplash API

Build Tool: Vite

Deployment: Vercel

 Features
Gallery

Scrollable responsive image grid

Pagination using “Load More”

Images fetched from Unsplash API

Click image to open focused view (modal)

Image Interactions (Real-Time)

Emoji reactions (❤️ 🔥 👍 😂)

Emoji counts update instantly across tabs

Image-level real-time synchronization

Comments (Real-Time)

Add comments to images

Comments appear instantly for all users

Clean and readable UI

Basic user identity (random username + color)

Global Live Feed

Displays activity across all images

Real-time updates for reactions and comments

Independent from image-level view

 Real-Time Architecture

Firestore onSnapshot listeners are used for real-time updates

Separate collections for:

reactions

comments

feed

Image-level queries ensure isolated synchronization

Feed-level queries provide global activity updates

 Why Firestore Instead of InstantDB?

The assignment mentions InstantDB as the real-time layer.
For this implementation, Firebase Firestore was used to demonstrate the same real-time concepts:

Real-time listeners (onSnapshot)

Multi-user synchronization

Event-based updates

The architecture is backend-agnostic, and InstantDB can be integrated with minimal changes.

 Project Structure
src/
│── api/
│   ├── firebase.js
│   └── unsplash.js
│
│── components/
│   ├── Gallery.jsx
│   ├── ImageCard.jsx
│   ├── ImageModal.jsx
│   ├── EmojiBar.jsx
│   ├── Comments.jsx
│   └── Feed.jsx
│
│── store/
│   └── userStore.js
│
│── App.jsx
│── main.jsx
│── index.css

 Setup Instructions
1️ Clone Repository
git clone https://github.com/your-username/realtime-gallery.git
cd realtime-gallery

2️ Install Dependencies
npm install

3️ Environment Variables

Create a .env file in the root:

VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

VITE_UNSPLASH_ACCESS_KEY=your_unsplash_key

 Run Locally
npm run dev

 Testing Real-Time Behavior

Open the app in multiple browser tabs

Add emoji reactions or comments

Observe instant updates across all tabs

 UI / UX Decisions

Clean and minimal layout

Responsive modal for image view

Scrollable comment section

Sticky and readable live feed

Desktop-first with responsive support

 Challenges Faced & Solutions

Comments not syncing initially
→ Resolved by fixing imageId mismatch and cleaning stale Firestore data

Duplicate React keys warning
→ Fixed using stable composite keys

Modal responsiveness issues
→ Solved with flexible layout and object-contain

Feed visibility on small screens
→ Adjusted responsive classes for consistent UX

 What I Would Improve With More Time

Emoji picker instead of fixed emojis

Delete/edit own comments or reactions

Authentication-based users

Feed item click → focus related image

Performance optimizations for large datasets

 Key Learnings

Real-time state synchronization

React component decomposition

Firestore data modeling

Debugging async + real-time issues

UI polish without breaking logic

 Submission Details

Live App: (add link)

GitHub Repo: (add link)

 Final Note

This project demonstrates real-time reasoning, clean React architecture, and problem-solving mindset, focusing on clarity and usability over complexity.
