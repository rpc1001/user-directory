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
          <p><strong>Username:</strong> @{user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>

        <div className="user-info">
          <div>
            <h3>Contact Information</h3>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p>
              <strong>Website:</strong> <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">
                {user.website}
              </a>
            </p>
          </div>

          <div>
            <h3>Address</h3>
            <p><strong>Street:</strong> {user.address.suite}, {user.address.street}</p>
            <p><strong>City:</strong> {user.address.city}</p>
            <p><strong>Zipcode:</strong> {user.address.zipcode}</p>
          </div>
          
          <div>
            <h3>Company</h3>
            <p><strong>Name:</strong> {user.company.name}</p>
            <p><strong>Motto:</strong> "{user.company.catchPhrase}"</p>
            <p><strong>Business:</strong> {user.company.bs}</p>
          </div>
        </div>
      </div>
    </div>
  );
}