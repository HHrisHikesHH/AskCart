# 🛒 AskCart Frontend

## A modern frontend application built with **React + Vite**.

<br/>

## 📋 Requirements

- **Node.js v22+**
- **Docker** (optional, for containerized runs)

---

<br/>

## 🧑‍💻 Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Development Server

```bash
npm run dev
```

## This starts the app in development mode — typically at `http://localhost:5173`.

<br/>

## 🏗️ Build for Production

1. Build the Project

```bash
npm run build
```

### 2. Preview the Build Locally

```bash
npm run preview
```

## This serves the production build locally for quick testing.

<br/>

## 🐳 Run with Docker

1. Build the Docker Image

```bash
docker build -t ask-cart .
```

### 2. Run the Container

```bash
docker run -d -p 5173:80 --name ask-cart ask-cart
```

Access the app at 👉 `http://localhost:5173`.

---
<br/>

### ⚡ One-liner to Rebuild and Run

```bash
docker build -t ask-cart . && docker run -d -p 5173:80 --rm ask-cart
```
