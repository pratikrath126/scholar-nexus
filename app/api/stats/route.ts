import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const notesCount = await prisma.note.count({ where: { userId: user.id } });
    const decksCount = await prisma.deck.count({ where: { userId: user.id } });

    // Total flashcards across all decks
    const flashcardsAgg = await prisma.flashcard.count({
        where: { deck: { userId: user.id } }
    });

    const plansCount = await prisma.plan.count({ where: { userId: user.id } });

    const recentNotes = await prisma.note.findMany({
        where: { userId: user.id },
        orderBy: { updatedAt: 'desc' },
        take: 3,
        select: { id: true, title: true, updatedAt: true }
    });

    return NextResponse.json({
        notesCount,
        decksCount,
        flashcardsCount: flashcardsAgg,
        plansCount,
        recentProjects: recentNotes
    });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching stats" }, { status: 500 });
  }
}
