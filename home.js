import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Fitness() {
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (!isLoggedIn) {
            navigate("/Login");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");
        navigate("/Login");
    };

    return (
        <div className="container">
            
            {/* <p>You are logged in as: {localStorage.getItem("userEmail")}</p> */}
            
        </div>
    );
}

export default Fitness;
