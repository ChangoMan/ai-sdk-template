import { Container } from '@/components/container'
import { ImageGenerator } from '@/components/image-generator'

export default function ImagePage() {
  return (
    <main className="mt-6 mb-24">
      <Container>
        <ImageGenerator />
      </Container>
    </main>
  )
}
