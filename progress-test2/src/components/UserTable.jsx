import React from 'react';
import { Table, Button, Image } from 'react-bootstrap';
import axios from 'axios';

const UserTable = ({ users, reloadUsers }) => {
  const handleBan = async (user) => {
    const newStatus = user.status === 'active' ? 'blocked' : 'active';
    await axios.put(`http://localhost:3001/users/${user.id}`, { ...user, status: newStatus });
    reloadUsers();
  };

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Avatar</th>
          <th>Username</th>
          <th>Full Name</th>
          <th>Role</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td>{u.id}</td>
            <td>
              <Image src={u.avatar} roundedCircle width={40} height={40} alt={u.username} />
            </td>
            <td>{u.username}</td>
            <td>{u.fullName}</td>
            <td>{u.role}</td>
            <td className={u.status === 'active' ? 'text-success' : 'text-danger'}>{u.status}</td>
            <td>
              <Button variant="info" size="sm" className="me-2">View</Button>
              <Button
                variant={u.status === 'active' ? 'danger' : 'success'}
                size="sm"
                onClick={() => handleBan(u)}
              >
                {u.status === 'active' ? 'Ban' : 'Unban'}
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserTable;
