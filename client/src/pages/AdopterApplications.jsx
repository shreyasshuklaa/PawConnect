import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./AdopterApplications.css";

function AdopterApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login as an adopter.");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/adoptions/my",
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

  return (
    <div className="adopter-applications-page">
      <Navbar />

      <main className="adopter-applications-container">
        <div className="adopter-applications-header">
          <span>ADOPTER DASHBOARD</span>

          <h1>My Applications</h1>

          <p>
            Track the status of your pet adoption applications.
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

        {!loading &&
          !error &&
          applications.length === 0 && (
            <div className="applications-message">
              You have not submitted any adoption applications yet.
            </div>
          )}

        {!loading &&
          !error &&
          applications.length > 0 && (
            <div className="adopter-applications-list">
              {applications.map((application) => (
                <div
                  className="adopter-application-card"
                  key={application._id}
                >
                  <div className="application-card-top">
                    <div>
                      <h2>
                        {application.animal?.name ||
                          "Unknown Animal"}
                      </h2>

                      <p className="animal-info">
                        {application.animal?.species} •{" "}
                        {application.animal?.breed} •{" "}
                        {application.animal?.age} years •{" "}
                        {application.animal?.gender}
                      </p>
                    </div>

                    <span
                      className={`adopter-application-status ${application.status}`}
                    >
                      {application.status}
                    </span>
                  </div>

                  <div className="organization-info">
                    <h3>Organization</h3>

                    <p>
                      <strong>Name:</strong>{" "}
                      {application.organization?.name || "N/A"}
                    </p>

                    <p>
                      <strong>Email:</strong>{" "}
                      {application.organization?.email || "N/A"}
                    </p>
                  </div>

                  <div className="adopter-application-message">
                    <h3>Your Message</h3>

                    <p>{application.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
      </main>
    </div>
  );
}

export default AdopterApplications;