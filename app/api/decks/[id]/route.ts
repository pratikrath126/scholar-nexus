import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const resolvedParams = await params;
    const deckId = resolvedParams.id;

    // Ensure the deck belongs to the user
    const deck = await prisma.deck.findUnique({ where: { id: deckId } });
    if (!deck || deck.userId !== user.id) {
         return NextResponse.json({ message: "Deck not found or unauthorized" }, { status: 404 });
    }

    await prisma.deck.delete({
      where: { id: deckId },
    });

    return NextResponse.json({ message: "Deck deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting deck" }, { status: 500 });
  }
}
