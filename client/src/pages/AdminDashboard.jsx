import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processingId, setProcessingId] = useState("");

  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please login as an admin.");
      }

      const response = await fetch(
        "http://localhost:5000/api/organizations/pending",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch organizations"
        );
      }

      setOrganizations(data.organizations || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const handleAction = async (id, action) => {
    try {
      setProcessingId(id);
      setError("");

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/organizations/${id}/${action}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `Failed to ${action} organization`
        );
      }

      setOrganizations((previous) =>
        previous.filter((organization) => organization._id !== id)
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setProcessingId("");
    }
  };

  return (
    <div className="admin-dashboard">
      <Navbar />

      <main className="admin-dashboard-container">
        <header className="admin-dashboard-header">
          <div>
            <span>ADMINISTRATION</span>
            <h1>Organization Approvals</h1>
            <p>
              Review shelter registrations and help keep PawConnect
              a trusted adoption platform.
            </p>
          </div>

          <div className="admin-header-icon">🛡️</div>
        </header>

        <section className="admin-stats">
          <article className="admin-stat-card">
            <div className="admin-stat-icon">🏢</div>
            <div>
              <h3>{organizations.length}</h3>
              <p>Pending Approvals</p>
            </div>
          </article>

          <article className="admin-stat-card">
            <div className="admin-stat-icon">🔍</div>
            <div>
              <h3>{loading ? "..." : "Review"}</h3>
              <p>Verification Queue</p>
            </div>
          </article>

          <article className="admin-stat-card">
            <div className="admin-stat-icon">🐾</div>
            <div>
              <h3>PawConnect</h3>
              <p>Animal Adoption Platform</p>
            </div>
          </article>
        </section>

        {error && (
          <div className="admin-error">
            <span>{error}</span>
            <button onClick={fetchOrganizations}>
              Retry
            </button>
          </div>
        )}

        <section className="admin-organizations-section">
          <div className="admin-section-header">
            <div>
              <h2>Pending Organizations</h2>
              <p>
                Verify the details before approving a shelter.
              </p>
            </div>

            <span className="admin-pending-count">
              {organizations.length} Pending
            </span>
          </div>

          {loading && (
            <div className="admin-empty">
              Loading organization requests...
            </div>
          )}

          {!loading && !error && organizations.length === 0 && (
            <div className="admin-empty">
              <div className="admin-empty-icon">✓</div>
              <h3>All caught up!</h3>
              <p>
                There are no pending shelter applications right now.
              </p>
              <button
                className="admin-refresh-btn"
                onClick={fetchOrganizations}
              >
                Refresh Requests
              </button>
            </div>
          )}

          {!loading && organizations.length > 0 && (
            <div className="organization-list">
              {organizations.map((organization) => (
                <article
                  className="organization-card"
                  key={organization._id}
                >
                  <div className="organization-card-header">
                    <div className="organization-avatar">🏠</div>

                    <div className="organization-title">
                      <h2>{organization.name}</h2>
                      <span className="pending-status">
                        Pending Verification
                      </span>
                    </div>
                  </div>

                  <div className="organization-details">
                    <p>
                      <strong>Email</strong>
                      <span>{organization.email}</span>
                    </p>

                    <p>
                      <strong>Address</strong>
                      <span>{organization.address}</span>
                    </p>

                    {organization.phone && (
                      <p>
                        <strong>Phone</strong>
                        <span>{organization.phone}</span>
                      </p>
                    )}

                    {organization.registrationNumber && (
                      <p>
                        <strong>Registration No.</strong>
                        <span>{organization.registrationNumber}</span>
                      </p>
                    )}
                  </div>

                  {organization.description && (
                    <div className="organization-description">
                      <strong>About Organization</strong>
                      <p>{organization.description}</p>
                    </div>
                  )}

                  <div className="organization-actions">
                    <button
                      className="approve-btn"
                      disabled={processingId === organization._id}
                      onClick={() =>
                        handleAction(organization._id, "approve")
                      }
                    >
                      {processingId === organization._id
                        ? "Processing..."
                        : "✓ Approve"}
                    </button>

                    <button
                      className="reject-btn"
                      disabled={processingId === organization._id}
                      onClick={() =>
                        handleAction(organization._id, "reject")
                      }
                    >
                      Reject
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;