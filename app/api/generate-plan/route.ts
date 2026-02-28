import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { goals } = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "stepfun/step-3.5-flash:free",
        "messages": [
          {
            "role": "system",
            "content": "You are a professional study planner. The user will provide their study goals and timeline. Generate a detailed, step-by-step study plan to help them achieve these goals. Make the plan structured and actionable."
          },
          {
            "role": "user",
            "content": `My study goals are: ${goals}`
          }
        ]
      })
    });

    const data = await response.json();
    return NextResponse.json({ plan: data.choices[0].message.content });
  } catch (error) {
    console.error("Planner API Error:", error);
    return NextResponse.json({ error: "Failed to generate study plan." }, { status: 500 });
  }
}
