"use client"

import { useEffect, useState } from "react"

interface Stats {
  projects: number
  skills: number
  messages: number
  social: number
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({ projects: 0, skills: 0, messages: 0, social: 0 })

  useEffect(() => {
    const projects = JSON.parse(localStorage.getItem("projects") || "[]")
    const skills = JSON.parse(localStorage.getItem("skills") || "[]")
    const messages = JSON.parse(localStorage.getItem("messages") || "[]")
    const social = JSON.parse(localStorage.getItem("social") || "[]")

    setStats({
      projects: projects.length,
      skills: skills.length,
      messages: messages.length,
      social: social.length,
    })
  }, [])

  const statCards = [
    { label: "Projects", value: stats.projects, color: "primary", icon: "🚀" },
    { label: "Skills", value: stats.skills, color: "accent", icon: "⚡" },
    { label: "Messages", value: stats.messages, color: "secondary", icon: "💬" },
    { label: "Social Links", value: stats.social, color: "primary", icon: "🔗" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-primary mb-2">ADMIN CONTROL CENTER</h1>
        <p className="text-foreground/60">Welcome to your portfolio management system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="bg-card border border-border/50 rounded-md shadow-xl p-6 hover:border-primary/50 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{card.icon}</span>
              <div className={`w-12 h-12 rounded-md bg-${card.color}/10 flex items-center justify-center`}>
                <span className={`text-${card.color} font-bold`}>{card.value}</span>
              </div>
            </div>
            <p className="text-foreground/60 text-sm">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Info */}
      <div className="bg-card border border-border/50 rounded-md shadow-xl p-6">
        <h2 className="text-xl font-bold text-primary mb-4">SYSTEM STATUS</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-foreground/60">Database Status</span>
            <span className="text-primary">● ONLINE</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-foreground/60">Local Storage</span>
            <span className="text-primary">● ACTIVE</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-foreground/60">Last Updated</span>
            <span className="text-accent">{new Date().toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
