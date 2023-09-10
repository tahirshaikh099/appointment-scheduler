import { React, useState, useEffect } from 'react';
import axios from 'axios';
import "./profile.css"
import { time } from "../utils/resource";
import { toast } from "react-toastify";


const Profile = () => {
    const [userEmail, setUserEmail] = useState();
    const [userName, setUserName] = useState();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [currentPassword, setcurrentPassword] = useState('');
    const [newPassword, setnewPassword] = useState('');
    const [currentAppointments, setCurrentAppointments] = useState([]);
    const [offHours, setOffHours] = useState('');
    const [loading, setLoading] = useState(true);

    const localStoredEmail = localStorage.getItem('_myEmail');

    const handlesetcurrentPassword = (event) => {
        setcurrentPassword(event.target.value);
    };

    const handlesetnewPassword = (event) => {
        setnewPassword(event.target.value);
    };

    const handleFirstName = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastName = (event) => {
        setLastName(event.target.value);
    };

    const handleTimeChange = (e) => {
        const { value } = e.target;
        if (value === "Select") return;
        setOffHours(value); // Set the selected time directly as a string
        handleOffHoursChange(offHours);
    };

    const handleOffHoursChange = async (offHours) => {
        try {
            const response = await axios.post('https://appointment-scheduler-bwez.onrender.com//api/offhours', { "offHours": offHours });
            if (response.status === 200) {
                toast.success("Offhours submitted", {
                    position: "top-right",
                    autoClose: 3000, // Close the message after 3 seconds
                });
            }
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await axios.post('https://appointment-scheduler-bwez.onrender.com//api/user', { "email": localStoredEmail });
                if (response.status === 200) {
                    setUserEmail(response.data.user.email);
                    setUserName(response.data.user.fullName);
                    setLoading(false);
                } else {
                    console.log("Error fetching user data");
                }
            } catch (error) {
                console.error('Error: ', error);
            }
        };
        getUserData();
    }, [localStoredEmail]);

    useEffect(() => {
        const getAllAppointmentData = async () => {
            try {
                const response = await axios.post('https://appointment-scheduler-bwez.onrender.com//api/appointments', {
                    "email": localStoredEmail
                });
                if (response.status === 200) {
                    setCurrentAppointments(response.data);
                } else {
                    console.log("Error fetching appointment data");
                }
            } catch (error) {
                console.error('Error: ', error);
            }
        };
        getAllAppointmentData();
    }, [localStoredEmail]);

    const handleUserNameChange = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://appointment-scheduler-bwez.onrender.com//api/updateuser', { "email": userEmail, "firstName": firstName, "lastName": lastName });
            if (response.status === 200) {
                setFirstName(response.data.user.firstName);
                setLastName(response.data.user.lastName);
                setLoading(false);
            } else {
                console.log("Error updating user data");
            }
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    const handlePasswordChange = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://appointment-scheduler-bwez.onrender.com//api/updatepassword', { "email": userEmail, "currentPassword": currentPassword, "newPassword": newPassword });
            if (response.status === 200) {
                setUserEmail(response.data.user.email);
                setUserName(response.data.user.fullName);
                setLoading(false);
            } else {
                console.log("Error updating user data");
            }
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    return (
        <div>
            {loading ? (<p>Loading...</p>) : (
                <div>
                    <h2>User Profile</h2>
                    <p>Email: {userEmail}</p>
                    <p>Username: {userName}</p>
                    <form onSubmit={handleUserNameChange}>
                        <label>
                            First Name: <input type="text" name="First Name" value={firstName} onChange={handleFirstName} />
                        </label>
                        <label>
                            Last Name: <input type="text" name="Last Name" value={lastName} onChange={handleLastName} />
                        </label>
                        <button type="submit">Update</button>
                    </form>
                    <label>To update your password, please provide:</label>
                    <form onSubmit={handlePasswordChange}>
                        <label>
                            Current Password: <input type="password" name="currentPassword" value={currentPassword} onChange={handlesetcurrentPassword} />
                        </label>
                        <label>
                            New Password: <input type="password" name="newPassword" value={newPassword} onChange={handlesetnewPassword} />
                        </label>
                        <button type="submit">Update</button>
                    </form>
                    <div className='form'>
                        <label htmlFor='startTime'>Your Off Hours</label>
                        <select name='startTime' id='startTime' onChange={handleTimeChange} value={offHours}>
                            {time.map((t) => (
                                <option key={t.id} value={t.t} id={t.id}>
                                    {t.t}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <h2>Upcoming Appointments</h2>
                        <div className="appointment-cards">
                            {currentAppointments.map((appointment) => (
                                <div key={appointment._id} className="appointment-card">
                                    <h3>{appointment.title}</h3>
                                    <p>Agenda: {appointment.agenda}</p>
                                    <p>Name: {appointment.name}</p>
                                    <p>Slot Time: {appointment.slots.slot_time}</p>
                                    <p>Slot Date: {appointment.slots.slot_date}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
