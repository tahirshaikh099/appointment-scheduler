import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { handleRegister } from "../utils/resource";
import './register.css'



const Signup = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (firstName.trim() && lastName.trim() && password.trim() && email.trim()) {
			handleRegister(email, firstName, lastName, password, navigate);
			setFirstName("");
			setLastName("");
			setPassword("");
			setEmail("");
		}
	};

	return (
		<main className='signup'>
			<form className='signup__form' onSubmit={handleSubmit}>
				<h2 className='signup__title'>Create an account</h2>
				<label htmlFor='username'>First Name</label>
				<input
					id='username'
					name='firstname'
					required
					type='text'
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
				/>
				<label htmlFor='username'>Last Name</label>
				<input
					id='username'
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
