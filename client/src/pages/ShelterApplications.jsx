import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./ShelterApplications.css";

function ShelterApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login as a shelter.");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/adoptions/organization",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch applications"
        );
      }

      setApplications(data.applications || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleAction = async (applicationId, action) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/adoptions/${applicationId}/${action}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `Failed to ${action} application`
        );
      }

      // Refresh applications after action
      fetchApplications();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="shelter-applications-page">
      <Navbar />

      <main className="shelter-applications-container">
        <div className="applications-header">
          <span> SHELTER DASHBOARD</span>
          <h1>Adoption Applications</h1>
          <p>
            Review and manage adoption applications submitted
            for your animals.
          </p>
        </div>

        {loading && (
          <div className="applications-message">
            Loading applications...
          </div>
        )}

        {error && (
          <div className="applications-error">
            {error}
          </div>
        )}

        {!loading && !error && applications.length === 0 && (
          <div className="applications-message">
            No adoption applications found.
          </div>
        )}

        {!loading && applications.length > 0 && (
          <div className="applications-list">
            {applications.map((application) => (
              <div
                className="application-card"
                key={application._id}
              >
                <div className="application-top">
                  <div>
                    <h2>
                      {application.animal?.name || "Unknown Animal"}
                    </h2>

                    <p className="animal-info">
                      {application.animal?.species} •{" "}
                      {application.animal?.breed} •{" "}
                      {application.animal?.age} years •{" "}
                      {application.animal?.gender}
                    </p>
                  </div>

                  <span
                    className={`application-status ${application.status}`}
                  >
                    {application.status}
                  </span>
                </div>

                <div className="applicant-info">
                  <h3>Applicant</h3>

                  <p>
                    <strong>Name:</strong>{" "}
                    {application.applicant?.name || "N/A"}
                  </p>

                  <p>
                    <strong>Email:</strong>{" "}
                    {application.applicant?.email || "N/A"}
                  </p>
                </div>

                <div className="application-message">
                  <h3>Message</h3>

                  <p>{application.message}</p>
                </div>

                {application.status === "pending" && (
                  <div className="application-actions">
                    <button
                      className="approve-btn"
                      onClick={() =>
                        handleAction(
                          application._id,
                          "approve"
                        )
                      }
                    >
                      Approve
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() =>
                        handleAction(
                          application._id,
                          "reject"
                        )
                      }
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default ShelterApplications;