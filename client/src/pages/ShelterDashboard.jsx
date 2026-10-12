import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./ShelterDashboard.css";

function ShelterDashboard() {
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    email: "",
    phone: "",
    address: "",
    registrationNumber: "",
  });

  const fetchOrganization = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please login as a shelter.");
      }

      const response = await fetch(
        "http://localhost:5000/api/organizations/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.status === 404) {
        setOrganization(null);
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch organization"
        );
      }

      setOrganization(data.organization);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganization();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/organizations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Organization registration failed"
        );
      }

      setOrganization(data.organization);

      setSuccess(
        "Organization registered successfully. Waiting for admin approval."
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="shelter-dashboard-page">
        <Navbar />
        <p>Loading shelter dashboard...</p>
      </div>
    );
  }

  return (
    <div className="shelter-dashboard-page">
      <Navbar />

      <main className="shelter-dashboard-container">
        <div className="shelter-dashboard-header">
          <span>SHELTER DASHBOARD</span>

          <h1>Welcome to PawConnect</h1>

          <p>
            Register your organization and manage your
            animals and adoption applications.
          </p>
        </div>

        {error && (
          <div className="organization-error">
            {error}
          </div>
        )}

        {success && (
          <div className="organization-success">
            {success}
          </div>
        )}

        {!organization ? (
          <section className="organization-registration">
            <h2>Register Your Organization</h2>

            <p>
              Submit your shelter details for admin verification.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="organization-form-group">
                <label htmlFor="name">
                  Organization Name
                </label>

                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Happy Paws Shelter"
                />
              </div>

              <div className="organization-form-group">
                <label htmlFor="email">
                  Organization Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="shelter@example.com"
                />
              </div>

              <div className="organization-form-group">
                <label htmlFor="phone">Phone</label>

                <input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="organization-form-group">
                <label htmlFor="address">Address</label>

                <input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Enter organization address"
                />
              </div>

              <div className="organization-form-group">
                <label htmlFor="registrationNumber">
                  Registration Number
                </label>

                <input
                  id="registrationNumber"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  placeholder="Optional"
                />
              </div>

              <div className="organization-form-group">
                <label htmlFor="description">
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tell us about your organization"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
              >
                {submitting
                  ? "Submitting..."
                  : "Submit for Approval"}
              </button>
            </form>
          </section>
        ) : (
          <>
            <section className="organization-status-card">
              <h2>{organization.name}</h2>

              <p>
                <strong>Email:</strong> {organization.email}
              </p>

              <p>
                <strong>Address:</strong> {organization.address}
              </p>

              <p>
                <strong>Verification Status:</strong>{" "}
                <span className={`verification-status ${organization.verificationStatus}`}>
                  {organization.verificationStatus}
                </span>
              </p>

              {organization.verificationStatus === "pending" && (
                <p>
                  Your organization is waiting for admin approval.
                </p>
              )}

              {organization.verificationStatus === "rejected" && (
                <p>
                  Your organization was rejected. Please contact
                  the administrator for further information.
                </p>
              )}
            </section>

            {organization.verificationStatus === "approved" && (
              <div className="shelter-dashboard-grid">
                <Link
                  to="/shelter/animals"
                  className="dashboard-card"
                >
                  <div className="dashboard-icon">🐾</div>

                  <h2>Manage Animals</h2>

                  <p>
                    Add and manage your animals available for adoption.
                  </p>
                </Link>

                <Link
                  to="/shelter/applications"
                  className="dashboard-card"
                >
                  <div className="dashboard-icon">📋</div>

                  <h2>Adoption Applications</h2>

                  <p>
                    Review, approve or reject adoption applications.
                  </p>
                </Link>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default ShelterDashboard;