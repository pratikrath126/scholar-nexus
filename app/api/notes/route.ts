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

    const notes = await prisma.note.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: 'desc' }
    });

    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching notes" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const { title, content } = await req.json();

    const existingNote = await prisma.note.findFirst({
        where: { userId: user.id },
        orderBy: { updatedAt: 'desc' }
    });

    if (existingNote) {
         const updatedNote = await prisma.note.update({
             where: { id: existingNote.id },
             data: { title, content }
         });
         return NextResponse.json(updatedNote);
    }

    const note = await prisma.note.create({
      data: {
        title: title || "New Note",
        content,
        userId: user.id,
      }
    });

    return NextResponse.json(note);
  } catch (error) {
    return NextResponse.json({ message: "Error saving note" }, { status: 500 });
  }
}
