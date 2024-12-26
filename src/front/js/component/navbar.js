import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const [status, setStatus] = useState(false);
    const isAuthenticated = localStorage.getItem('token');

    useEffect(() => {
        if (store.token) {
            setStatus(true);
        }
    }, [store.token]);

    return (
        <nav className="navbar navbar-light ">
            <div className="container">
                <Link className="btn-home" to="/">
                    <span className="navbar-brand mb-0 fs-1">Home</span>
                </Link>

                <div className="ml-auto">
                    {isAuthenticated && status ? (
                        <Link to="/">
                            <button onClick={actions.logout} className="ms-3 btn btn-primary">Logout</button>
                        </Link>
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
