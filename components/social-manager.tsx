"use client"

import { useState, useEffect } from "react"
import { Trash2, Plus } from "lucide-react"

interface Social {
  id: string
  name: string
  url: string
}

export default function SocialManager() {
  const [socials, setSocials] = useState<Social[]>([])
  const [newSocial, setNewSocial] = useState<Social>({
    id: "",
    name: "",
    url: "",
  })

  useEffect(() => {
    const savedSocials = localStorage.getItem("social")
    if (savedSocials) setSocials(JSON.parse(savedSocials))
  }, [])

  const handleAddSocial = () => {
    if (!newSocial.name.trim() || !newSocial.url.trim()) return
    const social = { ...newSocial, id: Date.now().toString() }
    const updatedSocials = [...socials, social]
    setSocials(updatedSocials)
    localStorage.setItem("social", JSON.stringify(updatedSocials))
    setNewSocial({ id: "", name: "", url: "" })
  }

  const handleDeleteSocial = (id: string) => {
    const updatedSocials = socials.filter((social) => social.id !== id)
    setSocials(updatedSocials)
    localStorage.setItem("social", JSON.stringify(updatedSocials))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">SOCIAL LINKS MANAGEMENT</h1>
        <p className="text-foreground/60">Manage your social media profiles</p>
      </div>

      {/* Add New Social */}
      <div className="bg-card border border-border/50 rounded-md shadow-xl p-6 space-y-4">
        <h2 className="text-xl font-bold text-accent">ADD SOCIAL LINK</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Platform Name</label>
            <input
              type="text"
              value={newSocial.name}
              onChange={(e) => setNewSocial({ ...newSocial, name: e.target.value })}
              className="bg-input border border-border/50 text-foreground placeholder-foreground/40 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all w-full"
              placeholder="e.g., GitHub"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Profile URL</label>
            <input
              type="url"
              value={newSocial.url}
              onChange={(e) => setNewSocial({ ...newSocial, url: e.target.value })}
              className="bg-input border border-border/50 text-foreground placeholder-foreground/40 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all w-full"
              placeholder="https://..."
            />
          </div>
        </div>

        <button
          onClick={handleAddSocial}
          className="cyber-button bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/50 w-full flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Add Social Link
        </button>
      </div>

      {/* Social Links List */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-accent">YOUR SOCIAL LINKS</h2>
        {socials.length === 0 ? (
          <div className="bg-card border border-border/50 rounded-md shadow-xl p-6 text-center text-foreground/60">No social links added yet</div>
        ) : (
          socials.map((social) => (
            <div key={social.id} className="bg-card border border-border/50 rounded-md shadow-xl p-4 flex items-center justify-between">
              <div>
                <p className="font-medium">{social.name}</p>
                <p className="text-sm text-foreground/60 truncate">{social.url}</p>
              </div>
              <button
                onClick={() => handleDeleteSocial(social.id)}
                className="p-2 hover:bg-destructive/10 rounded-md transition-colors text-destructive"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
