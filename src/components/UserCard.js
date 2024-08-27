import React from 'react';
import Tooltip from './Tooltip'; // Import the Tooltip component
import './UserCard.scss';

const UserCard = ({ user }) => (
  <div className="user-card">
    <img src={user.photo} alt={user.name} />
    <Tooltip text={user.name}>
      <h3>{user.name}</h3>
    </Tooltip>
    <div className="role">{user.position}</div> {/* Display the user's role */}
    <Tooltip text={user.email}>
      <p className="email">{user.email}</p>
    </Tooltip>
    <p>{user.phone}</p>
  </div>
);

export default UserCard;







