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

    const plans = await prisma.plan.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 1
    });
    return NextResponse.json(plans);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching plans" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const { goals, content } = await req.json();

    const existingPlan = await prisma.plan.findFirst({
        where: { userId: user.id }
    });

    if (existingPlan) {
        const updatedPlan = await prisma.plan.update({
             where: { id: existingPlan.id },
             data: { goals, content }
         });
         return NextResponse.json(updatedPlan);
    }

    const plan = await prisma.plan.create({
      data: {
        goals,
        content,
        userId: user.id,
      }
    });

    return NextResponse.json(plan);
  } catch (error) {
    return NextResponse.json({ message: "Error saving plan" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    await prisma.plan.deleteMany({
      where: { userId: user.id },
    });

    return NextResponse.json({ message: "Plans deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting plans" }, { status: 500 });
  }
}
