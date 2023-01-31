import React, { useState } from "react";
import { useNavigate ,Link} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from '../nav'


const SignUp = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [secretKey, setSecretKey] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://ed-tech-service-backend.onrender.com/admin/createadmin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                username,password,secretKey
            }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success === true) {
            setTimeout(() => {
                toast.success(
                    "Admin Created Successfully",
                    {
                        position: "top-center",
                    }
                );
            }, 100);
            setTimeout(() => {
                navigate("/admin/login", { replace: true });
            }, 2000);
        } else {
            toast.warn("Invalid Credentials", {
                position: "top-center",
            });
        }
    }
    return (
        <>
            <Nav/>
            <form method="POST" onSubmit={handleSubmit}>
                <h3>Sign Up</h3>

                <div className="mb-3">
                    <label>UserName</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Username"
                        required
                        maxLength="10"
                        minLength="2"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>SecretKey</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Secret Key"
                        required
                        value={secretKey}
                        onChange={(e) => setSecretKey(e.target.value)}
                    />
                </div>
              
                <div>
                    Already Signed Up? <Link to="/admin/login">Login</Link>
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Sign Up
                    </button>
                </div>
                <ToastContainer />
            </form>
        </>
    )
}

export default SignUp