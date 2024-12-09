'use client'

import { Plus, History, LogOut, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useState } from 'react'
import { Chat, User } from '@/types/chat'
import { cn } from '@/lib/utils'

interface SidebarProps {
  user: User
  chats: Chat[]
  onNewChat: () => void
  onSelectChat: (chat: Chat) => void
  onLogout: () => void
}

export function Sidebar({ user, chats, onNewChat, onSelectChat, onLogout }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className={cn(
      "flex flex-col h-full bg-background border-r transition-all",
      isOpen ? "w-64" : "w-16"
    )}>
      <div className="p-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsOpen(!isOpen)}
          className="text-foreground hover:text-foreground dark:text-white dark:hover:text-white"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 px-4 mb-2 text-foreground dark:text-white"
          onClick={onNewChat}
        >
          <Plus className="h-5 w-5" />
          {isOpen && "New Chat"}
        </Button>
        
        <div className="space-y-1 px-2">
          {chats.map((chat) => (
            <Button
              key={chat.id}
              variant="ghost"
              className="w-full justify-start gap-2 px-4 text-foreground dark:text-white"
              onClick={() => onSelectChat(chat)}
            >
              <History className="h-5 w-5" />
              {isOpen && (chat.title || "New Conversation")}
            </Button>
          ))}
        </div>
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={user.image} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          {isOpen && (
            <div className="flex-1">
              <p className="text-sm font-medium dark:text-white">John Doe</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          )}
          {isOpen && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onLogout}
              className="text-foreground hover:text-foreground dark:text-white dark:hover:text-white"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

