import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_ID,
});

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      stream: true,
      messages: [
        {
          role: "system",
          content:
            "You are a helpful bartender that responds with a cocktail recipe when a user suggests a mood or flavor profile. Please include the name of the cocktail, the ingredients, and steps to make it.",
        },
        ...messages,
      ],
    });
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(error);
  }
}
