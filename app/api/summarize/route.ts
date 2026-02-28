import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text, type } = await req.json();

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
            "content": `You are an expert summarizer. The user will provide text. Your task is to extract the key points and provide a comprehensive yet concise summary. Format the summary as a structured set of bullet points, or paragraphs, based on the requested type: ${type || 'bullet points'}. Be clear and academically rigorous.`
          },
          {
            "role": "user",
            "content": text
          }
        ]
      })
    });

    const data = await response.json();
    return NextResponse.json({ summary: data.choices[0].message.content });
  } catch (error) {
    console.error("Summarize API Error:", error);
    return NextResponse.json({ error: "Failed to summarize text." }, { status: 500 });
  }
}
