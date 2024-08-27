import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import './Users.scss';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`);
        const data = await response.json();
        
        // Update users with the new ones from the API, ensuring no duplicates
        setUsers((prevUsers) => {
          const newUsers = data.users.filter(newUser => 
            !prevUsers.some(existingUser => existingUser.id === newUser.id)
          );
          return [...prevUsers, ...newUsers];
        });

        setTotalPages(data.total_pages);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [page]);

  return (
    <section className="get-section">
      <h2>Working with GET request</h2>
      <div className="user-cards">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      {page < totalPages && (
        <button className="show-more" onClick={() => setPage(page + 1)}>
          Show more
        </button>
      )}
    </section>
  );
};

export default Users;
