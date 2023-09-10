import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { handleLogin } from "../utils/resource";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
		if (email.trim() && password.trim()) {
			e.preventDefault();
			handleLogin(email, password, navigate);
			setPassword("");
			setEmail("");
		}
	};


    return (
        <main className='login'>
            <form className='login__form' onSubmit={handleSubmit}>
                <h2 className='login__title'>Log into your account</h2>
                <label htmlFor='email'>Email</label>
                <input
                    id='username'
                    name='email'
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='username'
                />
                <label htmlFor='password'>Password</label>
                <input
                    id='password'
                    type='password'
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='password'
                />
                <button className='loginButton'>LOG IN</button>
                <p style={{ textAlign: "center", marginTop: "30px" }}>
                    Don't have an account?{" "}
                    <Link className='link' to='/register'>
                        Create one
                    </Link>
                </p>
            </form>
        </main>
    );
};

export default Login;