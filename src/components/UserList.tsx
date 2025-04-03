import { useState, useEffect } from "react";
import { User } from "../types";

interface UserListProps {
  users: User[];
  onSelectUser: (user: User) => void;
  searchQuery: string;
}

export default function UserList({ 
  users, 
  onSelectUser, 
  searchQuery 
}: UserListProps) {
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [sortCriteria, setSortCriteria] = useState<'name' | 'email'>('name');

  useEffect(() => {
    let filtered = users;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = users.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query)
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      if (sortCriteria === 'name') {
        return a.name.localeCompare(b.name);
      } else {
        return a.email.localeCompare(b.email);
      }
    });

    setFilteredUsers(sorted);
  }, [searchQuery, users, sortCriteria]);

  return (
    <div className="user-list-container">
      
      <div className="sort-options">
        <label>Sort by: </label>
        <select value={sortCriteria} onChange={(e) => setSortCriteria(e.target.value as 'name' | 'email')}>
          <option value="name">Name</option>
          <option value="email">Email</option>
        </select>
      </div>
      
      <div className="user-list">
        {filteredUsers.map(user => (
          <div
            key={user.id}
            onClick={() => onSelectUser(user)}
            className="user-card"
          >
            <h3>{user.name}</h3>
            <p>@{user.username}</p>
            <p>{user.email}</p>
          </div>
        ))}

        {filteredUsers.length === 0 && (
          <p className="no-results">
            No users found matching "{searchQuery}"
          </p>
        )}
      </div>
    </div>
  );
} 