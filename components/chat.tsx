'use client'

import { SparklesIcon } from '@/components/icons'
import { useChat } from '@ai-sdk/react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDownIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export function Chat() {
  const [input, setInput] = useState('')
  const { messages, sendMessage, status } = useChat()
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
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
                      <SparklesIcon size={14} />
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
                            {part.text}
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
                      <SparklesIcon size={14} />
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
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault()
            sendMessage({ text: input })
            setInput('')
          }}
        >
          <input
            className="dark:bg-zinc-900 bottom-0 w-full p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
            value={input}
            placeholder="Say something..."
            onChange={(e) => setInput(e.currentTarget.value)}
          />
        </form>
      </div>
    </div>
  )
}
