# De Amora 🍕

De Amora is an ultra-premium, luxury web application designed for an upscale café experience. It featuring a cinematic scrollytelling landing page, a refined user interface with a dark/gold aesthetic, and a robust administrative dashboard for content management.

## ✨ Key Features

### 🌟 User Experience (Frontend)
- **Cinematic Scrollytelling**: A high-resolution, scroll-linked canvas animation featuring a 240-frame "pizza explosion" reveal.
- **Premium Aesthetics**: A sophisticated dark mode theme with gold accents, utilizing Playfair Display for elegant typography and glassmorphism for modern UI elements.
- **Fully Responsive**: Optimized for all devices—from large desktops to mobile phones—featuring a custom-built mobile navigation menu.
- **Interactive Menu**: Browse the culinary offerings with categorized filtering.
- **Order & Reservations**: A dedicated interface for customers to reach out via phone or explore delivery options.
- **Feedback System**: A premium, star-based review system for customers to share their dining experiences.

### 🔐 Administrative Power (Backend & Dashboard)
- **Secure Authentication**: JWT-based admin login with bcrypt-hashed password protection.
- **Unified Dashboard**: A central hub to manage the entire café's digital presence.
- **Menu Management**: Full CRUD (Create, Read, Update, Delete) capabilities for the menu, including a real-time search filter for quick edits.
- **Offers & Promotions**: Easily update active café offers and deals.
- **Review Monitoring**: View all customer feedback in a clean, organized table.
- **Secure API**: A RESTful backend powered by Node.js, Express, and MongoDB Atlas.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|--- |--- |
| **Frontend** | Next.js 15, React, Tailwind CSS v4, Framer Motion, HTML5 Canvas |
| **Backend** | Node.js, Express.js, MongoDB Atlas (Mongoose) |
| **Security** | JSON Web Tokens (JWT), Bcrypt.js |
| **Deployment** | Vercel (Frontend), Render/Railway (Backend) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas Account

### Backend Setup (`/server`)
1. Navigate to the server directory: `cd server`
2. Install dependencies: `npm install`
3. Create a `.env` file and add your credentials:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_key
   PORT=5000
   ```
4. Start the server: `npm start`

### Frontend Setup (`/de-amora-site`)
1. Navigate to the site directory: `cd de-amora-site`
2. Install dependencies: `npm install`
3. Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```
4. Start the development server: `npm run dev`

---

## 📂 Project Structure

```text
De-Amora/
├── de-amora-site/      # Next.js Frontend
│   ├── src/
│   │   ├── app/        # Pages (Home, Menu, Order, Admin, etc.)
│   │   ├── components/ # Reusable UI (Navbar, ScrollCanvas, etc.)
│   │   └── lib/        # API utilities
│   └── public/         # Static assets & Pizza Frames
├── server/             # Express.js Backend
│   ├── models/         # Mongoose Schemas (Menu, Reviews, etc.)
│   ├── routes/         # API Endpoints
│   └── middleware/     # Auth & Error handling
└── .gitignore          # Root ignore file
```

---

## 📸 Visuals
- **Landing Page**: Features a 240-frame "Exploded View" pizza animation.
- **Color Palette**: `#050505` (Deep Black), `#C9A96E` (Accent Gold).
- **Typography**: *Playfair Display* (Serif headings), *Inter* (Sans-serif body).

---

## 📜 License
This project was developed with passion for the **De Amora Café**. All rights reserved.

---
*Crafted with precision & artistry.* 🥂
