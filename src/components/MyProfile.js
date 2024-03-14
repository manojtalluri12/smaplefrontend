import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
const MyProfile = () => {
  const [username, setusername] = useState();
  const [email, setemail] = useState();
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
  const [data, setdata] = useState();
  const [token, setToken] = useContext(store);
  const [allmsg, setallmsg] = useState([]);
  const [msg, setmsg] = useState("");
  useEffect(() => {
    axios
      .get("https://samplebackend-xr25.onrender.com/myprofile", {
        headers: {
          "x-token": token,
        },
      })
      .then((res) => {
        setdata(res.data);
        setusername(res.data.username);
        setemail(res.data.email);
      })
      .catch((err) => {
        if (err.response) {
          notify(err.response.data.message);
          //alert(err.response.data.message)
          // console.log(err.response.data.message);
        }
      });
    axios
      .get("https://samplebackend-xr25.onrender.com/getmsg", {
        headers: {
          "x-token": token,
        },
      })
      .then((res) => {
        setallmsg(res.data);
        setusername(res.data.username);
        setemail(res.data.email);
      })
      .catch((err) => {
        if (err.response) {
          notify(err.response.data.message);
          //alert(err.response.data.message)
          // console.log(err.response.data.message);
        }
      });
  }, []);

  // console.log(data);
  if (!token) {
    return nav("/login");
  }
  const handledelete = (id) => {
    axios.delete(`https://samplebackend-xr25.onrender.com/delete/${id}`).then((res) => {
      sucess(res.data.message);
      setToken(null);
      return nav("/login");
    });
  };
  const handleUpdate = (id) => {
    axios
      .patch(`https://samplebackend-xr25.onrender.com/edit/${id}`, {
        username: username,
        email: email,
      })
      .then((res) => {
        sucess(res.data.message);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://samplebackend-xr25.onrender.com/addmsg",
        { message: msg },
        {
          headers: {
            "x-token": token,
          },
        }
      )
      .then((res) => {
        setallmsg(res.data);
        sucess(res.data.message);
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
      {data && (
        <div>
          <input
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
          <input value={email} onChange={(e) => setemail(e.target.value)} />
          <button onClick={() => handleUpdate(data._id)}>Update profile</button>
          <button onClick={() => setToken(null)}>logout</button>
          <button onClick={() => handledelete(data._id)}>delete</button>
        </div>
      )}
      <div>
        {allmsg &&
          allmsg.map((each) => {
            return (
              <div>
                <div>
                  <h1>{each.username}</h1>
                  <p>{each.message} </p>
                  
                </div>
              </div>
            );
          })}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Message..."
            value={msg}
            onChange={(e) => setmsg(e.target.value)}
          />
          <button>Message</button>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
