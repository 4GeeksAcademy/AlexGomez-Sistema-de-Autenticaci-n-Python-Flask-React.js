import React from 'react';
import { Modal, Button, Badge } from 'react-bootstrap';

const UserInfoModal = ({ show, onHide, user }) => {
  if (!user) return null;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>User Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Name:</strong> {user.name} {user.lastname}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Status:</strong> {user.is_active ? 
          <Badge bg="success">Active</Badge> : 
          <Badge bg="danger">Inactive</Badge>
        }</p>
        <p><strong>Phone:</strong> {user.phone || "Not available"}</p>
        <p><strong>Address:</strong> {user.address || "Not available"}</p>
        <p><strong>City:</strong> {user.city || "Not available"}</p>
        <p><strong>State:</strong> {user.state || "Not available"}</p>
        <p><strong>Zipcode:</strong> {user.zipcode || "Not available"}</p>
        <p><strong>Birthday:</strong> {user.birthday || "Not available"}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserInfoModal;

