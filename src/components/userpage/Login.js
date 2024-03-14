import React, { useContext, useState } from "react";
import axios from "axios";
import { store } from "../../App";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Login = () => {
  const notify = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const nav = useNavigate();
  const [token, setToken] = useContext(store);
  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  const changeHandle = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://samplebackend-xr25.onrender.com/signin", data)
      .then((res) => setToken(res.data.token))
      .catch((err) => {
        if (err.response) {
          notify(err.response.data.message);
          //alert(err.response.data.message)
          // console.log(err.response.data.message);
        }
      });
  };

  if (token) {
    return nav("/myprofile");
  }
  return (
    <div>
      <h1>Login form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={changeHandle}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={changeHandle}
        />

        <button>login</button>
      </form>
      
    </div>
  );
};

export default Login;
