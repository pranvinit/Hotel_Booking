import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.scss";

export default function Login() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: null,
    password: null,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      console.log(res.data);
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="login">
      <img src="/assets/bg/login-bg.jpg" alt="" className="bg" />
      <div className="loginContainer">
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button disabled={loading} onClick={handleLogin}>
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
}
