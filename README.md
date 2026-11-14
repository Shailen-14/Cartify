# Cartify

Cartify is a full-stack shopping app where people can browse products, create and manage their own listings, and add products to a personal cart.

## Features

- Browse the product catalog
- Create, update, and delete your own products
- Sign up, sign in, and sign out
- Add products to a cart, remove items, or clear the cart
- Choose from multiple themes; the selected theme is saved in the browser

## Tech stack

- **Frontend:** React, Vite, Tailwind CSS, daisyUI, Zustand, React Router
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT stored in an HTTP-only cookie

## Requirements

- Node.js and npm
- MongoDB, either running locally or available through a hosted connection string

## Getting started

### 1. Configure the backend

In a terminal, install the backend dependencies:

```bash
cd backend
npm install
```

Create `backend/.env` with your local settings:

```dotenv
PORT=5001
NODE_ENV=development
CLIENT_BASE_URL=http://localhost:5173
JWT_SECRET=replace-with-a-long-random-secret
MONGO_URI=mongodb://127.0.0.1:27017/cartify
```

Use your MongoDB connection string for `MONGO_URI`. Keep `.env` files private; do not commit real credentials or secrets.

Start the backend:

```bash
npm run dev
```

The API listens on `http://localhost:5001` by default.

### 2. Configure and start the frontend

In a second terminal, install the frontend dependencies:

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```dotenv
VITE_SERVER_BASE_URL=http://localhost:5001
```

Start the Vite development server:

```bash
npm run dev
```

Open the local URL printed by Vite (by default, `http://localhost:5173`).

## Available scripts

Run these commands from the corresponding `frontend` or `backend` directory.

| Script | Description |
| --- | --- |
| `npm run dev` | Start the development server (Vite frontend or watch-mode backend) |
| `npm run build` | Build the frontend for production |
| `npm run preview` | Preview the production frontend build |
| `npm run lint` | Run Oxlint on the frontend |

## API overview

The backend exposes these endpoints:

| Method | Path | Access |
| --- | --- | --- |
| `POST` | `/api/auth/sign-up` | Public |
| `POST` | `/api/auth/sign-in` | Public |
| `POST` | `/api/auth/sign-out` | Public |
| `GET` | `/api/auth/me` | Signed in |
| `GET` | `/api/products` | Public |
| `GET` | `/api/products/:id` | Public |
| `POST` | `/api/products` | Signed in |
| `PUT` | `/api/products/:id` | Signed in |
| `DELETE` | `/api/products/:id` | Signed in |
| `GET` | `/api/cart` | Signed in |
| `POST` | `/api/cart/:productId` | Signed in |
| `DELETE` | `/api/cart/:productId` | Signed in |
| `DELETE` | `/api/cart` | Signed in |

## Project layout

```text
backend/
  src/
    config/       Environment and database setup
    controllers/  API request handlers
    middleware/  Authentication middleware
    models/       Mongoose models
    routes/       API routes
frontend/
  src/
    components/   Shared UI components
    pages/        Application pages
    stores/       Zustand state stores
```
