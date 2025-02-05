import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup.js";
import "./Signup.css"; // Import custom CSS

const Signup = () => {
    const { loading, error, signupUser } = useSignup();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [formErrors, setFormErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match!";
        }
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            errors.form = "All fields are required.";
        }
        return errors;
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const errors = validateForm();
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            signupUser(formData);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-form">
                <h1 className="signup-title">Create an Account</h1>
                <p className="signup-slogan">Join us for exclusive access to features!</p>
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Re-enter your password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            required
                        />
                        {formErrors.confirmPassword && (
                            <div className="error-message">{formErrors.confirmPassword}</div>
                        )}
                    </div>
                    {formErrors.form && (
                        <div className="error-message">{formErrors.form}</div>
                    )}
                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}
                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? (
                            <span className="loading-spinner"></span>
                        ) : (
                            "Create Account"
                        )}
                    </button>
                    <div className="signin-link">
                        Already have an account? <Link to="/signin">Sign In</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
