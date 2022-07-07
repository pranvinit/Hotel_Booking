import "./navbar.scss";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          Booking.com
        </Link>
        <div className="items">
          <button>Login</button>
          <button>Register</button>
        </div>
      </div>
    </div>
  );
}
