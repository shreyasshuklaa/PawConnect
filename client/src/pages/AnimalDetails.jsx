import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import BackButton from "../components/BackButton";
import "./AnimalDetails.css";

function AnimalDetails() {
  const { id } = useParams();

  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAnimal();
  }, [id]);

  const fetchAnimal = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `http://localhost:5000/api/animals/${id}`
      );

      if (!response.ok) {
        throw new Error("Animal not found");
      }

      const data = await response.json();
      setAnimal(data.animal);
    } catch (error) {
      setError("Unable to load pet details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="animal-details-page">
        <Navbar />
        <main className="animal-details">
          <BackButton fallback="/animals" />
          <p className="details-message">Loading pet details...</p>
        </main>
      </div>
    );
  }

  if (error || !animal) {
    return (
      <div className="animal-details-page">
        <Navbar />

        <main className="animal-details">
          <BackButton fallback="/animals" />

          <div className="details-message">
            <h2>Pet Not Found</h2>
            <p>{error || "This pet could not be found."}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="animal-details-page">
      <Navbar />

      <main className="animal-details">
        <BackButton fallback="/animals" />

        <div className="details-container">
          {/* Pet Image */}
          <div className="details-image">
            <img
              src={
                animal.images?.[0] ||
                "https://placehold.co/700x500?text=Pet"
              }
              alt={animal.name}
            />
          </div>

          {/* Pet Information */}
          <div className="details-content">
            <span className="details-status">
              {animal.adoptionStatus}
            </span>

            <h1>{animal.name}</h1>

            <p className="details-location">
              📍 {animal.location || "Location not available"}
            </p>

            <div className="details-info">
              <div>
                <span>Species</span>
                <strong>{animal.species}</strong>
              </div>

              <div>
                <span>Breed</span>
                <strong>{animal.breed || "Not specified"}</strong>
              </div>

              <div>
                <span>Age</span>
                <strong>{animal.age} years</strong>
              </div>

              <div>
                <span>Gender</span>
                <strong>{animal.gender}</strong>
              </div>
            </div>

            <div className="details-description">
              <h2>About {animal.name}</h2>

              <p>
                {animal.description ||
                  "No description available for this pet."}
              </p>
            </div>

            <Link
              to={`/adopt/${animal._id}`}
              className="adopt-btn"
            >
              Apply for Adoption →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AnimalDetails;