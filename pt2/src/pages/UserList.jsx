import React, { useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

const UserList = () => {
  const { users, toggleLockStatus } = useAuth();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleView = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleClose = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">User Management</h2>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Full Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user.username}>
              <td>{idx + 1}</td>
              <td>{user.username}</td>
              <td>{user.fullName}</td>
              <td>{user.role}</td>
              <td>
                <span
                  className={`badge ${
                    user.status === "active" ? "bg-success" : "bg-danger"
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  className="me-2"
                  onClick={() => handleView(user)}
                >
                  View
                </Button>
                <Button
                  variant={user.status === "active" ? "warning" : "success"}
                  size="sm"
                  onClick={() => toggleLockStatus(user.username)}
                >
                  {user.status === "active" ? "Lock" : "Unlock"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal xem thông tin chi tiết */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser ? (
            <>
              <p><strong>Username:</strong> {selectedUser.username}</p>
              <p><strong>Full Name:</strong> {selectedUser.fullName}</p>
              <p><strong>Email:</strong> {selectedUser.email || "N/A"}</p>
              <p><strong>Role:</strong> {selectedUser.role}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`badge ${
                    selectedUser.status === "active"
                      ? "bg-success"
                      : "bg-danger"
                  }`}
                >
                  {selectedUser.status}
                </span>
              </p>
            </>
          ) : (
            <p>No user selected.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserList;
