import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from "../store/appContext";
import EditUserModal from './EditUserModal.jsx';
import UserInfoModal from './UserInfoModal.jsx';
import { Col, Card, Table, Button, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';


const Admin = () => {
    const { store, actions } = useContext(Context);  
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token'));
    const [selectedUser, setSelectedUser] = useState(null);
    const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem('user')));
    const [showEditModal, setShowEditModal] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);
    const [showUserInfoModal, setShowUserInfoModal] = useState(false);
    
    const refreshData = useCallback(() => {
        actions.getAdmin();
        actions.getUsers();
        setAdmin(JSON.parse(localStorage.getItem('user')));
    }, [store.users]);

    useEffect(() => {
        refreshData();
    }, [refreshData]);

    useEffect(() => {
        setIsAuthenticated(localStorage.getItem('token'));
        setAdmin(JSON.parse(localStorage.getItem('user')));
    }, [store.email]);

    if (!isAuthenticated && !store.email) {
        return <Navigate to="/login" />; 
    }

    const handleSelectUser = (user) => {
        setSelectedUser(user);
        setShowUserInfoModal(true);
    };

    const handleEdit = (user) => {
        setUserToEdit(user);
        setShowEditModal(true);
    };

    const handleDelete = (userId) => {
        if (userId === admin.id) {
            alert("You cannot delete the logged-in user.");
            return;
        }
        actions.deleteUser(userId).then(() => refreshData());
    };

    const handleEditSuccess = () => {
        setShowEditModal(false);
        refreshData();
    };

    const getTotalUsers = () => Array.isArray(store.users) ? store.users.length : 0;
    const getActiveUsers = () => Array.isArray(store.users) ? store.users.filter(user => user.is_active).length : 0;
    const getAdminUsers = () => Array.isArray(store.users) ? store.users.filter(user => user.role === 'admin').length : 0;
    const getUserUsers = () => Array.isArray(store.users) ? store.users.filter(user => user.role === 'user').length : 0;

    return (
        <>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
                integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
            />
            <div className="admin-dashboard p-4 container">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl font-bold mb-8 text-center text-gradient">Admin Dashboard</h1>
                </motion.div>
                <div className="mb-5 row mt-5 justify-content-center">
                    <Col md={2}>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Card className="stat-card bg-gradient-primary text-white">
                                <Card.Body>
                                    <i className="fas fa-users fa-3x mb-3"></i>
                                    <Card.Title className="text-xl font-semibold">Total Users</Card.Title>
                                    <Card.Text className="text-4xl font-bold">{getTotalUsers()}</Card.Text>
                                </Card.Body>
                            </Card>
                        </motion.div>
                    </Col>
                    <Col md={2}>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Card className="stat-card bg-gradient-success text-white">
                                <Card.Body>
                                    <i className="fas fa-user-check fa-3x mb-3"></i>
                                    <Card.Title className="text-xl font-semibold">Active Users</Card.Title>
                                    <Card.Text className="text-4xl font-bold">{getActiveUsers()}</Card.Text>
                                </Card.Body>
                            </Card>
                        </motion.div>
                    </Col>
                    <Col md={2}>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Card className="stat-card bg-gradient-warning text-white">
                                <Card.Body>
                                    <i className="fas fa-user-shield fa-3x mb-3"></i>
                                    <Card.Title className="text-xl font-semibold">Admin Users</Card.Title>
                                    <Card.Text className="text-4xl font-bold">{getAdminUsers()}</Card.Text>
                                </Card.Body>
                            </Card>
                        </motion.div>
                    </Col>
                    <Col md={2}>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Card className="stat-card bg-gradient-info text-white">
                                <Card.Body>
                                    <i className="fas fa-user fa-3x mb-3"></i>
                                    <Card.Title className="text-xl font-semibold">Standard Users</Card.Title>
                                    <Card.Text className="text-4xl font-bold">{getUserUsers()}</Card.Text>
                                </Card.Body>
                            </Card>
                        </motion.div>
                    </Col>
                    <Col md={2}>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Card className="stat-card bg-gradient-danger text-white">
                                <Card.Body>
                                    <i className="fas fa-user-times fa-3x mb-3"></i>
                                    <Card.Title className="text-xl font-semibold">Inactive Users</Card.Title>
                                    <Card.Text className="text-4xl font-bold">{getTotalUsers() - getActiveUsers()}</Card.Text>
                                </Card.Body>
                            </Card>
                        </motion.div>
                    </Col>
                </div>
                <div className='row'>
                    <Col md={4}>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Card className="admin-info-card mb-4 bg-gradient-info text-white">
                                <Card.Header className=" border-bottom-0">
                                    <h5 className="my-4 font-bold fs-2 text-center ">Admin Information</h5>
                                </Card.Header>
                                <Card.Body>
                                    <p><strong className='me-2'>Name:</strong> {admin.name} {admin.lastname}</p>
                                    <p><strong className='me-2'>Email:</strong> {admin.email}</p>
                                    <p><strong className='me-2'>Phone:</strong> {admin.phone || "Not available"}</p>
                                    <p><strong className='me-2'>Address:</strong> {admin.address || "Not available"}</p>
                                    <p><strong className='me-2'>City:</strong> {admin.city || "Not available"}</p>
                                    <p><strong className='me-2'>State:</strong> {admin.state || "Not available"}</p>
                                    <p><strong className='me-2'>Zipcode:</strong> {admin.zipcode || "Not available"}</p>
                                    <p><strong className='me-2'>Birthday:</strong> {admin.birthday || "Not available"}</p>
                                    <p><strong className='me-2'>Status:</strong> {admin.is_active ? 
                                        <Badge bg="success" className="status-badge ms-2">Active</Badge> : 
                                        <Badge bg="danger" className="status-badge ms-2">Inactive</Badge>
                                    }</p>
                                </Card.Body>
                            </Card>
                        </motion.div>
                    </Col>
                    <Col md={8}>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <Card className="user-management-card">
                                <Card.Header className="bg-gradient-secondary text-white">
                                    <h5 className="mb-0 font-bold text-xl">User Management</h5>
                                </Card.Header>
                                <Card.Body>
                                    <Table responsive hover className="user-table">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Role</th>
                                                <th>Status</th>
                                                <th className='ps-5'>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array.isArray(store.users) && store.users.length > 0 ? (
                                                store.users.map((user) => (
                                                    <tr key={user.id}>
                                                        <td onClick={() => handleSelectUser(user)} style={{ cursor: 'pointer' }}>
                                                            {user.name} {user.lastname}
                                                        </td>
                                                        <td>{user.email}</td>
                                                        <td>{user.role}</td>
                                                        <td>
                                                            {user.is_active ? 
                                                                <Badge bg="success" className="status-badge">Active</Badge> : 
                                                                <Badge bg="danger" className="status-badge">Inactive</Badge>
                                                            }
                                                        </td>
                                                        <td>
                                                            <Button 
                                                                variant="outline-primary"
                                                                size="sm"
                                                                className="me-2 action-button"
                                                                onClick={() => handleEdit(user)}
                                                            >
                                                                Edit
                                                            </Button>
                                                            <Button 
                                                                variant="outline-danger"
                                                                size="sm"
                                                                className="action-button"
                                                                onClick={() => handleDelete(user.id)}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="text-center">No users available</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </motion.div>
                    </Col>
                </div>
                <EditUserModal 
                    show={showEditModal}
                    onHide={() => setShowEditModal(false)}
                    user={userToEdit}
                    onEditSuccess={handleEditSuccess}
                />
                <UserInfoModal 
                    show={showUserInfoModal}
                    onHide={() => setShowUserInfoModal(false)}
                    user={selectedUser}
                />
            </div>
        </>
    );
};

export default Admin;

