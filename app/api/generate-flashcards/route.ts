import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

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
            "content": "You are a helpful flashcard generator. Given a topic, generate 5 key flashcards. Respond ONLY with a valid JSON array of objects, where each object has 'front' (the question) and 'back' (the answer) keys. Do not include markdown formatting or extra text."
          },
          {
            "role": "user",
            "content": `Generate flashcards for: ${topic}`
          }
        ]
      })
    });

    const data = await response.json();
    let flashcards;
    try {
        const rawContent = data.choices[0].message.content.replace(/```json/g, '').replace(/```/g, '').trim();
        flashcards = JSON.parse(rawContent);
    } catch(e) {
        return NextResponse.json({ error: "Failed to parse AI response into flashcards.", raw: data.choices[0].message.content }, { status: 500 });
    }

    return NextResponse.json({ flashcards });
  } catch (error) {
    console.error("Flashcards API Error:", error);
    return NextResponse.json({ error: "Failed to generate flashcards." }, { status: 500 });
  }
}
