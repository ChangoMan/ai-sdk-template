import { google } from '@ai-sdk/google'
import { generateText } from 'ai'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { prompt, image }: { prompt: string; image?: string } = await req.json()

  try {
    // If there's an image, use multimodal format for editing
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

      // Extract generated images from result.files
      const imageFiles = result.files?.filter((f) =>
        f.mediaType.startsWith('image/')
      )

      const imageUrls = imageFiles?.map((file) => {
        // Use base64 property directly
        return `data:${file.mediaType};base64,${file.base64}`
      })

      return Response.json({
        text: result.text || undefined,
        imageUrl: imageUrls?.[0],
      })
    }

    // Text-to-image generation
    const result = await generateText({
      model: google('gemini-2.5-flash-image-preview'),
      prompt,
    })

    // Extract generated images from result.files
    const imageFiles = result.files?.filter((f) =>
      f.mediaType.startsWith('image/')
    )

    const imageUrls = imageFiles?.map((file) => {
      // Use base64 property directly
      return `data:${file.mediaType};base64,${file.base64}`
    })

    return Response.json({
      text: result.text || undefined,
      imageUrl: imageUrls?.[0],
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
