"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin-layout"
import Dashboard from "@/components/dashboard"
import ProfileManager from "@/components/profile-manager"
import ThemeManager from "@/components/theme-manager"
import SkillsManager from "@/components/skills-manager"
import ProjectsManager from "@/components/projects-manager"
import SocialManager from "@/components/social-manager"
import MessagesManager from "@/components/messages-manager"
import UsersManager from "@/components/users-manager"
import CategoriesManager from "@/components/categories-manager"

type Section =
  | "dashboard"
  | "profile"
  | "theme"
  | "skills"
  | "projects"
  | "social"
  | "messages"
  | "users"
  | "categories"

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState<Section>("dashboard")

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />
      case "profile":
        return <ProfileManager />
      case "theme":
        return <ThemeManager />
      case "skills":
        return <SkillsManager />
      case "projects":
        return <ProjectsManager />
      case "social":
        return <SocialManager />
      case "messages":
        return <MessagesManager />
      case "users":
        return <UsersManager />
      case "categories":
        return <CategoriesManager />
      default:
        return <Dashboard />
    }
  }

  return (
    <AdminLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      {renderSection()}
    </AdminLayout>
  )
}
