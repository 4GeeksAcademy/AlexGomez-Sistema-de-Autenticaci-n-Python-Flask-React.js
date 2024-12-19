import React, { useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        lastname: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipcode: "",
        birthday: "",
        is_active: false,
    });

    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };
    const validate = () => {
        let formErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10}$/;
        const birthdayRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format

        if (!formData.email) {
            formErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            formErrors.email = "Invalid email format";
        }

        if (!formData.password) {
            formErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            formErrors.password = "Password must be at least 6 characters";
        }

        if (!formData.name) formErrors.name = "Name is required";
        if (!formData.lastname) formErrors.lastname = "Lastname is required";

        if (!formData.phone) {
            formErrors.phone = "Phone is required";
        } else if (!phoneRegex.test(formData.phone)) {
            formErrors.phone = "Phone must be 10 digits";
        }

        if (!formData.address) formErrors.address = "Address is required";
        if (!formData.city) formErrors.city = "City is required";
        if (!formData.state) formErrors.state = "State is required";
        if (!formData.zipcode) formErrors.zipcode = "Zipcode is required";

        if (!formData.birthday) {
            formErrors.birthday = "Birthday is required";
        } else if (!birthdayRegex.test(formData.birthday)) {
            formErrors.birthday = "Birthday must be in the format YYYY-MM-DD";
        }

        return formErrors;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validate();
        if (Object.keys(formErrors).length === 0) {    
            actions.register(
                formData.name,
                formData.lastname,
                formData.email,
                formData.password,
                formData.phone,
                formData.address,
                formData.city, 
                formData.state,
                formData.zipcode,
                formData.birthday,
                formData.is_active,
                navigate
            );
        } else {
            setErrors(formErrors);
        }
    };


    return (
    <div className="c-wrapper">
      <div className="c-form-container">
        <div className=" mt-5 ">
            <h2 className="text-center">Register</h2>
            <form onSubmit={handleSubmit}>
                {Object.keys(formData).map((key) => (
                    key !== "is_active" && (
                        <div className="mb-3" key={key}>
                            <label className="form-label" htmlFor={key}>
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </label>
                            <input
                                type={key === "password" ? "password" : key === "birthday" ? "date" : "text"}
                                className={`form-control ${errors[key] ? "is-invalid" : ""}`}
                                id={key}
                                name={key}
                                value={formData[key]}
                                onChange={handleChange}
                            />
                            {errors[key] && <div className="invalid-feedback">{errors[key]}</div>}
                        </div>
                    )
                ))}
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="is_active"
                        name="is_active"
                        checked={formData.is_active}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="is_active">
                        Is Active
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">
                    Register
                </button>
            </form>
        </div>
        </div>
        </div>
    );
};

export default Register;
