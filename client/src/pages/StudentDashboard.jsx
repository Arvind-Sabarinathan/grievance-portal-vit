import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import "./StudentDashboard.css"; // Import custom CSS

const StudentDashboard = () => {
    const { signout } = useAuth();
    const [activeSection, setActiveSection] = useState("profile");
    const [grievances, setGrievances] = useState([
        { id: 1, title: "Broken Chair & Tables", category: "Facility", status: "Pending" },
        { id: 2, title: "Network Issues", category: "IT", status: "Resolved" },
        { id: 3, title: "Library Books", category: "Academic", status: "In Progress" },
        { id: 4, title: "Restrooms are not cleaned regularly", category: "Facility", status: "In Progress" },
        { id: 5, title: "Mess food is of poor quality", category: "Hostel", status: "In Progress" },
        { id: 6, title: "ACs not working in classrooms", category: "Facility", status: "Pending" },
        { id: 7, title: "Exam timetable clashes", category: "Academic", status: "Pending" },
        { id: 8, title: "Wi-Fi is unstable in the hostel", category: "IT", status: "Resolved" },
        { id: 9, title: "Insufficient parking space", category: "Transport", status: "Pending" },
        { id: 10, title: "Bus service delays", category: "Transport", status: "In Progress" },
        { id: 11, title: "Hostel rooms need maintenance", category: "Hostel", status: "Resolved" },
        { id: 12, title: "Sports equipment is outdated", category: "Sports", status: "Pending" },
        { id: 13, title: "Lab equipment not functioning", category: "Academic", status: "In Progress" },
        { id: 14, title: "Late delivery of ID cards", category: "Administration", status: "Resolved" },
        { id: 15, title: "Unhygienic conditions in the canteen", category: "Facility", status: "Pending" },
    ]);

    const { userData }= useAuth();

    const handleSignout = async () => {
        await signout();
    };

    const handleSubmitGrievance = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get("title");
        const category = formData.get("category");
        const description = formData.get("description");
        const newGrievance = {
            id: grievances.length + 1,
            title,
            category,
            description,
            status: "Pending",
        };
        setGrievances([...grievances, newGrievance]);
        e.target.reset();
        alert("Grievance submitted successfully!");
    };

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedProfile = {
            name: formData.get("name"),
            email: formData.get("email"),
        };
        setProfile(updatedProfile);
        alert("Profile updated successfully!");
    };

    const filterGrievances = (status) => {
        return grievances.filter((grievance) => grievance.status === status);
    };

    return (
        <div className="dashboard-container">
            {/* Side Navigation Bar */}
            <nav className="side-nav">
                <h1>Student Dashboard</h1>
                <ul>
                    <li
                        className={activeSection === "profile" ? "active" : ""}
                        onClick={() => setActiveSection("profile")}
                    >
                        <span className="icon">👤</span> Profile
                    </li>
                    <li
                        className={activeSection === "grievance" ? "active" : ""}
                        onClick={() => setActiveSection("grievance")}
                    >
                        <span className="icon">📝</span> Submit Grievance
                    </li>
                    <li
                        className={activeSection === "status" ? "active" : ""}
                        onClick={() => setActiveSection("status")}
                    >
                        <span className="icon">📊</span> Grievance Status
                    </li>
                    <li
                        className={activeSection === "notifications" ? "active" : ""}
                        onClick={() => setActiveSection("notifications")}
                    >
                        <span className="icon">🔔</span> Notifications
                    </li>
                    <li
                        className={activeSection === "settings" ? "active" : ""}
                        onClick={() => setActiveSection("settings")}
                    >
                        <span className="icon">⚙️</span> Settings
                    </li>
                    <li onClick={handleSignout}>
                        <span className="icon">🚪</span> Sign Out
                    </li>
                </ul>
            </nav>

            {/* Main Content */}
            <div className="main-content">
                {/* Profile Section */}
                {activeSection === "profile" && (
                    <div className="section">
                        <h2>👤 Profile</h2>
                        <form onSubmit={handleUpdateProfile}>
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={userData.name}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    defaultValue={userData.email}
                                    required
                                />
                            </div>
                            <button type="submit">Update Profile</button>
                        </form>
                    </div>
                )}

                {/* Grievance Submission Section */}
                {activeSection === "grievance" && (
                    <div className="section">
                        <h2>📝 Submit Grievance</h2>
                        <form onSubmit={handleSubmitGrievance}>
                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Enter grievance title"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select name="category" required>
                                    <option value="">Select category</option>
                                    <option value="Academic">Academic</option>
                                    <option value="Facility">Facility</option>
                                    <option value="IT">IT</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    placeholder="Enter grievance description"
                                    required
                                />
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                )}

                {/* Grievance Status Section */}
                {activeSection === "status" && (
                    <div className="section">
                        <h2>📊 Grievance Status</h2>
                        <div className="status-columns">
                            <div className="column">
                                <h3>Pending</h3>
                                {filterGrievances("Pending").map((grievance) => (
                                    <div key={grievance.id} className="grievance-card">
                                        <h4>{grievance.title}</h4>
                                        <p>{grievance.category}</p>
                                        <p>{grievance.description}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="column">
                                <h3>In Progress</h3>
                                {filterGrievances("In Progress").map((grievance) => (
                                    <div key={grievance.id} className="grievance-card">
                                        <h4>{grievance.title}</h4>
                                        <p>{grievance.category}</p>
                                        <p>{grievance.description}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="column">
                                <h3>Resolved</h3>
                                {filterGrievances("Resolved").map((grievance) => (
                                    <div key={grievance.id} className="grievance-card">
                                        <h4>{grievance.title}</h4>
                                        <p>{grievance.category}</p>
                                        <p>{grievance.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Notifications Section */}
                {activeSection === "notifications" && (
                    <div className="section">
                        <h2>🔔 Notifications</h2>
                        <p>No new notifications.</p>
                    </div>
                )}

                {/* Settings Section */}
                {activeSection === "settings" && (
                    <div className="section">
                        <h2>⚙️ Settings</h2>
                        <p>Customize your dashboard settings here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;
