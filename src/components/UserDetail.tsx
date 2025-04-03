import { User } from "../types";

interface UserDetailProps {
  user: User;
  onBack: () => void;
}

export default function UserDetail({ user, onBack }: UserDetailProps) {
  return (
    <div className="user-detail">
      <button
        onClick={onBack}
        className="back-button"
      >
        ← Back to Users
      </button>

      <div>
        <h2>{user.name}</h2>
        <div>
          <p>@{user.username}</p>
          <p>{user.email}</p>
        </div>

        <div>
          <div>
            <h3>Contact Information</h3>
            <p>{user.phone}</p>
            <p>
              <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">
                {user.website}
              </a>
            </p>
          </div>

          <div>
            <h3>Address</h3>
            <p>{user.address.suite}, {user.address.street}</p>
            <p>{user.address.city}, {user.address.zipcode}</p>
          </div>
          
          <div>
            <h3>Company</h3>
            <p>{user.company.name}</p>
            <p>"{user.company.catchPhrase}"</p>
            <p>{user.company.bs}</p>
          </div>
        </div>
      </div>
    </div>
  );
}