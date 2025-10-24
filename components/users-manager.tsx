"use client"

import { useState, useEffect } from "react"
import { Trash2, Plus } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  password: string
  role: "admin" | "editor" | "viewer"
}

export default function UsersManager() {
  const [users, setUsers] = useState<User[]>([])
  const [newUser, setNewUser] = useState<User>({
    id: "",
    name: "",
    email: "",
    password: "",
    role: "viewer",
  })

  useEffect(() => {
    const savedUsers = localStorage.getItem("users")
    if (savedUsers) setUsers(JSON.parse(savedUsers))
  }, [])

  const handleAddUser = () => {
    if (!newUser.name.trim() || !newUser.email.trim() || !newUser.password.trim()) return
    const user = { ...newUser, id: Date.now().toString() }
    const updatedUsers = [...users, user]
    setUsers(updatedUsers)
    localStorage.setItem("users", JSON.stringify(updatedUsers))
    setNewUser({
      id: "",
      name: "",
      email: "",
      password: "",
      role: "viewer",
    })
  }

  const handleDeleteUser = (id: string) => {
    const updatedUsers = users.filter((user) => user.id !== id)
    setUsers(updatedUsers)
    localStorage.setItem("users", JSON.stringify(updatedUsers))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">USERS MANAGEMENT</h1>
        <p className="text-foreground/60">Manage admin panel users and permissions</p>
      </div>

      {/* Add New User */}
      <div className="bg-card border border-border/50 rounded-md shadow-xl p-6 space-y-4">
        <h2 className="text-xl font-bold text-accent">ADD NEW USER</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Name</label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="bg-input border border-border/50 text-foreground placeholder-foreground/40 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all w-full"
              placeholder="User name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Email</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="bg-input border border-border/50 text-foreground placeholder-foreground/40 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all w-full"
              placeholder="user@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Password</label>
            <input
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="bg-input border border-border/50 text-foreground placeholder-foreground/40 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all w-full"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Role</label>
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value as "admin" | "editor" | "viewer" })}
              className="bg-input border border-border/50 text-foreground placeholder-foreground/40 rounded-md px-3 py-2 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-all w-full"
            >
              <option value="viewer">Viewer</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <button onClick={handleAddUser} className="cyber-button bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/50 w-full flex items-center justify-center gap-2">
          <Plus size={18} />
          Add User
        </button>
      </div>

      {/* Users List */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-accent">SYSTEM USERS</h2>
        {users.length === 0 ? (
          <div className="bg-card border border-border/50 rounded-md shadow-xl p-6 text-center text-foreground/60">No users added yet</div>
        ) : (
          users.map((user) => (
            <div key={user.id} className="bg-card border border-border/50 rounded-md shadow-xl p-4 flex items-center justify-between">
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-foreground/60">{user.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    user.role === "admin"
                      ? "bg-destructive/20 text-destructive"
                      : user.role === "editor"
                        ? "bg-accent/20 text-accent"
                        : "bg-primary/20 text-primary"
                  }`}
                >
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="p-2 hover:bg-destructive/10 rounded-md transition-colors text-destructive"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
