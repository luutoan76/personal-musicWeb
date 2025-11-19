import { useState } from 'react'
import { useNavigate } from "react-router-dom";

import './css/Login.css'
import { FaPhoneAlt,FaUserAlt } from "react-icons/fa";

import { FcGoogle } from "react-icons/fc";
import { IoMdMail } from "react-icons/io";
import { MdOutlinePassword } from "react-icons/md";


import logo from '../assets/react.svg'
import thumpnail from '../assets/thumpnail.png'
import song1 from '../assets/song1.png'


function Login(){
    const [tab, setTab] = useState("login"); 
    const [showPwd, setShowPwd] = useState(false);
    const [error, setError] = useState("");
    const [form , setForm] = useState(
        {username: "", password: ""}
    )

    const navigate = useNavigate();
    const goToRegister = () => {
        navigate("/Register");
    }
    const goToHome = () => {
        navigate("/");
    }

    function handleChange(e){
        const {name,value} = e.target;
        setForm((prev) => ({...prev, [name]:value}))
    }   

    async function handleSubmit(e){
        e.preventDefault();
        const data = {
            id: "",
            name: form.username,
            email: "",
            password: form.password,
            phoneNum: "",
            avatar: "",
        };
        try{
            const res = await fetch("http://localhost:5062/api/User/Login" , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            if(res.ok){
                const data = await res.json();
                console.log("Logged in:", data);
                localStorage.setItem("user", JSON.stringify(data));
                goToHome();
            }
            else{
                const errorText = await res.json();
                console.log("Login failed:", errorText.message);
                setError(errorText.message);
            }
        }catch(err){
            console.log(err);
            
        }
    }
    return(
        <>
        <div className="auth-wrap">
            <div className="auth-card">
                <div className="auth-tabs">
                    <button
                        className={`tab ${tab === "signup" ? "active" : ""}`}
                        onClick={goToRegister}
                    >
                        Sign Up
                    </button>
                    <button
                        className={`tab ${tab === "login" ? "active" : ""}`}
                        onClick={() => setTab("login")}
                        
                    >
                        Login
                    </button>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                

                    {/* Name */}
                    <label className="field">
                        <span className="lbl">Name</span>
                        <div className="input-with-icon">
                        <FaUserAlt size={20}/>
                        <input
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            placeholder="Enter Your Name"
                            type="text"
                            required
                        />
                        </div>
                    </label>

                    {/* Password (below email) */}
                    <label className="field">
                        <span className="lbl">Password</span>
                        <div className="input-with-icon">
                        <MdOutlinePassword size={20}/>
                        <input
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Enter Your Password"
                            type={showPwd ? "text" : "password"}
                            required
                        />
                        <button
                            type="button"
                            className="pwd-toggle"
                            onClick={() => setShowPwd((s) => !s)}
                            aria-label={showPwd ? "Hide password" : "Show password"}
                        >
                            {showPwd ? "Hide" : "Show"}
                        </button>
                        </div>
                    </label>

                    <label className='field error-field'>
                        {error && <span className="error-msg">{error}</span>}
                    </label>

                    {/* Sign Up / Login button */}
                    <button className="primary-btn" type="submit">
                        Login
                    </button>

                    <div className="divider">
                        <span>Or</span>
                    </div>

                    <button type="button" className="google-btn" onClick={() => alert("Sign up with Google (demo)")}>
                        <FcGoogle size={30}/>
                        <span>Sign Up With Google</span>
                    </button>
                </form>
            </div>
        </div>
        </>
    )
}

export default Login;