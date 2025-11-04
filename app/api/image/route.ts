import { google } from '@ai-sdk/google'
import { generateText } from 'ai'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { prompt, image }: { prompt: string; image?: string } = await req.json()

  try {
    // If there's an image, use multimodal format
    if (image) {
      const result = await generateText({
        model: google('gemini-2.5-flash-image-preview'),
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                image: image,
              },
              {
                type: 'text',
                text: prompt,
              },
            ],
          },
        ],
      })

      return Response.json({
        text: result.text,
        usage: result.usage,
      })
    }

    // Text-only generation
    const result = await generateText({
      model: google('gemini-2.5-flash-image-preview'),
      prompt,
    })

    return Response.json({
      text: result.text,
      usage: result.usage,
    })
  } catch (error) {
    console.error('Image generation error:', error)

    // Return concise error message (full details in console)
    const errorMessage = error instanceof Error
      ? error.message.split('\n')[0]
      : 'Unknown error'

    return Response.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
