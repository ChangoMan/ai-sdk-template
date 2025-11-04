'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ImageIcon, Loader2, Sparkles, X } from 'lucide-react'
import { useState } from 'react'

type Usage = {
  promptTokens?: number
  completionTokens?: number
  totalTokens?: number
}

export function ImageGenerator() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ text: string; usage?: Usage } | null>(
    null
  )
  const [error, setError] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const clearImage = () => {
    setImageFile(null)
    setImagePreview(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      let imageBase64 = null
      if (imageFile) {
        const reader = new FileReader()
        imageBase64 = await new Promise<string>((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result as string)
          reader.onerror = reject
          reader.readAsDataURL(imageFile)
        })
      }

      const response = await fetch('/api/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          image: imageBase64,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image')
      }

      setResult(data)
    } catch (err) {
      console.error('Client error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          Image Generation
        </h1>
      </div>
      <div className="max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="mt-16 space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="image-upload">Upload Image (optional)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="flex-1"
              />
              {imagePreview && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={clearImage}
                >
                  <X className="size-4" />
                </Button>
              )}
            </div>
            {imagePreview && (
              <div className="relative rounded-lg border overflow-hidden">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-auto max-h-64 object-contain"
                />
              </div>
            )}
          </div>

          {/* Prompt Input */}
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to do with the image..."
            rows={4}
          />

          <Button type="submit" disabled={!prompt.trim() || loading}>
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                {imageFile ? 'Processing...' : 'Generating...'}
              </>
            ) : (
              <>
                {imageFile ? (
                  <>
                    <ImageIcon className="size-4" />
                    Edit Image
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4" />
                    Generate Image
                  </>
                )}
              </>
            )}
          </Button>
        </form>

        {error && (
          <div className="mt-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive text-sm">
            {error}
          </div>
        )}

        {result && (
          <div className="space-y-4 rounded-lg border bg-card p-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Result</h3>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {result.text}
              </div>
            </div>
            {result.usage && (
              <div className="text-xs text-muted-foreground">
                Tokens: {result.usage.totalTokens}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
