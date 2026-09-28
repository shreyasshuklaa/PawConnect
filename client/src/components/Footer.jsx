import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            🐾 PawConnect
          </Link>

          <p>
            Connecting paws with people who care.
            Together, we can help animals find loving
            forever homes.
          </p>
        </div>


        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/animals">Find a Pet</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>


        {/* For Shelters */}
        <div className="footer-column">
          <h3>For Shelters</h3>

          <Link to="/register">Register Shelter</Link>
          <Link to="/login">Shelter Login</Link>
        </div>


        {/* Contact */}
        <div className="footer-column">
          <h3>Contact</h3>

          <p>📧 support@pawconnect.com</p>
          <p>📍 India</p>
        </div>

      </div>


      {/* Bottom */}
      <div className="footer-bottom">

        <p>
          © 2026 PawConnect. All rights reserved.
        </p>

        <p>
          Made with ❤️ for animals.
        </p>

      </div>

    </footer>
  );
}

export default Footer;