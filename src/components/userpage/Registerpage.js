import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Registerpage = () => {
  //const [file, setFile] = useState(null);
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
  const sucess = (message) =>
    toast.success(message, {
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
  const [data, setdata] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const changeHandle = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://samplebackend-xr25.onrender.com/registeruser", data)
      .then((res) => {
        sucess(res.data.message);
        nav("/login");
      })
      .catch((err) => {
        if (err.response) {
          notify(err.response.data.message);
          //alert(err.response.data.message)
          // console.log(err.response.data.message);
        }
      });
  };
  return (
    <div>
      <h1>Register form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="name"
          onChange={changeHandle}
        />
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
        <input
          type="password"
          name="confirmpassword"
          placeholder="confirmpassword"
          onChange={changeHandle}
        />

        <button>Register</button>
      </form>
    </div>
  );
};

export default Registerpage;
