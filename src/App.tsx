import { useState, useEffect } from 'react'
import './App.css'
import { User } from './types'
import UserList from './components/UserList'
import UserDetail from './components/UserDetail'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!response.ok) {
          throw new Error('Failed to fetch users')
        }
        const data = await response.json()
        setUsers(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  // Go back to the user list
  const handleBackToList = () => {
    setSelectedUser(null)
  }

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <div className="app-container">
      <header>
        <h1>User Directory</h1>
      </header>
      
      <main>
        {loading && <p className="loading">Loading users...</p>}
        {error && <p className="error">Error: {error}</p>}
        
        {!loading && !error && (
          <>
            {!selectedUser && (
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            )}
            
            {selectedUser ? (
              // User detail view
              <UserDetail 
                user={selectedUser} 
                onBack={handleBackToList} 
              />
            ) : (
              // User list view
              <UserList 
                users={users} 
                onSelectUser={setSelectedUser} 
                searchQuery={searchQuery} 
              />
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default App
