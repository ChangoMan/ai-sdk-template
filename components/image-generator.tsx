'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from '@/components/ui/shadcn-io/dropzone'
import { Textarea } from '@/components/ui/textarea'
import { ImageIcon, Loader2, Sparkles, X } from 'lucide-react'
import { useState } from 'react'

type Result = {
  text?: string
  imageUrl?: string
}

export function ImageGenerator() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Result | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageDrop = (files: File[]) => {
    if (files.length > 0) {
      setImageFiles(files)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(files[0])
    }
  }

  const clearImage = () => {
    setImageFiles([])
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
      if (imageFiles.length > 0) {
        const reader = new FileReader()
        imageBase64 = await new Promise<string>((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result as string)
          reader.onerror = reject
          reader.readAsDataURL(imageFiles[0])
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
            <div className="flex items-center justify-between">
              <Label>Upload Image (optional)</Label>
              {imageFiles.length > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearImage}
                >
                  <X className="mr-1 size-4" />
                  Clear
                </Button>
              )}
            </div>
            <Dropzone
              accept={{ 'image/*': [] }}
              maxFiles={1}
              onDrop={handleImageDrop}
              src={imageFiles}
            >
              <DropzoneEmptyState />
              <DropzoneContent />
            </Dropzone>
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
                {imageFiles.length > 0 ? 'Processing...' : 'Generating...'}
              </>
            ) : (
              <>
                {imageFiles.length > 0 ? (
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
          <div className="mt-12 space-y-4 rounded-lg border bg-card p-4">
            {result.imageUrl && (
              <div className="space-y-2">
                <h3 className="font-semibold">Generated Image</h3>
                <div className="relative rounded-lg border overflow-hidden bg-muted">
                  <img
                    src={result.imageUrl}
                    alt="Generated"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            )}
            {result.text && (
              <div className="space-y-2">
                <h3 className="font-semibold">Description</h3>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {result.text}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
