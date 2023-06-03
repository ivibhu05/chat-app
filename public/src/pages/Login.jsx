import React, { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../assets/logo.svg";
import { FormContainer } from '../style/register';
import { loginRoute } from '../utils/APIRoutes';

const Register = () => {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const { password, username } = values;
            const { data } = await axios.post(loginRoute, {
                username,
                password,
            });
            console.log(data);
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }
            else {
                localStorage.setItem('chat-app-user', JSON.stringify(data.user))
                navigate("/");
            }
        }
    };

    const handleValidation = () => {
        const { password,  username, } = values;
        if (password ==="") {
            toast.error("Password is required!", toastOptions);
            return false;
        } else if (username==="") {
            toast.error("Username is required!", toastOptions);
            return false;
        } 
        return true;
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className='brand'>
                        <img src={Logo} alt='Logo' />
                        <h1>Snappy</h1>
                    </div>
                    <input type='text' placeholder='Username' name="username" onChange={(e) => handleChange(e)} />
                    <input type='password' placeholder='Password' name="password" onChange={(e) => handleChange(e)} />
                    <button type='submit'>Login</button>
                    <span>Don't have an account? <Link to="/register">Register</Link></span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    )
}

export default Register;