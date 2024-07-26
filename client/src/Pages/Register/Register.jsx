import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Register.scss"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        name: "",
    });
    const [err, setErr] = useState(null);

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };


    const handleClick = async (e) => {
        e.preventDefault();

        try {
            await axios.post("/auth/register", inputs)
                .then((result) => {
                    console.log("submit data", result?.data);
                    navigate("/login");
                });
        } catch (err) {
            if (err.response.status === 401) {
                // console.log(err, err.response);
                toast.warn("Username or Password invalid", {
                    position: "top-center",
                });
            }
            if (err.response.status === 500) {
                toast.error("Username or Password can't be Empty", {
                    position: "top-center",
                });
            }
            console.log(err);
            setErr(err.response.data);
        }
    };

    return (
        <>

            <div className="main_register">
                <div className="right">
                    <div className="card1">
                        <h1>SocialPulse</h1>
                        <p>Sign up to see photos and videos from your friends.</p>
                        <form>
                            <input
                                type="text"
                                placeholder="Username"
                                name="username"
                                onChange={handleChange}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                placeholder="Name"
                                name="name"
                                onChange={handleChange}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                            />
                            {err && err}
                            <button onClick={handleClick}>Log in</button>
                        </form>
                        <p className='terms'>By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .</p>
                    </div>
                    <div className="card2">
                        <p>Have an account?
                            <Link to="/login">
                                <span> Log in </span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Register