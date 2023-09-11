import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { handleRegister } from "../utils/resource";
import { toast } from "react-toastify";
import '../assets/styles/register.css'



const Signup = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const navigate = useNavigate();

	const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;


	const handleSubmit = (e) => {
		e.preventDefault();
		if (firstName.trim() && lastName.trim() && password.trim() && email.trim()) {
			if (emailRegex.test(email)) {
				handleRegister(email, firstName, lastName, password, navigate);
				setFirstName("");
				setLastName("");
				setPassword("");
				setEmail("");
			}else{
				toast.error("Invalid email address", {
                    position: "top-right",
                    autoClose: 3000,
                });
			}
		}
	};

	return (
		<main className='signup'>
			<form className='signup__form' onSubmit={handleSubmit}>
				<h2 className='signup__title'>Create an account</h2>
				<label htmlFor='username'>First Name</label>
				<input
					id='firstname'
					name='firstname'
					required
					type='text'
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
				/>
				<label htmlFor='username'>Last Name</label>
				<input
					id='lastname'
					name='lastname'
					required
					type='text'
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
				/>
				<label htmlFor='email'>Email Address</label>
				<input
					id='email'
					name='email'
					type='email'
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label htmlFor='password'>Password</label>
				<input
					id='password'
					type='password'
					name='password'
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button className='signupButton'>REGISTER</button>
				<p style={{ textAlign: "center", marginTop: "30px" }}>
					Already have an account?{" "}
					<Link className='link' to='/'>
						Sign in
					</Link>
				</p>
			</form>
		</main>
	);
};

export default Signup;
