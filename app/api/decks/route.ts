import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const decks = await prisma.deck.findMany({
      where: { userId: user.id },
      include: { cards: true },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(decks);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching decks" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const { topic, flashcards } = await req.json();

    const deck = await prisma.deck.create({
      data: {
        topic: topic || "New Deck",
        userId: user.id,
        cards: {
            create: flashcards.map((card: any) => ({
                front: card.front,
                back: card.back
            }))
        }
      }
    });

    return NextResponse.json(deck);
  } catch (error) {
    return NextResponse.json({ message: "Error saving deck" }, { status: 500 });
  }
}
