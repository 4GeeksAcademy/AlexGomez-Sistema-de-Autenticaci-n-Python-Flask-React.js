import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useContext } from 'react';

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const isAuthenticated = localStorage.getItem('token');
    
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">Home</span>
                </Link>


                <div className="ml-auto">
                    {isAuthenticated ? (
                        <>
                            {/* <Link to="/demo">
                                <button className="btn btn-primary">Check the Context in action</button>
                            </Link> */}

                            <Link to="/">    
                                <button onClick={actions.logout} className="ms-3 btn btn-primary">Logout</button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <button className="ms-3 btn btn-primary">Login</button>
                            </Link>
                            <Link to="/register">
                                <button className="ms-3 btn btn-primary">Registrar</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};
