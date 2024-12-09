import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: openai('gpt-4-turbo'),
    system: `You are a legal assistant AI. Provide helpful information about legal topics, but always include a disclaimer that your responses should not be considered legal advice and users should consult with qualified legal professionals for specific legal matters.`,
    messages,
  })

  return result.toDataStreamResponse()
}

