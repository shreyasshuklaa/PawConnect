import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        🐾 PawConnect
      </Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/animals">Find a Pet</Link>
        <Link to="/login">Login</Link>
        <Link to="/register" className="register-btn">
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
