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

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredUsers(users);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.username.toLowerCase().includes(query)
    );
    
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  return (
    <div className="user-list-container">
      <h2>Users Directory</h2>
      
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