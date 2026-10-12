import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        🐾 PawConnect
      </Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>

        {!token && (
          <>
            <Link to="/animals">Find a Pet</Link>

            <Link to="/login">Login</Link>

            <Link to="/register" className="register-btn">
              Register
            </Link>
          </>
        )}

        {token && user?.role === "adopter" && (
          <>
            <Link to="/animals">Find a Pet</Link>

            <Link to="/adopter/applications">
              My Applications
            </Link>

            <button
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </button>
          </>
        )}

        {token && user?.role === "shelter" && (
          <>
            <Link to="/shelter/dashboard">
              Shelter Dashboard
            </Link>

            <Link to="/shelter/applications">
              Adoption Applications
            </Link>

            <button
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;