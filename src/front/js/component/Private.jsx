

import React,{useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from "../store/appContext";
import { useContext } from 'react';

const Private = () => {
    
    const { store, actions } = useContext(Context);  
  
    const isAuthenticated = localStorage.getItem('token');
    
    useEffect(() => {
         actions.getPrivate(); 
        }, [])
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (isAuthenticated == null && store.email == null) 
        {
                return <Navigate to="/login" />; 
            }

    return (
        <div>

            <h2 className='text-center'>Welcome {user.name} </h2>
            <div className='container'>
                <h3>Email: {store.email}</h3>
                <h3>Phone: {user.phone}</h3>
                <h3>Address: {user.address}</h3>
                <h3>City: {user.city}</h3>
                <h3>State: {user.state}</h3>
                <h3>Zipcode: {user.zipcode}</h3>
                <h3>Birthday: {user.birthday}</h3>
                {
                    user.is_active ? <h3>Your account <span className='text-success'>is active </span></h3> : <h3>Your account <span className='text-danger'>is not active </span></h3>            
                }
            </div>
          
        </div>
    );
};

export default Private;
