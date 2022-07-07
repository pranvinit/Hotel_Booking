import "./navbar.scss";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="container">
        <span className="logo">Booking.com</span>
        <div className="items">
          <button>Login</button>
          <button>Register</button>
        </div>
      </div>
    </div>
  );
}
