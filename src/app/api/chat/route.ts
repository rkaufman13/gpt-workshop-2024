import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { NextRequest, NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_ID,
});

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  try {
    const response = await openai.chat.completions.create({
        model: 'gpt-4',
        stream: true,
        messages: [
          {
            role: "system",
            content: "You are a bartender. Your job is to recommend a cocktail based on a user's description. A user may prompt you with a mood, feeling, or emotion."
          },
          ...messages,
        ],
      });
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream)

  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(error);
  }
}
