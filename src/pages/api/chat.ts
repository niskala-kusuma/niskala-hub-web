import type { APIRoute } from 'astro';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const { message } = await request.json();
  if (!message) {
    return new Response(JSON.stringify({ error: 'No message provided' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Panggil Gemini
  const genAI = new GoogleGenerativeAI(import.meta.env.GENERIC_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    safetySettings: [
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
    ],
  });
  const stream = await model.generateContentStream({
    contents: [{ role: 'user', parts: [{ text: message }] }],
  });

  let buffer = '';
  for await (const part of stream.stream) {
    buffer += part.text();
  }

  return new Response(JSON.stringify({ reply: buffer }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
