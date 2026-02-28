# ScholarNexus 🎓

An AI-driven Productivity & Knowledge OS for modern students. Built during the "Project Green" automation cycle.

## 🚀 Features

- **Semantic Dashboard**: A unified overview of study hours, mastered topics, and brain power metrics.
- **Knowledge Base**: Organize projects and study material with a hierarchical structure.
- **Scholar AI Tutor**: Integration with OpenRouter's Trinity Large model for academic Q&A.
- **Flashcard Engine**: (Planned) Automated PDF-to-Flashcard generation using RAG.
- **Study Planner**: (Planned) ML-based schedule optimization based on student performance.
- **Modern UI**: Polished Next.js frontend with Tailwind CSS, Framer Motion, and Lucide icons.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI**: OpenRouter API (Trinity Large Preview)
- **Deployment**: Vercel

## ⚙️ Setup

1. Clone the repo.
2. Install dependencies: `npm install`
3. Set `OPENROUTER_API_KEY` in your environment.
4. Run development server: `npm run dev`

---
*Created by Bianca (Project Green Automation)*

## ☁️ Deployment (Render)

ScholarNexus is configured for zero-downtime deployment on [Render](https://render.com/).

**To Deploy:**

1. Connect your GitHub/GitLab repository to Render.
2. Create a new **Web Service**.
3. Choose your Node.js environment.
4. Set the **Build Command** to: `npm install && npm run build`
5. Set the **Start Command** to: `npm start`
6. In the Environment Variables section, add:
   - `OPENROUTER_API_KEY`: Your key from OpenRouter.

Render will automatically build and deploy your modern, AI-powered OS.
