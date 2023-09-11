import { toast } from "react-toastify";
import axios from "axios";

export const time = [
    { id: "null", t: "Select" },
    { id: "9", t: "9:00am - 10:00am" },
    { id: "10", t: "10:00am - 11:00am" },
    { id: "11", t: "11:00am - 12:00pm" },
    { id: "12", t: "12:00pm - 01:00pm" },
    { id: "13", t: "01:00pm - 02:00pm" },
    { id: "14", t: "02:00pm - 03:00pm" },
    { id: "15", t: "03:00pm - 04:00pm" },
    { id: "16", t: "04:00pm - 05:00pm" },
    { id: "17", t: "05:00pm - 06:00pm" },
    { id: "18", t: "06:00pm - 07:00pm" },
]

export async function handleLogin(email, password, navigate) {
    // console.log("email----", email, password);
    let data = { "email": email, "password": password };
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (emailRegex.test(email)) {
        try {
            const response = await axios.post('https://appointment-scheduler-bwez.onrender.com/api/signin', data);
            console.log("response data:- ", response.data.user._id);
            if (response.error_message) {
                toast.success("Something went wrong!", {
                    position: "top-right",
                    autoClose: 3000, // Close the message after 3 seconds
                });
            } else {
                toast.success("Logged In succesfully", {
                    position: "top-right",
                    autoClose: 3000,
                });
                localStorage.setItem("_id", response.data.user._id);
                localStorage.setItem("_myEmail", response.data.user.email);
                navigate("/dashboard");
            }
        } catch (err) {
            console.error(err);
        }
    } else {
        toast.error("Invalid email address", {
            position: "top-right",
            autoClose: 3000,
        });
    }
}

export async function handleRegister(email, firstName, lastName, password, navigate) {
    let data = { "firstName": firstName, "lastName": lastName, "email": email, "password": password };
    try {
        const response = await axios.post('https://appointment-scheduler-bwez.onrender.com/api/signup', data);
        if (response.error_message) {
            toast.error(response.error_message);
        } else {
            toast.success("User created successfully", {
                position: "top-right",
                autoClose: 3000, // Close the message after 3 seconds
            });
            localStorage.setItem("_id", response.data.user._id);
            localStorage.setItem("_myEmail", response.data.user.email);
            navigate("/dashboard");
        }
    } catch (err) {
        console.error(err);
        toast.error("Something went wrong", {
            position: "top-right",
            autoClose: 3000, // Close the message after 3 seconds
        });
    }
}

export async function getAllUser() {
    try {
        const response = await axios.get('https://appointment-scheduler-bwez.onrender.com/api/getalluser');
        if (response.error_message) {
            toast.error(response.error_message);
        } else {
            return response.data.users;
        }
    } catch (err) {
        console.error(err);
        toast.error("No user exists");
    }
}

export async function handleAgendaSubmit(formData) {
    let data = {
        "title": formData.title,
        "agenda": formData.agenda,
        "slot_date": formData.selectedDate,
        "email": formData.email,
        "slot_time": formData.schedule,
        "name": formData.withAppointment
    };

    console.log("data", data);
    try {
        const response = await axios.post('https://appointment-scheduler-bwez.onrender.com/api/createAppointments', data);
        if (response.error_message) {
            toast.error(response.error_message);
        }else{
            return toast.success("Agenda submitted successfully",);
        }
        // navigate(`/profile/${localStorage.getItem("_id")}`);
    } catch (err) {
        console.error(err);
    }
}



export function getAllAppointment() {

}
