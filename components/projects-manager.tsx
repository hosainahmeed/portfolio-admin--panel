"use client"

import { useState, useEffect } from "react"
import { Trash2, Plus } from "lucide-react"

interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  technologies: string[]
  githubLink: string
  liveLink: string
  coverImage: string
  images: string[]
  category: string
  features: string[]
}

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([])
  const [newProject, setNewProject] = useState<Project>({
    id: "",
    title: "",
    subtitle: "",
    description: "",
    technologies: [],
    githubLink: "",
    liveLink: "",
    coverImage: "",
    images: [],
    category: "",
    features: [],
  })
  const [techInput, setTechInput] = useState("")
  const [featureInput, setFeatureInput] = useState("")

  useEffect(() => {
    const savedProjects = localStorage.getItem("projects")
    if (savedProjects) setProjects(JSON.parse(savedProjects))
  }, [])

  const handleAddProject = () => {
    if (!newProject.title.trim()) return
    const project = { ...newProject, id: Date.now().toString() }
    const updatedProjects = [...projects, project]
    setProjects(updatedProjects)
    localStorage.setItem("projects", JSON.stringify(updatedProjects))
    setNewProject({
      id: "",
      title: "",
      subtitle: "",
      description: "",
      technologies: [],
      githubLink: "",
      liveLink: "",
      coverImage: "",
      images: [],
      category: "",
      features: [],
    })
  }

  const handleDeleteProject = (id: string) => {
    const updatedProjects = projects.filter((project) => project.id !== id)
    setProjects(updatedProjects)
    localStorage.setItem("projects", JSON.stringify(updatedProjects))
  }

  const addTechnology = () => {
    if (techInput.trim()) {
      setNewProject({
        ...newProject,
        technologies: [...newProject.technologies, techInput.trim()],
      })
      setTechInput("")
    }
  }

  const removeTechnology = (index: number) => {
    setNewProject({
      ...newProject,
      technologies: newProject.technologies.filter((_, i) => i !== index),
    })
  }

  const addFeature = () => {
    if (featureInput.trim()) {
      setNewProject({
        ...newProject,
        features: [...newProject.features, featureInput.trim()],
      })
      setFeatureInput("")
    }
  }

  const removeFeature = (index: number) => {
    setNewProject({
      ...newProject,
      features: newProject.features.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">PROJECTS MANAGEMENT</h1>
        <p className="text-foreground/60">Showcase your portfolio projects</p>
      </div>

      {/* Add New Project */}
      <div className="bg-card border border-border/50 rounded-md shadow-xl p-6 space-y-4">
        <h2 className="text-xl font-bold text-accent">ADD NEW PROJECT</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Project Title</label>
            <input
              type="text"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              className="bg-input border border-border/50 text-foreground placeholder-foreground/40 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all w-full"
              placeholder="Project name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Subtitle</label>
            <input
              type="text"
              value={newProject.subtitle}
              onChange={(e) => setNewProject({ ...newProject, subtitle: e.target.value })}
              className="bg-input border border-border/50 text-foreground placeholder-foreground/40 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all w-full"
              placeholder="Short description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Category</label>
            <input
              type="text"
              value={newProject.category}
              onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
              className="bg-input border border-border/50 text-foreground placeholder-foreground/40 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all w-full"
              placeholder="e.g., Web App"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Cover Image URL</label>
            <input
              type="url"
              value={newProject.coverImage}
              onChange={(e) => setNewProject({ ...newProject, coverImage: e.target.value })}
              className="bg-input border border-border/50 text-foreground placeholder-foreground/40 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all w-full"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">GitHub Link</label>
            <input
              type="url"
              value={newProject.githubLink}
              onChange={(e) => setNewProject({ ...newProject, githubLink: e.target.value })}
              className="bg-input border border-border/50 text-foreground placeholder-foreground/40 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all w-full"
              placeholder="https://github.com/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Live Link</label>
            <input
              type="url"
              value={newProject.liveLink}
              onChange={(e) => setNewProject({ ...newProject, liveLink: e.target.value })}
              className="bg-input border border-border/50 text-foreground placeholder-foreground/40 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all w-full"
              placeholder="https://..."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-2">Description</label>
          <textarea
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            className="bg-input border border-border/50 text-foreground placeholder-foreground/40 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all w-full h-24 resize-none"
            placeholder="Project description..."
          />
        </div>

        {/* Technologies */}
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-2">Technologies</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTechnology()}
              className="bg-input border border-border/50 text-foreground placeholder-foreground/40 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all flex-1"
              placeholder="Add technology..."
            />
            <button onClick={addTechnology} className="cyber-button bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/50">
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {newProject.technologies.map((tech, index) => (
              <div
                key={index}
                className="bg-primary/20 border border-primary/50 rounded-md px-3 py-1 flex items-center gap-2"
              >
                <span className="text-sm">{tech}</span>
                <button onClick={() => removeTechnology(index)} className="text-primary hover:text-primary/80">
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-2">Features</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addFeature()}
              className="bg-input border border-border/50 text-foreground placeholder-foreground/40 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all flex-1"
              placeholder="Add feature..."
            />
            <button onClick={addFeature} className="cyber-button bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/50">
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {newProject.features.map((feature, index) => (
              <div
                key={index}
                className="bg-accent/20 border border-accent/50 rounded-md px-3 py-1 flex items-center gap-2"
              >
                <span className="text-sm">{feature}</span>
                <button onClick={() => removeFeature(index)} className="text-accent hover:text-accent/80">
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleAddProject}
          className="cyber-button bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/50 w-full flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Add Project
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-accent">YOUR PROJECTS</h2>
        {projects.length === 0 ? (
          <div className="bg-card border border-border/50 rounded-md shadow-xl p-6 text-center text-foreground/60">No projects added yet</div>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="bg-card border border-border/50 rounded-md shadow-xl p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-bold text-primary">{project.title}</p>
                  <p className="text-sm text-foreground/60">{project.subtitle}</p>
                </div>
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="p-2 hover:bg-destructive/10 rounded-md transition-colors text-destructive"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <p className="text-sm text-foreground/70 mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
