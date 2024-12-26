import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home.jsx";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Login from "./component/Login.jsx";
import Register from "./component/Register.jsx";
import Private from "./component/Private.jsx";
import Admin from "./component/Admin.jsx";
import '../styles/home.css';

const Layout = () => {
   
    const basename = process.env.BASENAME || "";
    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}  future={{ v7_startTransition: true, v7_relativeSplatPath: true}}>
                <ScrollToTop>
                    <Navbar />
                    <Routes >
                        <Route element={<Home />} path="/" />
                        <Route path="/private" element={<Private />} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/register" element={<Register/>} />
                        <Route path="/admin" element={<Admin />} />
                        <Route element={<h1 className="text-center h-100 p-5 m-5">Not Found 404</h1>} path="*" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
