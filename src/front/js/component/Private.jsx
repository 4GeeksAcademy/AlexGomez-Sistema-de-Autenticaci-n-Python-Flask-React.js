import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from "../store/appContext";
import { useContext } from 'react';

const Private = () => {
    const { store, actions } = useContext(Context);  
    const isAuthenticated = localStorage.getItem('token');
    
    useEffect(() => {
        actions.getPrivate(); 
    }, []);
  
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (isAuthenticated == null && store.email == null) {
        return <Navigate to="/login" />; 
    }

    return (
        <div className="container mt-5">
            <div className="bg-gradient p-5 rounded-lg shadow-lg">
                <div className="text-center mb-4">
                
                    <h2 className="display-4 text-primary">Welcome, {user.name || "User"}</h2>
                    <p className="text-secondary fs-5">Here’s your account details</p>
                </div>

                <div className="bg-white p-5 rounded-lg shadow">
                    <h3 className="text-muted mb-3">User Information</h3>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <strong>Email:</strong> <span className="text-info">{store.email || "Not available"}</span>
                        </li>
                        <li className="list-group-item">
                            <strong>Phone:</strong> {user.phone || "Not available"}
                        </li>
                        <li className="list-group-item">
                            <strong>Address:</strong> {user.address || "Not available"}
                        </li>
                        <li className="list-group-item">
                            <strong>City:</strong> {user.city || "Not available"}
                        </li>
                        <li className="list-group-item">
                            <strong>State:</strong> {user.state || "Not available"}
                        </li>
                        <li className="list-group-item">
                            <strong>Zipcode:</strong> {user.zipcode || "Not available"}
                        </li>
                        <li className="list-group-item">
                            <strong>Birthday:</strong> {user.birthday || "Not available"}
                        </li>
                    </ul>

                    <div className="mt-4">
                        {user.is_active ? 
                            <h4 className="text-success">Your account <strong>is active</strong></h4> : 
                            <h4 className="text-danger">Your account <strong>is not active</strong></h4>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Private;
