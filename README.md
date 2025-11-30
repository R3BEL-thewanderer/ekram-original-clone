# EKRAM ORIGINAL - Modern E-Commerce

A modernized, full-stack e-commerce website for EKRAM ORIGINAL.

> **DISCLAIMER:** This project is an **Ekram Original clone** created strictly for **study and educational purposes only**. It is not the official website and is not intended for commercial use.

## Tech Stack
- **Frontend:** Next.js 14 (App Router), React, Tailwind CSS, Framer Motion
- **Backend:** Next.js API Routes, MongoDB (Mongoose)
- **State Management:** Zustand
- **Authentication:** JWT (Basic structure ready)

## Getting Started

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Environment Variables:**
    Create a `.env.local` file in the root directory:
    ```env
    MONGODB_URI=mongodb://localhost:27017/ekram-original
    ```

3.  **Seed the Database:**
    After starting the server, visit the seed API route to populate products:
    [http://localhost:3000/api/seed](http://localhost:3000/api/seed)
    (This will clear existing products and add the default set).

4.  **Run the Development Server:**
    ```bash
    npm run dev
    ```

5.  **Open the App:**
    Visit [http://localhost:3000](http://localhost:3000)

## Features
- **Home Page:** Featured collections, best sellers, brand story.
- **Collections:** Filter by price, sort by various criteria.
- **Product Details:** Image zoom, color/size selection, related products.
- **Cart:** Fully functional cart with persistence.
- **Checkout:** Order creation and tracking.
- **Track Order:** Real-time order status tracking.
- **Responsive Design:** Mobile-first approach.

## Folder Structure
- `app/`: App Router pages and API routes.
- `components/`: Reusable UI components.
- `lib/`: Utilities (DB connection, store).
- `models/`: Mongoose models.
