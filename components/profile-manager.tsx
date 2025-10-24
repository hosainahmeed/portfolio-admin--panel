"use client"

import { useState, useEffect } from "react"
import { Save } from "lucide-react"

interface Profile {
  name: string
  title: string
  bio: string
  profileImage: string
  email: string
  phone: string
  location: string
  resumeLink: string
}

interface About {
  description: string
}

export default function ProfileManager() {
  const [profile, setProfile] = useState<Profile>({
    name: "",
    title: "",
    bio: "",
    profileImage: "",
    email: "",
    phone: "",
    location: "",
    resumeLink: "",
  })

  const [about, setAbout] = useState<About>({ description: "" })
  const [activeTab, setActiveTab] = useState<"profile" | "about">("profile")
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const savedProfile = localStorage.getItem("profile")
    const savedAbout = localStorage.getItem("about")
    if (savedProfile) setProfile(JSON.parse(savedProfile))
    if (savedAbout) setAbout(JSON.parse(savedAbout))
  }, [])

  const handleProfileChange = (field: keyof Profile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const handleAboutChange = (value: string) => {
    setAbout({ description: value })
  }

  const handleSave = () => {
    localStorage.setItem("profile", JSON.stringify(profile))
    localStorage.setItem("about", JSON.stringify(about))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">PROFILE MANAGEMENT</h1>
        <p className="text-foreground/60">Manage your portfolio profile and about section</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border/50">
        {(["profile", "about"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium transition-all ${
              activeTab === tab ? "text-primary border-b-2 border-primary" : "text-foreground/60 hover:text-foreground"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="bg-card border border-border/50 rounded-md shadow-xl p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => handleProfileChange("name", e.target.value)}
                className="bg-input border border-border/50 text-foreground placeholder-foreground/40 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all w-full"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">Title</label>
              <input
                type="text"
                value={profile.title}
                onChange={(e) => handleProfileChange("title", e.target.value)}
                className="bg-input border border-border/50 text-foreground placeholder-foreground/40 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all w-full"
                placeholder="Your title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => handleProfileChange("email", e.target.value)}
                className="bg-input border border-border/50 text-foreground placeholder-foreground/40 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all w-full"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">Phone</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => handleProfileChange("phone", e.target.value)}
                className="bg-input border border-border/50 text-foreground placeholder-foreground/40 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all w-full"
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">Location</label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => handleProfileChange("location", e.target.value)}
                className="bg-input border border-border/50 text-foreground placeholder-foreground/40 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all w-full"
                placeholder="City, Country"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">Resume Link</label>
              <input
                type="url"
                value={profile.resumeLink}
                onChange={(e) => handleProfileChange("resumeLink", e.target.value)}
                className="bg-input border border-border/50 text-foreground placeholder-foreground/40 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all w-full"
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Profile Image URL</label>
            <input
              type="url"
              value={profile.profileImage}
              onChange={(e) => handleProfileChange("profileImage", e.target.value)}
              className="bg-input border border-border/50 text-foreground placeholder-foreground/40 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all w-full"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Bio</label>
            <textarea
              value={profile.bio}
              onChange={(e) => handleProfileChange("bio", e.target.value)}
              className="bg-input border border-border/50 text-foreground placeholder-foreground/40 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all w-full h-32 resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>
      )}

      {/* About Tab */}
      {activeTab === "about" && (
        <div className="bg-card border border-border/50 rounded-md shadow-xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">About Description</label>
            <textarea
              value={about.description}
              onChange={(e) => handleAboutChange(e.target.value)}
              className="bg-input border border-border/50 text-foreground placeholder-foreground/40 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all w-full h-64 resize-none"
              placeholder="Write your about section..."
            />
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex gap-2">
        <button onClick={handleSave} className="cyber-button bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/50 flex items-center gap-2">
          <Save size={18} />
          Save Changes
        </button>
        {saved && (
          <div className="flex items-center gap-2 text-primary">
            <span>✓ Saved successfully</span>
          </div>
        )}
      </div>
    </div>
  )
}
