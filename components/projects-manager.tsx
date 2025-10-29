"use client"

import { useState } from "react"
import { Trash2, Plus, Loader2 } from "lucide-react"
import {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from "@/app/providers/service/projectApis"

interface Project {
  _id?: string
  title: string
  subtitle: string
  description: string
  technologies: string[]
  githubLink: string
  liveLink: string
  coverImage: File | null
  images: File[]
  category: string
  features: string[]
}

export default function ProjectsManager() {
  const { data: projectsData, isLoading, refetch } = useGetProjectsQuery({})
  const [createProject, { isLoading: creating }] = useCreateProjectMutation()
  const [updateProject, { isLoading: updating }] = useUpdateProjectMutation()
  const [deleteProject, { isLoading: deleting }] = useDeleteProjectMutation()

  const [newProject, setNewProject] = useState<Project>({
    title: "",
    subtitle: "",
    description: "",
    technologies: [],
    githubLink: "",
    liveLink: "",
    coverImage: null,
    images: [],
    category: "",
    features: [],
  })

  const [techInput, setTechInput] = useState("")
  const [featureInput, setFeatureInput] = useState("")

  // ------------------ Handlers ------------------

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: "coverImage" | "images") => {
    if (!e.target.files) return
    if (field === "coverImage") {
      setNewProject({ ...newProject, coverImage: e.target.files[0] })
    } else {
      setNewProject({ ...newProject, images: [...newProject.images, ...Array.from(e.target.files)] })
    }
  }

  const handleAddProject = async () => {
    if (!newProject.title.trim() || !newProject.description.trim()) return alert("Title and Description are required")

    const formData = new FormData()
    formData.append("title", newProject.title)
    formData.append("subtitle", newProject.subtitle)
    formData.append("description", newProject.description)
    formData.append("githubLink", newProject.githubLink)
    formData.append("liveLink", newProject.liveLink)
    formData.append("category", "68f8f81e4e78cbb121968677")
    newProject.technologies.forEach((tech) => formData.append("technologies", tech))
    newProject.features.forEach((feature) => formData.append("features", feature))
    console.log(newProject.coverImage , "=============images",newProject.images)
    if (newProject.coverImage) formData.append("coverImage", newProject.coverImage)
    newProject.images.forEach((file) => formData.append("images", file))

    try {
      await createProject({ data: formData }).unwrap()
      setNewProject({
        title: "",
        subtitle: "",
        description: "",
        technologies: [],
        githubLink: "",
        liveLink: "",
        coverImage: null,
        images: [],
        category: "",
        features: [],
      })
      refetch()
      alert("✅ Project created successfully!")
    } catch (err) {
      console.error(err)
      alert("❌ Failed to create project.")
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return
    try {
      await deleteProject({ id }).unwrap()
      refetch()
      alert("🗑️ Project deleted successfully!")
    } catch (err) {
      console.error(err)
      alert("❌ Failed to delete project.")
    }
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

  // ------------------ UI ------------------

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-primary mb-2">PROJECTS MANAGEMENT</h1>
        <p className="text-foreground/60">Showcase your portfolio projects</p>
      </header>

      {/* ADD NEW PROJECT */}
      <section className="bg-card border border-border/50 rounded-md shadow-xl p-6 space-y-4">
        <h2 className="text-xl font-bold text-accent">ADD NEW PROJECT</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Project Title", value: newProject.title, field: "title" },
            { label: "Subtitle", value: newProject.subtitle, field: "subtitle" },
            { label: "Category", value: newProject.category, field: "category" },
            { label: "GitHub Link", value: newProject.githubLink, field: "githubLink" },
            { label: "Live Link", value: newProject.liveLink, field: "liveLink" },
          ].map(({ label, value, field }) => (
            <div key={field}>
              <label className="block text-sm font-medium text-foreground/80 mb-2">{label}</label>
              <input
                type="text"
                value={value}
                onChange={(e) => setNewProject({ ...newProject, [field]: e.target.value })}
                className="bg-input border border-border/50 text-foreground placeholder-foreground/40 rounded-md px-3 py-2 w-full focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all"
                placeholder={label}
              />
            </div>
          ))}
        </div>

        {/* COVER IMAGE */}
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-2">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "coverImage")}
            className="block w-full text-sm text-foreground/70"
          />
        </div>

        {/* IMAGES */}
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-2">Additional Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileChange(e, "images")}
            className="block w-full text-sm text-foreground/70"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-2">Description</label>
          <textarea
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            className="bg-input border border-border/50 text-foreground rounded-md px-3 py-2 w-full focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all h-24 resize-none"
            placeholder="Describe your project..."
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
              onKeyDown={(e) => e.key === "Enter" && addTechnology()}
              placeholder="Add technology..."
              className="flex-1 bg-input border border-border/50 text-foreground rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all"
            />
            <button
              onClick={addTechnology}
              className="cyber-button bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/50"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {newProject.technologies.map((tech, i) => (
              <span
                key={i}
                className="bg-primary/20 border border-primary/50 rounded-md px-3 py-1 text-sm flex items-center gap-2"
              >
                {tech}
                <button onClick={() => removeTechnology(i)} className="text-primary hover:text-primary/70">
                  ×
                </button>
              </span>
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
              onKeyDown={(e) => e.key === "Enter" && addFeature()}
              placeholder="Add feature..."
              className="flex-1 bg-input border border-border/50 text-foreground rounded-md px-3 py-2 focus:outline-none focus:border-accent focus:shadow-lg focus:shadow-accent/30 transition-all"
            />
            <button
              onClick={addFeature}
              className="cyber-button bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/50"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {newProject.features.map((feature, i) => (
              <span
                key={i}
                className="bg-accent/20 border border-accent/50 rounded-md px-3 py-1 text-sm flex items-center gap-2"
              >
                {feature}
                <button onClick={() => removeFeature(i)} className="text-accent hover:text-accent/70">
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <button
          disabled={creating}
          onClick={handleAddProject}
          className="cyber-button bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/50 w-full flex items-center justify-center gap-2"
        >
          {creating ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
          {creating ? "Creating..." : "Add Project"}
        </button>
      </section>

      {/* PROJECTS LIST */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-accent">YOUR PROJECTS</h2>

        {isLoading ? (
          <div className="text-center text-foreground/60">Loading projects...</div>
        ) : projectsData?.data?.length === 0 ? (
          <div className="bg-card border border-border/50 rounded-md shadow-xl p-6 text-center text-foreground/60">
            No projects added yet
          </div>
        ) : (
          projectsData?.data?.map((project: any) => (
            <div key={project._id} className="bg-card border border-border/50 rounded-md shadow-xl p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-bold text-primary">{project.title}</p>
                  <p className="text-sm text-foreground/60">{project.subtitle}</p>
                </div>
                <button
                  disabled={deleting}
                  onClick={() => handleDeleteProject(project._id)}
                  className="p-2 hover:bg-destructive/10 rounded-md transition-colors text-destructive"
                >
                  {deleting ? <Loader2 className="animate-spin" size={16} /> : <Trash2 size={18} />}
                </button>
              </div>
              <p className="text-sm text-foreground/70 mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech: string, i: number) => (
                  <span key={i} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  )
}
