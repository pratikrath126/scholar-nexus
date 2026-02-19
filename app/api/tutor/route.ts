import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "arcee-ai/trinity-large-preview:free",
        "messages": [
          {
            "role": "system",
            "content": "You are ScholarNexus AI, a professional academic tutor. Help the student understand complex topics with clarity and depth."
          },
          {
            "role": "user",
            "content": prompt
          }
        ]
      })
    });

    const data = await response.json();
    return NextResponse.json({ answer: data.choices[0].message.content });
  } catch (error) {
    console.error("Tutor API Error:", error);
    return NextResponse.json({ error: "Failed to reach the AI tutor." }, { status: 500 });
  }
}
