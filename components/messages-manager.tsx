"use client"

import { useState, useEffect } from "react"
import { Trash2, Mail } from "lucide-react"

interface Message {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  timestamp: string
}

export default function MessagesManager() {
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  useEffect(() => {
    const savedMessages = localStorage.getItem("messages")
    if (savedMessages) setMessages(JSON.parse(savedMessages))
  }, [])

  const handleDeleteMessage = (id: string) => {
    const updatedMessages = messages.filter((msg) => msg.id !== id)
    setMessages(updatedMessages)
    localStorage.setItem("messages", JSON.stringify(updatedMessages))
    setSelectedMessage(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">MESSAGES MANAGEMENT</h1>
        <p className="text-foreground/60">View and manage contact form submissions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1">
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-accent">INBOX</h2>
            {messages.length === 0 ? (
              <div className="bg-card border border-border/50 rounded-md shadow-xl p-6 text-center text-foreground/60">No messages yet</div>
            ) : (
              messages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`w-full text-left bg-card border border-border/50 rounded-md shadow-xl p-4 transition-all ${
                    selectedMessage?.id === msg.id ? "border-primary/50 bg-primary/10" : "hover:border-primary/30"
                  }`}
                >
                  <p className="font-medium text-sm truncate">{msg.name}</p>
                  <p className="text-xs text-foreground/60 truncate">{msg.subject}</p>
                  <p className="text-xs text-foreground/40 mt-1">{new Date(msg.timestamp).toLocaleDateString()}</p>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Message Details */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <div className="bg-card border border-border/50 rounded-md shadow-xl p-6 space-y-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-primary">{selectedMessage.subject}</h2>
                  <p className="text-foreground/60 text-sm">From: {selectedMessage.name}</p>
                </div>
                <button
                  onClick={() => handleDeleteMessage(selectedMessage.id)}
                  className="p-2 hover:bg-destructive/10 rounded-md transition-colors text-destructive"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-border/50">
                <div>
                  <p className="text-foreground/60 text-sm mb-1">Email</p>
                  <p className="font-medium">{selectedMessage.email}</p>
                </div>
                <div>
                  <p className="text-foreground/60 text-sm mb-1">Phone</p>
                  <p className="font-medium">{selectedMessage.phone}</p>
                </div>
              </div>

              <div>
                <p className="text-foreground/60 text-sm mb-2">Message</p>
                <p className="text-foreground/80 leading-relaxed">{selectedMessage.message}</p>
              </div>

              <div className="pt-4 border-t border-border/50">
                <p className="text-xs text-foreground/40">
                  Received: {new Date(selectedMessage.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-card border border-border/50 rounded-md shadow-xl p-6 flex items-center justify-center h-full min-h-96 text-center">
              <div>
                <Mail size={48} className="mx-auto mb-4 text-foreground/40" />
                <p className="text-foreground/60">Select a message to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
