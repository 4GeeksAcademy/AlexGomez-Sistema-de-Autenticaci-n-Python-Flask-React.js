import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Context } from "../store/appContext";

const EditUserModal = ({ show, onHide, user }) => {
  const { actions } = useContext(Context);
  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    birthday: '',
    is_active: false,
    role: 'user',
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await actions.editUser(
      formData.id,
      formData.name,
      formData.lastname,
      formData.email,
      formData.phone,
      formData.address,
      formData.city,
      formData.state,
      formData.zipcode,
      formData.birthday,
      formData.is_active,
      formData.role
    );
    await actions.getUsers(); 
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            key !== 'id' && key !== 'is_active' && key !== 'role' && (
              <Form.Group key={key} className="mb-3">
                <Form.Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Form.Label>
                <Form.Control
                  type={key === 'birthday' ? 'date' : 'text'}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                />
              </Form.Group>
            )
          ))}
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Is Active"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="User"
                name="role"
                value="user"
                checked={formData.role === 'user'}
                onChange={handleChange}
              />
              <Form.Check
                inline
                type="radio"
                label="Admin"
                name="role"
                value="admin"
                checked={formData.role === 'admin'}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditUserModal;

