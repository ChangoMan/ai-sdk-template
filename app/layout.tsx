import { Header } from '@/components/header'
import { ThemeProvider } from '@/components/theme-provider'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'AI SDK Template',
  description: 'Everything you need to build your next AI powered application',
  metadataBase: new URL('https://aisdk.buildtavern.com'),
  openGraph: {
    title: 'AI SDK Template',
    description:
      'Everything you need to build your next AI powered application',
    url: 'https://aisdk.buildtavern.com',
    siteName: 'AI SDK Template',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI SDK Template',
    description:
      'Everything you need to build your next AI powered application',
    creator: '@hunterhchang',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
