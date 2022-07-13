import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Navbar() {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("user");
    await axios.get("/auth/logout");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          Booking.com
        </Link>
        {user ? (
          <div className="items">
            <span className="username">{user.username}</span>
            <button onClick={handleLogout} className="logout">
              Logout
            </button>
          </div>
        ) : (
          <div className="items">
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/login">
              <button>Register</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
