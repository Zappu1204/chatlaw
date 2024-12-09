'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { ChatInterface } from '@/components/chat-interface'
import { Chat, User } from '@/types/chat'
import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'

export default function Home() {
  const { theme, setTheme } = useTheme()
  const [currentChat, setCurrentChat] = useState<Chat | null>(null)
  const [chats, setChats] = useState<Chat[]>([])
  
  // Mock user - replace with your auth solution
  const user: User = {
    id: '1',
    name: 'Suvigya',
    email: 'suvigya@example.com',
  }

  const handleNewChat = () => {
    const newChat: Chat = {
      id: Math.random().toString(),
      title: 'New Conversation',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setChats([newChat, ...chats])
    setCurrentChat(newChat)
  }

  const handleLogout = () => {
    // Implement your logout logic here
    console.log('Logout clicked')
  }

  return (
    <div className="flex h-screen">
      <Sidebar
        user={user}
        chats={chats}
        onNewChat={handleNewChat}
        onSelectChat={setCurrentChat}
        onLogout={handleLogout}
      />
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold">Legal Assistant</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </div>
        {currentChat ? (
          <ChatInterface
            chatId={currentChat.id}
            initialMessages={currentChat.messages}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select a chat or start a new conversation
          </div>
        )}
      </div>
    </div>
  )
}

