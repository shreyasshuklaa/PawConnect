import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "adopter",

    organizationName: "",
    organizationDescription: "",
    phone: "",
    address: "",
    registrationNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // =========================
      // 1. CREATE USER
      // =========================
      const registerResponse = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role,
          }),
        }
      );

      const registerData = await registerResponse.json();

      if (!registerResponse.ok) {
        throw new Error(
          registerData.message || "Registration failed"
        );
      }

      // =========================
      // 2. IF SHELTER
      // LOGIN FIRST TO GET TOKEN
      // =========================
      if (formData.role === "shelter") {
        const loginResponse = await fetch(
          "http://localhost:5000/api/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
            }),
          }
        );

        const loginData = await loginResponse.json();

        if (!loginResponse.ok) {
          throw new Error(
            loginData.message || "Shelter login failed"
          );
        }

        const token = loginData.token;

        // =========================
        // 3. CREATE ORGANIZATION
        // =========================
        const organizationResponse = await fetch(
          "http://localhost:5000/api/organizations",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name: formData.organizationName,
              description: formData.organizationDescription,
              email: formData.email,
              phone: formData.phone,
              address: formData.address,
              registrationNumber:
                formData.registrationNumber,
            }),
          }
        );

        const organizationData =
          await organizationResponse.json();

        if (!organizationResponse.ok) {
          throw new Error(
            organizationData.message ||
              "Organization registration failed"
          );
        }

        setSuccess(
          "Shelter registered successfully. Waiting for admin approval."
        );
      } else {
        setSuccess(
          "Registration successful! Redirecting to login..."
        );
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "adopter",
        organizationName: "",
        organizationDescription: "",
        phone: "",
        address: "",
        registrationNumber: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1800);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <main className="register-page">
        <div className="register-card">

          <span className="register-label">
            JOIN PAWCONNECT
          </span>

          <h1>Create your account</h1>

          <p className="register-description">
            Join PawConnect and help animals find a safe and
            loving home.
          </p>

          <form onSubmit={handleSubmit}>

            {/* USER NAME */}
            <div className="register-form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* EMAIL */}
            <div className="register-form-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="register-form-group">
              <label>Password</label>

              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
              />
            </div>

            {/* ROLE */}
            <div className="register-form-group">
              <label>Account Type</label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="adopter">
                  Adopter
                </option>

                <option value="shelter">
                  Shelter / Organization
                </option>
              </select>
            </div>

            {/* SHELTER DETAILS */}
            {formData.role === "shelter" && (
              <>
                <hr />

                <h2>Organization Details</h2>

                <div className="register-form-group">
                  <label>Organization Name</label>

                  <input
                    type="text"
                    name="organizationName"
                    placeholder="Happy Paws Shelter"
                    value={formData.organizationName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="register-form-group">
                  <label>Phone</label>

                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="register-form-group">
                  <label>Address</label>

                  <input
                    type="text"
                    name="address"
                    placeholder="Enter organization address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="register-form-group">
                  <label>Registration Number</label>

                  <input
                    type="text"
                    name="registrationNumber"
                    placeholder="Optional"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                  />
                </div>

                <div className="register-form-group">
                  <label>Description</label>

                  <textarea
                    name="organizationDescription"
                    placeholder="Tell us about your organization"
                    value={formData.organizationDescription}
                    onChange={handleChange}
                    rows="4"
                  />
                </div>
              </>
            )}

            {error && (
              <div className="register-error">
                {error}
              </div>
            )}

            {success && (
              <div className="register-success">
                {success}
              </div>
            )}

            <button
              type="submit"
              className="register-submit-btn"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create Account →"}
            </button>

          </form>

          <p className="register-footer">
            Already have an account?{" "}
            <Link to="/login">
              Login
            </Link>
          </p>

        </div>
      </main>
    </div>
  );
}

export default Register;