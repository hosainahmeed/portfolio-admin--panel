"use client"

import { useState, useEffect } from "react"

interface Theme {
  name: string
  mode: "light" | "dark"
  primaryColor: string
  secondaryColor: string
  backgroundColor: string
  textColor: string
  accentColor: string
  fontFamily: string
  borderRadius: string
  animationEnabled: boolean
  isActive: boolean
}

export default function ThemeManager() {
  const [themes, setThemes] = useState<Theme[]>([])
  const [newTheme, setNewTheme] = useState<Theme>({
    name: "",
    mode: "dark",
    primaryColor: "#00ff88",
    secondaryColor: "#ff006e",
    backgroundColor: "#0a0e27",
    textColor: "#e0e6ff",
    accentColor: "#00d9ff",
    fontFamily: "Geist",
    borderRadius: "0.5rem",
    animationEnabled: true,
    isActive: false,
  })

  useEffect(() => {
    const savedThemes = localStorage.getItem("themes")
    if (savedThemes) setThemes(JSON.parse(savedThemes))
  }, [])

  const handleAddTheme = () => {
    if (!newTheme.name.trim()) return
    const updatedThemes = [...themes, { ...newTheme, isActive: themes.length === 0 }]
    setThemes(updatedThemes)
    localStorage.setItem("themes", JSON.stringify(updatedThemes))
    setNewTheme({
      name: "",
      mode: "dark",
      primaryColor: "#00ff88",
      secondaryColor: "#ff006e",
      backgroundColor: "#0a0e27",
      textColor: "#e0e6ff",
      accentColor: "#00d9ff",
      fontFamily: "Geist",
      borderRadius: "0.5rem",
      animationEnabled: true,
      isActive: false,
    })
  }

  const handleDeleteTheme = (index: number) => {
    const updatedThemes = themes.filter((_, i) => i !== index)
    setThemes(updatedThemes)
    localStorage.setItem("themes", JSON.stringify(updatedThemes))
  }

  const handleSetActive = (index: number) => {
    const updatedThemes = themes.map((theme, i) => ({
      ...theme,
      isActive: i === index,
    }))
    setThemes(updatedThemes)
    localStorage.setItem("themes", JSON.stringify(updatedThemes))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">THEME MANAGEMENT</h1>
        <p className="text-foreground/60">Create and manage your portfolio themes</p>
      </div>

      {/* Create New Theme */}
      <div className="bg-card border border-border/50 rounded-md shadow-xl p-6 space-y-4">
        <h2 className="text-xl font-bold text-accent">CREATE NEW THEME</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Theme Name</label>
            <input
              type="text"
              value={newTheme.name}
              onChange={(e) => setNewTheme({ ...newTheme, name: e.target.value })}
              className="bg-input border border-border/50 text-foreground placeholder-foreground/40 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all w-full"
              placeholder="e.g., Neon Night"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Mode</label>
            <select
              value={newTheme.mode}
              onChange={(e) => setNewTheme({ ...newTheme, mode: e.target.value as "light" | "dark" })}
              className="bg-input border border-border/50 text-foreground placeholder-foreground/40 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all w-full"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Primary Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={newTheme.primaryColor}
                onChange={(e) => setNewTheme({ ...newTheme, primaryColor: e.target.value })}
                className="w-12 h-10 rounded-md cursor-pointer"
              />
              <input
                type="text"
                value={newTheme.primaryColor}
                onChange={(e) => setNewTheme({ ...newTheme, primaryColor: e.target.value })}
                className="bg-input border border-border/50 text-foreground placeholder-foreground/40 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all flex-1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Secondary Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={newTheme.secondaryColor}
                onChange={(e) => setNewTheme({ ...newTheme, secondaryColor: e.target.value })}
                className="w-12 h-10 rounded-md cursor-pointer"
              />
              <input
                type="text"
                value={newTheme.secondaryColor}
                onChange={(e) => setNewTheme({ ...newTheme, secondaryColor: e.target.value })}
                className="bg-input border border-border/50 text-foreground placeholder-foreground/40 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all flex-1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Accent Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={newTheme.accentColor}
                onChange={(e) => setNewTheme({ ...newTheme, accentColor: e.target.value })}
                className="w-12 h-10 rounded-md cursor-pointer"
              />
              <input
                type="text"
                value={newTheme.accentColor}
                onChange={(e) => setNewTheme({ ...newTheme, accentColor: e.target.value })}
                className="bg-input border border-border/50 text-foreground placeholder-foreground/40 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all flex-1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Font Family</label>
            <select
              value={newTheme.fontFamily}
              onChange={(e) => setNewTheme({ ...newTheme, fontFamily: e.target.value })}
              className="bg-input border border-border/50 text-foreground placeholder-foreground/40 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all w-full"
            >
              <option value="Geist">Geist</option>
              <option value="Geist Mono">Geist Mono</option>
              <option value="Arial">Arial</option>
              <option value="Verdana">Verdana</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Border Radius</label>
            <input
              type="text"
              value={newTheme.borderRadius}
              onChange={(e) => setNewTheme({ ...newTheme, borderRadius: e.target.value })}
              className="bg-input border border-border/50 text-foreground placeholder-foreground/40 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all w-full"
              placeholder="0.5rem"
            />
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={newTheme.animationEnabled}
                onChange={(e) => setNewTheme({ ...newTheme, animationEnabled: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium text-foreground/80">Enable Animations</span>
            </label>
          </div>
        </div>

        <button onClick={handleAddTheme} className="cyber-button bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/50 w-full">
          Create Theme
        </button>
      </div>

      {/* Themes List */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-accent">ACTIVE THEMES</h2>
        {themes.length === 0 ? (
          <div className="bg-card border border-border/50 rounded-md shadow-xl p-6 text-center text-foreground/60">No themes created yet</div>
        ) : (
          themes.map((theme, index) => (
            <div key={index} className="bg-card border border-border/50 rounded-md shadow-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="flex gap-2">
                  <div
                    className="w-8 h-8 rounded-md border border-border/50"
                    style={{ backgroundColor: theme.primaryColor }}
                  />
                  <div
                    className="w-8 h-8 rounded-md border border-border/50"
                    style={{ backgroundColor: theme.secondaryColor }}
                  />
                  <div
                    className="w-8 h-8 rounded-md border border-border/50"
                    style={{ backgroundColor: theme.accentColor }}
                  />
                </div>
                <div>
                  <p className="font-medium">{theme.name}</p>
                  <p className="text-sm text-foreground/60">{theme.mode} mode</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleSetActive(index)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                    theme.isActive
                      ? "bg-primary text-primary-foreground"
                      : "border border-primary/50 text-primary hover:bg-primary/10"
                  }`}
                >
                  {theme.isActive ? "✓ Active" : "Activate"}
                </button>
                <button
                  onClick={() => handleDeleteTheme(index)}
                  className="px-3 py-1 rounded-md text-sm font-medium border border-destructive/50 text-destructive hover:bg-destructive/10 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
