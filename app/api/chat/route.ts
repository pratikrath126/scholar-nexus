import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// Define the system prompt
const systemPrompt = {
  role: 'system',
  content: 'You are ScholarNexus AI Tutor, a helpful and academic assistant for students.'
};

// API route handler
export async function POST(req: NextRequest) {
  // Check for API key
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Missing OpenRouter API key' },
      { status: 500 }
    );
  }

  try {
    // Parse request body
    const body = await req.json();
    const { messages } = body;

    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request. `messages` must be an array.' },
        { status: 400 }
      );
    }

    // Include the system prompt
    const payload = {
      model: 'arcee-ai/trinity-large-preview:free',
      messages: [systemPrompt, ...messages],
      stream: true // Request streaming if supported
    };

    // Send the request to OpenRouter API
    const response = await fetch('https://api.openrouter.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    // If the response supports streaming
    if (response.body) {
      return new Response(response.body, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        }
      });
    }

    // Otherwise, return the complete JSON response
    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error in OpenRouter Chat API:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}