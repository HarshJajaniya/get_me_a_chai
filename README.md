Perfect 👍 You already have a screenshot hosted in your repo.
I’ll update the **README.md** draft to include that image.

Here’s the improved version 👇

---

# ☕ Get Me A Chai

A full-stack donation platform built with **Next.js 15 (App Router)**, **MongoDB**, and **Razorpay**, where supporters can send you a “chai” (donation).

Deployed on **Vercel** 🚀

---

## ✨ Features

* 🔑 Authentication with **NextAuth.js** (GitHub, Google)
* 💳 Secure payments via **Razorpay**
* 👤 User profile pages (`/username`)
* 📜 Recent payments listing
* 🛠 Update profile with name, username, pics & Razorpay keys
* ⚡ Server Actions with MongoDB integration

---

## 📸 Screenshots

### 🏠 Homepage

![Homepage](https://raw.githubusercontent.com/HarshJajaniya/get_me_a_chai/refs/heads/main/public/4.png)
![Dashboard](https://raw.githubusercontent.com/HarshJajaniya/get_me_a_chai/refs/heads/main/public/2.png)
![YourPage](https://raw.githubusercontent.com/HarshJajaniya/get_me_a_chai/refs/heads/main/public/3.png)
![YourPage](https://raw.githubusercontent.com/HarshJajaniya/get_me_a_chai/refs/heads/main/public/1.png)


---

## 🛠 Tech Stack

* **Frontend**: [Next.js 15](https://nextjs.org/) + React
* **Styling**: Tailwind CSS
* **Auth**: NextAuth.js (GitHub, Google)
* **Database**: MongoDB Atlas (Mongoose ODM)
* **Payments**: Razorpay API

---

## 🚀 Getting Started

### 1. Clone repo

```bash
git clone https://github.com/HarshJajaniya/get_me_a_chai.git
cd get_me_a_chai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add environment variables

Create a `.env.local` file:

```env
MONGODB_URI=your_mongo_uri
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# OAuth
GITHUB_ID=your_github_id
GITHUB_SECRET=your_github_secret
GOOGLE_ID=your_google_id
GOOGLE_SECRET=your_google_secret

# Razorpay
NEXT_PUBLIC_KEY_ID=rzp_test_xxxxx
KEY_SECRET=xxxxxx

# Deployment URL
NEXT_PUBLIC_URL=https://get-me-a-chai.vercel.app
```

### 4. Run dev server

```bash
npm run dev
```

Open 👉 [http://localhost:3000](http://localhost:3000)

---

## 📦 Build for Production

```bash
npm run build
npm start
```

---

## 🌐 Deployment

Easily deploy on **Vercel**:

* Push code to GitHub
* Import repo in Vercel
* Set environment variables in Vercel Dashboard
* Deploy 🎉

---

## 🙌 Contributing

PRs are welcome! Feel free to open an issue for bugs/feature requests.

---

## 📜 License

MIT License © 2025 Harsh Jajaniya

---

Do you want me to **embed multiple screenshots in a grid layout** (Homepage, User Page, Dashboard, Payment) using your future `public/*.png` files, or just keep this single one for now?
