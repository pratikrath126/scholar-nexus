import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: '/login',
  }
})

export const config = {
  matcher: [
    "/",
    "/knowledge-base",
    "/flashcards",
    "/planner",
    "/quiz",
    "/summarizer",
    "/ai-tutor"
  ]
};
