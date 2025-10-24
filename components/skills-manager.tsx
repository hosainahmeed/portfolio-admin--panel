"use client"

import { useState, useEffect } from "react"
import { Trash2, Plus } from "lucide-react"

interface Skill {
  id: string
  name: string
  level: number
  icon: string
  category: string
  percentage: number
}

export default function SkillsManager() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState<Skill>({
    id: "",
    name: "",
    level: 5,
    icon: "⚡",
    category: "",
    percentage: 80,
  })

  useEffect(() => {
    const savedSkills = localStorage.getItem("skills")
    const savedCategories = localStorage.getItem("categories")
    if (savedSkills) setSkills(JSON.parse(savedSkills))
    if (savedCategories) setCategories(JSON.parse(savedCategories))
  }, [])

  const handleAddSkill = () => {
    if (!newSkill.name.trim() || !newSkill.category.trim()) return
    const skill = { ...newSkill, id: Date.now().toString() }
    const updatedSkills = [...skills, skill]
    setSkills(updatedSkills)
    localStorage.setItem("skills", JSON.stringify(updatedSkills))
    setNewSkill({
      id: "",
      name: "",
      level: 5,
      icon: "⚡",
      category: "",
      percentage: 80,
    })
  }

  const handleDeleteSkill = (id: string) => {
    const updatedSkills = skills.filter((skill) => skill.id !== id)
    setSkills(updatedSkills)
    localStorage.setItem("skills", JSON.stringify(updatedSkills))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">SKILLS MANAGEMENT</h1>
        <p className="text-foreground/60">Manage your professional skills and expertise</p>
      </div>

      {/* Add New Skill */}
      <div className="bg-card border border-border/50 rounded-md shadow-xl p-6 space-y-4">
        <h2 className="text-xl font-bold text-accent">ADD NEW SKILL</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Skill Name</label>
            <input
              type="text"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              className="bg-input border border-border/50 text-foreground placeholder-foreground/40 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all w-full"
              placeholder="e.g., React"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Category</label>
            <input
              type="text"
              value={newSkill.category}
              onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
              className="bg-input border border-border/50 text-foreground placeholder-foreground/40 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all w-full"
              placeholder="e.g., Frontend"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Icon</label>
            <input
              type="text"
              value={newSkill.icon}
              onChange={(e) => setNewSkill({ ...newSkill, icon: e.target.value })}
              className="bg-input border border-border/50 text-foreground placeholder-foreground/40 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all w-full"
              placeholder="⚡"
              maxLength={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Level (1-10)</label>
            <input
              type="number"
              min="1"
              max="10"
              value={newSkill.level}
              onChange={(e) => setNewSkill({ ...newSkill, level: Number.parseInt(e.target.value) })}
              className="bg-input border border-border/50 text-foreground placeholder-foreground/40 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Proficiency %</label>
            <input
              type="number"
              min="0"
              max="100"
              value={newSkill.percentage}
              onChange={(e) => setNewSkill({ ...newSkill, percentage: Number.parseInt(e.target.value) })}
              className="bg-input border border-border/50 text-foreground placeholder-foreground/40 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all w-full"
            />
          </div>
        </div>

        <button onClick={handleAddSkill} className="cyber-button bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/50 w-full flex items-center justify-center gap-2">
          <Plus size={18} />
          Add Skill
        </button>
      </div>

      {/* Skills List */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-accent">YOUR SKILLS</h2>
        {skills.length === 0 ? (
          <div className="bg-card border border-border/50 rounded-md shadow-xl p-6 text-center text-foreground/60">No skills added yet</div>
        ) : (
          skills.map((skill) => (
            <div key={skill.id} className="bg-card border border-border/50 rounded-md shadow-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{skill.icon}</span>
                  <div>
                    <p className="font-medium">{skill.name}</p>
                    <p className="text-sm text-foreground/60">{skill.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteSkill(skill.id)}
                  className="p-2 hover:bg-destructive/10 rounded-md transition-colors text-destructive"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60">Level: {skill.level}/10</span>
                  <span className="text-primary">{skill.percentage}%</span>
                </div>
                <div className="w-full bg-border/50 rounded-full h-2 overflow-hidden">
                  <div className="bg-primary h-full transition-all" style={{ width: `${skill.percentage}%` }} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
