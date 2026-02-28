# ScholarNexus 🎓

An AI-driven Productivity & Knowledge OS for modern students. Built during the "Project Green" automation cycle and fully redesigned for production.

**🚀 Live Demo:** [https://scholar-nexus-app.onrender.com/](https://scholar-nexus-app.onrender.com/)

---

## 🌟 Features

- **Semantic Dashboard**: A unified overview of your study notes, flashcard decks, and AI tools with a high-end, minimalist aesthetic.
- **Knowledge Base**: Create, save, and organize study notes with real-time saving.
- **Scholar AI Tutor**: Integration with OpenRouter's `stepfun/step-3.5-flash:free` model for instant, contextual academic Q&A.
- **AI Flashcard Engine**: Automatically generate targeted flashcard decks from any topic or study note.
- **AI Study Planner**: Input your goals and timeline, and generate structured, actionable study schedules.
- **AI Quiz Generator**: Test your knowledge instantly with auto-generated multiple-choice quizzes with detailed explanations.
- **AI Summarizer**: Paste long research papers or articles and extract key bullet points or executive summaries.
- **Secure Authentication**: Built-in Email/Password credential login flow using NextAuth.js.
- **Cloud Database**: Real-time persistent data storage backed by Neon (Serverless PostgreSQL) and Prisma ORM.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router), TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database & ORM**: Neon (PostgreSQL), Prisma Client
- **Authentication**: NextAuth.js (Auth.js) with bcryptjs
- **AI Integration**: OpenRouter API (`stepfun/step-3.5-flash:free`)
- **Deployment**: Render

---

## ⚙️ Local Development Setup

1. **Clone the repo.**
2. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```
3. **Set up your environment variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   # Your Neon Database Connection String
   DATABASE_URL="postgresql://user:password@endpoint.neon.tech/neondb?sslmode=require"

   # NextAuth Configuration
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-super-secret-random-string"

   # OpenRouter API Key for AI features
   OPENROUTER_API_KEY="sk-or-v1-..."
   ```
4. **Push the database schema:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```
5. **Run the development server:**
   ```bash
   npm run dev
   ```

---

## ☁️ Deployment (Render)

ScholarNexus is configured for zero-downtime deployment on [Render](https://render.com/).

**To Deploy:**

1. Connect your GitHub/GitLab repository to Render.
2. Create a new **Web Service**.
3. Choose your Node.js environment.
4. Set the **Build Command** to: `npm install && npm run build` *(Note: The package.json `build` script handles Prisma generation automatically to avoid Vercel/Render caching issues).*
5. Set the **Start Command** to: `npm start`
6. **Crucial:** In the Environment Variables section, you must add:
   - `OPENROUTER_API_KEY`: Your key from OpenRouter.
   - `DATABASE_URL`: Your Neon PostgreSQL connection string.
   - `NEXTAUTH_SECRET`: A secure random string for JWT encryption.
   - `NEXTAUTH_URL`: The production URL of your Render app (e.g., `https://scholar-nexus-app.onrender.com`).

Render will automatically build and deploy your modern, AI-powered OS.
