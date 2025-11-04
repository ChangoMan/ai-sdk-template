import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'AI SDK Template'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, #333 2%, transparent 0%), radial-gradient(circle at 75px 75px, #333 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
          }}
        >
          <h1
            style={{
              fontSize: 80,
              fontWeight: 700,
              background: 'linear-gradient(to bottom right, #fff 30%, #888)',
              backgroundClip: 'text',
              color: 'transparent',
              margin: 0,
              padding: 0,
              lineHeight: 1.2,
            }}
          >
            AI SDK Template
          </h1>
          <p
            style={{
              fontSize: 32,
              color: '#aaa',
              margin: 0,
              padding: 0,
              textAlign: 'center',
              maxWidth: 800,
            }}
          >
            Build your next AI powered application
          </p>
          <div
            style={{
              display: 'flex',
              gap: 16,
              marginTop: 20,
              fontSize: 20,
              color: '#666',
            }}
          >
            <span>Next.js</span>
            <span>•</span>
            <span>Vercel AI SDK</span>
            <span>•</span>
            <span>shadcn/ui</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
