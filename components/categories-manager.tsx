"use client"

import { useState, useEffect } from "react"
import { Trash2, Plus } from "lucide-react"

interface Category {
  id: string
  name: string
}

export default function CategoriesManager() {
  const [categories, setCategories] = useState<Category[]>([])
  const [newCategory, setNewCategory] = useState("")

  useEffect(() => {
    const savedCategories = localStorage.getItem("categories")
    if (savedCategories) setCategories(JSON.parse(savedCategories))
  }, [])

  const handleAddCategory = () => {
    if (!newCategory.trim()) return
    const category = { id: Date.now().toString(), name: newCategory.trim() }
    const updatedCategories = [...categories, category]
    setCategories(updatedCategories)
    localStorage.setItem("categories", JSON.stringify(updatedCategories))
    setNewCategory("")
  }

  const handleDeleteCategory = (id: string) => {
    const updatedCategories = categories.filter((cat) => cat.id !== id)
    setCategories(updatedCategories)
    localStorage.setItem("categories", JSON.stringify(updatedCategories))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">CATEGORIES MANAGEMENT</h1>
        <p className="text-foreground/60">Manage project and skill categories</p>
      </div>

      {/* Add New Category */}
      <div className="bg-card border border-border/50 rounded-md shadow-xl p-6 space-y-4">
        <h2 className="text-xl font-bold text-accent">ADD NEW CATEGORY</h2>

        <div className="flex gap-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddCategory()}
            className="bg-input border border-border/50 text-foreground placeholder-foreground/40 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all flex-1"
            placeholder="e.g., Frontend, Backend, Design"
          />
          <button onClick={handleAddCategory} className="cyber-button bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/50 flex items-center gap-2">
            <Plus size={18} />
            Add
          </button>
        </div>
      </div>

      {/* Categories List */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-accent">CATEGORIES</h2>
        {categories.length === 0 ? (
          <div className="bg-card border border-border/50 rounded-md shadow-xl p-6 text-center text-foreground/60">No categories added yet</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {categories.map((category) => (
              <div key={category.id} className="bg-card border border-border/50 rounded-md shadow-xl p-4 flex items-center justify-between">
                <p className="font-medium">{category.name}</p>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="p-2 hover:bg-destructive/10 rounded-md transition-colors text-destructive"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
