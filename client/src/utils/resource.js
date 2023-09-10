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
];

export async function handleLogin(email, password, navigate) {
    console.log("email----", email, password);
    let data = { "email": email, "password": password };
    try {
        const response = await axios.post('https://appointment-scheduler-bwez.onrender.com//api/signin', data);
        console.log("response data:- ", response.data.user._id);
        if (response.error_message) {
            toast.error(response.error_message);
        } else {
            toast.success(response.message);
            localStorage.setItem("_id", response.data.user._id);
            localStorage.setItem("_myEmail", response.data.user.email);
            navigate("/dashboard");
        }
    } catch (err) {
        console.error(err);
    }
}
export async function handleRegister(email, firstName, lastName, password, navigate) {
    let data = { "firstName": firstName, "lastName": lastName, "email": email, "password": password };
    try {
        const response = await axios.post('https://appointment-scheduler-bwez.onrender.com//api/signup', data);
        if (response.error_message) {
            toast.error(response.error_message);
        } else {
            toast.success(response.message);
            localStorage.setItem("_id", response.data.user._id);
            localStorage.setItem("_myEmail", response.data.user.email);
            navigate("/dashboard");
        }
    } catch (err) {
        console.error(err);
        toast.error("Account creation failed");
    }
}

export async function getAllUser() {
    try {
        const response = await axios.get('https://appointment-scheduler-bwez.onrender.com//api/getalluser');
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

export async function handleAgendaSubmit(title, agenda, email, selectedDate, schedule, withAppointment) {
    let data = { "title": title, "agenda": agenda, "email": email, "slot_date": selectedDate, "slot_time": schedule, "appointmentWith": withAppointment }
    console.log("data", data);
    try {
        const response = await axios.post('https://appointment-scheduler-bwez.onrender.com//api/createAppointments',data);
        if (response.error_message) {
            toast.error(response.error_message);
        }
        // navigate(`/profile/${localStorage.getItem("_id")}`);
    } catch (err) {
        console.error(err);
    }
}
export function getAllAppointment(){
    
}
