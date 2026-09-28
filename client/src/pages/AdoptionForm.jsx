import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./AdoptionForm.css";

function AdoptionForm() {
  const { id } = useParams();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login before applying for adoption.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/adoptions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            animal: id,
            message,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to submit application"
        );
      }

      setSuccess(
        "Your adoption application has been submitted successfully!"
      );

      setMessage("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="adoption-page">

      <Navbar />

      <main className="adoption-container">

        <Link to={`/animals/${id}`} className="back-link">
          ← Back to Pet
        </Link>

        <div className="adoption-card">

          <div className="adoption-header">
            <span>ADOPTION APPLICATION</span>

            <h1>Give a Pet a Forever Home</h1>

            <p>
              Tell the shelter a little about why you would
              be a great adopter.
            </p>
          </div>


          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label htmlFor="message">
                Why would you like to adopt this pet?
              </label>

              <textarea
                id="message"
                rows="7"
                placeholder="Tell us about yourself, your home, and why you would like to adopt..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />

            </div>


            {success && (
              <div className="success-message">
                {success}
              </div>
            )}


            {error && (
              <div className="error-message">
                {error}
              </div>
            )}


            <button
              type="submit"
              className="submit-adoption-btn"
              disabled={loading}
            >
              {loading
                ? "Submitting..."
                : "Submit Adoption Application →"}
            </button>

          </form>

        </div>

      </main>

    </div>
  );
}

export default AdoptionForm;