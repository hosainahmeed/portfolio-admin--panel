"use client"

import type React from "react"

import { useState } from "react"
import { Menu, X } from "lucide-react"

interface AdminLayoutProps {
  activeSection: string
  onSectionChange: (section: any) => void
  children: React.ReactNode
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "profile", label: "Profile", icon: "👤" },
  { id: "theme", label: "Theme", icon: "🎨" },
  { id: "skills", label: "Skills", icon: "⚡" },
  { id: "projects", label: "Projects", icon: "🚀" },
  { id: "social", label: "Social Links", icon: "🔗" },
  { id: "categories", label: "Categories", icon: "📁" },
  { id: "messages", label: "Messages", icon: "💬" },
  { id: "users", label: "Users", icon: "👥" },
]

export default function AdminLayout({ activeSection, onSectionChange, children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-card border-r border-border/50 transition-all duration-300 flex flex-col overflow-y-auto`}
      >
        {/* Header */}
        <div className="p-4 border-b border-border/50 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground font-bold">
                ◆
              </div>
              <span className="font-bold text-primary">ADMIN</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-border/50 rounded-md transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 ${
                activeSection === item.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/50"
                  : "text-foreground hover:bg-border/50"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border/50 text-xs text-foreground/60">
          {sidebarOpen && <p>© 2025 Admin Panel</p>}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">{children}</div>
      </main>
    </div>
  )
}
