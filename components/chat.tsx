'use client'

import { Response } from '@/components/response'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useChat } from '@ai-sdk/react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDownIcon, ArrowUpIcon, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export function Chat() {
  const [input, setInput] = useState('')
  const { messages, sendMessage, status } = useChat()
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [isAtBottom, setIsAtBottom] = useState(true)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (status === 'submitted') {
      requestAnimationFrame(() => {
        const container = messagesContainerRef.current
        if (container) {
          container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth',
          })
        }
      })
    }
  }, [status, messages])

  // Check if user is at bottom of scroll
  useEffect(() => {
    const container = messagesContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      const atBottom = scrollHeight - scrollTop - clientHeight < 100
      setIsAtBottom(atBottom)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToBottom = () => {
    messagesContainerRef.current?.scrollTo({
      top: messagesContainerRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      sendMessage({ text: input })
      setInput('')
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = '44px'
      }
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Messages Container */}
      <div
        ref={messagesContainerRef}
        className="flex-1"
        style={{ overflowAnchor: 'none' }}
      >
        <div className="mx-auto flex min-w-0 w-full flex-col gap-4 md:gap-6">
          <div className="flex flex-col gap-4 px-2 py-4 md:gap-6 md:px-4">
            {/* Greeting when no messages */}
            {messages.length === 0 && (
              <div className="mx-auto mt-4 flex size-full max-w-3xl flex-col justify-center px-4 md:mt-16 md:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="font-semibold text-xl md:text-2xl"
                >
                  Hello there!
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-xl text-zinc-500 md:text-2xl"
                >
                  How can I help you today?
                </motion.div>
              </div>
            )}

            {/* Messages */}
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="group/message w-full"
                data-role={message.role}
              >
                <div
                  className={`flex w-full items-start gap-2 md:gap-3 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {/* AI Avatar */}
                  {message.role === 'assistant' && (
                    <div className="-mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-background ring-1 ring-border">
                      <Sparkles className="size-3.5" />
                    </div>
                  )}

                  {/* Message Content */}
                  <div
                    className={
                      message.role === 'user'
                        ? 'max-w-[calc(100%-2.5rem)] sm:max-w-[min(fit-content,80%)]'
                        : 'w-full'
                    }
                  >
                    {message.parts.map((part, i) => {
                      if (part.type === 'text') {
                        return (
                          <div
                            key={`${message.id}-${i}`}
                            className={
                              message.role === 'user'
                                ? 'w-fit break-words rounded-2xl px-3 py-2 text-right text-white'
                                : 'bg-transparent px-0 py-0 text-left'
                            }
                            style={
                              message.role === 'user'
                                ? { backgroundColor: '#006cff' }
                                : undefined
                            }
                          >
                            {message.role === 'assistant' ? (
                              <Response>{part.text}</Response>
                            ) : (
                              part.text
                            )}
                          </div>
                        )
                      }
                      return null
                    })}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Thinking Message */}
            <AnimatePresence mode="wait">
              {status === 'submitted' && (
                <motion.div
                  key="thinking"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.5 } }}
                  transition={{ duration: 0.2 }}
                  className="group/message w-full"
                  data-role="assistant"
                >
                  <div className="flex items-start justify-start gap-3">
                    <div className="-mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-background ring-1 ring-border">
                      <Sparkles className="size-3.5" />
                    </div>
                    <div className="flex w-full flex-col gap-2 md:gap-4">
                      <div className="p-0 text-muted-foreground text-sm">
                        Thinking...
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div
              className="min-h-[24px] min-w-[24px] shrink-0"
              ref={messagesEndRef}
            />
          </div>
        </div>
      </div>

      {/* Scroll to Bottom Button */}
      {!isAtBottom && (
        <button
          aria-label="Scroll to bottom"
          className="absolute bottom-40 left-1/2 z-10 -translate-x-1/2 rounded-full border bg-background p-2 shadow-lg transition-colors hover:bg-muted"
          onClick={scrollToBottom}
          type="button"
        >
          <ArrowDownIcon className="size-4" />
        </button>
      )}

      {/* Input Form */}
      <div className="sticky bottom-0 z-1 mx-auto flex w-full gap-2 border-t-0 bg-background px-2 pb-3 md:px-4 md:pb-4">
        <form
          className="w-full overflow-hidden rounded-xl border border-border bg-background p-3 shadow-xs transition-all duration-200 hover:border-muted-foreground/50 focus-within:border-border"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-row items-start gap-1 sm:gap-2">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  // Don't submit if IME composition is in progress
                  if (e.nativeEvent.isComposing) {
                    return
                  }

                  if (e.shiftKey) {
                    // Allow newline
                    return
                  }

                  // Submit on Enter (without Shift)
                  e.preventDefault()
                  const form = e.currentTarget.form
                  if (form) {
                    form.requestSubmit()
                  }
                }
              }}
              placeholder="Send a message..."
              className="min-h-[44px] max-h-[200px] grow resize-none border-0 bg-transparent p-2 text-sm outline-none ring-0 [-ms-overflow-style:none] [scrollbar-width:none] placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 [&::-webkit-scrollbar]:hidden"
              rows={1}
            />
          </div>
          <div className="flex items-center justify-between p-0">
            <div className="flex items-center gap-0 sm:gap-0.5">
              {/* Left side tools - empty for now */}
            </div>
            <Button
              type="submit"
              disabled={!input.trim()}
              className="size-8 rounded-full bg-primary text-primary-foreground transition-colors duration-200 hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground"
            >
              <ArrowUpIcon className="size-3.5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
