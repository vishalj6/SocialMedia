import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { login } = useContext(AuthContext);

  const [err, setErr] = useState(null);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (currentUser) {
      navigate("/")
    }
  }, [currentUser, navigate])

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      toast.success('successful', {
        position: "top-center",
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
    catch (err) {
      console.log(err);
      setErr(err);
      if (err?.response?.status === 401) {
        toast.error("Email or Password can't be Empty", {
          position: "top-center",
        });
      }
      else if (err?.response?.status === 400) {
        toast.error("Wrong Login credentials", {
          position: "top-center",
        });
      }
    }
  };

  return (
    <>
      <div className="loginmain">
        <div className="login">
          <div className="card">
            <div className="left">
              <div className="bgc">
                <img src={require('../../Others/screenshot3.png')} alt="" />
                {/* <img src={require('../../Others/screenshot4.png')} alt="" /> */}
              </div>
            </div>
            <div className="right">
              <div className="card1">
                <h1>SocialPulse</h1>
                <form>
                  <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                  />
                  <button onClick={handleLogin}>Log in</button>
                </form>
                <p>Forgot Password?</p>
              </div>
              <div className="card2">
                <p>Don't have an account?
                  <Link to="/register">
                    <span> Sign Up </span>
                  </Link>
                </p>
              </div>
              <p>{err && err}</p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;