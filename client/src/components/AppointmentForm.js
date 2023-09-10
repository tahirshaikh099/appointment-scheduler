import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { time } from "../utils/resource";
import { toast } from "react-toastify";
import { handleAgendaSubmit, getAllUser } from "../utils/resource";

const AppointmentDateSelector = () => {

    const [selectedDate, setSelectedDate] = useState('');
    const [title, setTitle] = useState('');
    const [agenda, setAgenda] = useState('');
    const [userList, setUserList] = useState([]);
    const [withAppointment, setWithAppointment] = useState('');
    const [schedule, setSchedule] = useState("");

    const myEmail = localStorage.getItem('_myEmail');

    useEffect(() => {
        getAllUser()
            .then((data) => {
                const filteredUsers = data.filter((user) => user.email !== myEmail);
                setUserList(filteredUsers);
            })
            .catch((error) => console.error(error));
    }, [myEmail]);


    const handleTimeChange = (e) => {
        const { value } = e.target;
        if (value === "Select") return;
        setSchedule(value); // Set the selected time directly as a string
    };


    const getNextWeekdays = () => {
        const weekdays = [];
        const currentDate = new Date();
        let dayCount = 0;

        while (weekdays.length < 6) {
            const nextDate = new Date(currentDate);
            nextDate.setDate(currentDate.getDate() + dayCount);
            const dayOfWeek = nextDate.getDay();
            if (dayOfWeek >= 1 && dayOfWeek <= 5) {
                weekdays.push(nextDate);
            }
            dayCount++;
        }
        return weekdays;
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
      
        // Prepare the form data
        const formData = {
          title,
          agenda,
          selectedDate,
          myEmail,
          schedule,
          withAppointment,
        };
      
        console.log("formData:- ", formData);
      
        // Call the submitAgenda function with the form data
        handleAgendaSubmit(formData)
          .then((response) => {
            // Handle the response
            console.log('Agenda submitted successfully:', response);
      
            // Check if the response contains a 400 status code with the expected message
            if (response.status === 400 && response.data.message === "This slot is not available for booking") {
              // Show a toast message for the error
              toast.error("This slot is not available for booking, Please select next slot", {
                position: "top-right",
                autoClose: 3000, // Close the message after 3 seconds
              });
            } else {
              // Show a success message
              toast.success("Agenda submitted successfully", {
                position: "top-right",
                autoClose: 3000, // Close the message after 3 seconds
              });
            }
          })
          .catch((error) => {
            // Handle other errors, e.g., show a general error message
            console.error('Error submitting agenda:', error);
            toast.error("Error submitting agenda", {
              position: "top-right",
              autoClose: 3000,
            });
          });
      };
      
    const weekdays = getNextWeekdays();


    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleGetUserdetails = (event) => {
        setWithAppointment(event.target.value);
    }

    return (
        <main className="App">
            <Link to="/profile">Go to Profile</Link>
            <h1>Schedule meetings</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title"> Title: </label><input id='meetingTitle' name='title' required type='text' value={title} onChange={(e) => setTitle(e.target.value)} />

                    <label htmlFor="agenda"> Agenda: </label><input id='meetingAgenda' name='agenda' required type='text' value={agenda} onChange={(e) => setAgenda(e.target.value)} />

                    <div className='form'>
                        <label htmlFor="slot">Choose your slot: </label>
                        <input type="date" value={selectedDate} onChange={handleDateChange} min={weekdays[0].toISOString().split('T')[0]} max={weekdays[weekdays.length - 1].toISOString().split('T')[0]} />
                    </div>
                    <span className="validity"></span>
                    <div className='form'>
                        <label htmlFor='startTime'>Time</label>
                        <select
                            name='startTime'
                            id='startTime'
                            onChange={handleTimeChange}
                            value={schedule}
                        >
                            {time.map((t) => (
                                <option key={t.id} value={t.t} id={t.id}>
                                    {t.t}
                                </option>
                            ))}
                        </select>
                    
                    <div className='select__wrapper'>
                        <label htmlFor='appointment'>Guest</label>
                        <select
                            name='appointment'
                            id='appointment'
                            onChange={handleGetUserdetails}
                            value={withAppointment}
                        >
                            <option value='' key='defaultOption'>
                                Select a user
                            </option>
                            {userList.map((user) => (
                                <option key={user.fullName} value={user.fullName}>
                                    {user.fullName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <button className='signupButton' type="submit">Submit</button>
            </div>
        </form>
        </main >
    );
};

export default AppointmentDateSelector;