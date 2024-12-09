'use client'

// import { useState } from 'react'
import { useChat } from 'ai/react'
import { Message } from '@/types/chat'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Paperclip, Smile, Send } from 'lucide-react'

interface ChatInterfaceProps {
  chatId: string
  initialMessages?: Message[]
}

export function ChatInterface({ chatId, initialMessages = [] }: ChatInterfaceProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    id: chatId,
    initialMessages,
    api: '/api/chat',
  })

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4 dark:bg-slate-800">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground dark:bg-blue-700 dark:text-white'
                    : 'bg-muted dark:bg-slate-700 dark:text-white'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="text-muted-foreground text-sm">AI is typing...</div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t p-4 dark:bg-slate-800">
        <form onSubmit={handleSubmit} className="flex gap-4">
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            className="dark:text-white dark:hover:bg-slate-700 transition-colors group"
          >
            <span className='dark:fill-current'>
              <Paperclip className="h-5 w-5" />
            </span>
          </Button>
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Type a message..."
            className="flex-1 dark:bg-slate-700 dark:text-white dark:placeholder-gray-400"
          />
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            className="dark:text-white dark:hover:bg-slate-700 transition-colors group"
          >
            <span className='dark:fill-current'>
              <Smile className="h-5 w-5" />
            </span>
          </Button>
          <Button 
            type="submit" 
            size="icon" 
            disabled={isLoading} 
            className="dark:bg-blue-800 dark:text-white dark:hover:bg-blue-700"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}

