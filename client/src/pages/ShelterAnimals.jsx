import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./ShelterAnimals.css";

function ShelterAnimals() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [adding, setAdding] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    species: "dog",
    breed: "",
    age: "",
    gender: "male",
    description: "",
    location: "",
  });

  const fetchAnimals = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please login as a shelter.");
      }

      const response = await fetch(
        "http://localhost:5000/api/animals/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch animals"
        );
      }

      setAnimals(data.animals || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddAnimal = async (e) => {
    e.preventDefault();

    try {
      setAdding(true);
      setError("");
      setSuccess("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please login as a shelter.");
      }

      const response = await fetch(
        "http://localhost:5000/api/animals",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            age: Number(formData.age),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to add animal"
        );
      }

      setSuccess("Animal added successfully!");

      setFormData({
        name: "",
        species: "dog",
        breed: "",
        age: "",
        gender: "male",
        description: "",
        location: "",
      });

      fetchAnimals();
    } catch (error) {
      setError(error.message);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="shelter-animals-page">
      <Navbar />

      <main className="shelter-animals-container">

        {/* Header */}
        <div className="shelter-animals-header">
          <span>SHELTER DASHBOARD</span>

          <h1>Manage Animals</h1>

          <p>
            Add and manage animals available for adoption.
          </p>
        </div>

        {/* Add Animal */}
        <section className="add-animal-section">
          <h2>Add New Animal</h2>

          <form
            onSubmit={handleAddAnimal}
            className="add-animal-form"
          >
            <div className="form-group">
              <label>Animal Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter animal name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Species</label>

              <select
                name="species"
                value={formData.species}
                onChange={handleChange}
              >
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Breed</label>

              <input
                type="text"
                name="breed"
                placeholder="Enter breed"
                value={formData.breed}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Age</label>

              <input
                type="number"
                name="age"
                placeholder="Enter age"
                min="0"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Gender</label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="form-group">
              <label>Location</label>

              <input
                type="text"
                name="location"
                placeholder="Enter location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label>Description</label>

              <textarea
                name="description"
                placeholder="Enter animal description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
              />
            </div>

            <button
              type="submit"
              className="add-animal-btn"
              disabled={adding}
            >
              {adding ? "Adding..." : "Add Animal"}
            </button>
          </form>
        </section>

        {/* Messages */}
        {success && (
          <div className="animals-success">
            {success}
          </div>
        )}

        {error && (
          <div className="animals-error">
            {error}
          </div>
        )}

        {/* Animals */}
        <section className="animals-section">
          <div className="animals-section-header">
            <h2>My Animals</h2>

            <span>
              {animals.length} animal
              {animals.length !== 1 ? "s" : ""}
            </span>
          </div>

          {loading && (
            <div className="animals-message">
              Loading animals...
            </div>
          )}

          {!loading && !error && animals.length === 0 && (
            <div className="animals-message">
              No animals found.
            </div>
          )}

          {!loading && animals.length > 0 && (
            <div className="shelter-animals-list">
              {animals.map((animal) => (
                <div
                  className="shelter-animal-card"
                  key={animal._id}
                >
                  <div className="animal-card-content">
                    <h2>{animal.name}</h2>

                    <p>
                      <strong>Species:</strong>{" "}
                      {animal.species}
                    </p>

                    <p>
                      <strong>Breed:</strong>{" "}
                      {animal.breed || "Unknown breed"}
                    </p>

                    <p>
                      <strong>Age:</strong>{" "}
                      {animal.age} years
                    </p>

                    <p>
                      <strong>Gender:</strong>{" "}
                      {animal.gender}
                    </p>

                    {animal.location && (
                      <p>
                        <strong>Location:</strong>{" "}
                        {animal.location}
                      </p>
                    )}

                    {animal.description && (
                      <p className="animal-description">
                        {animal.description}
                      </p>
                    )}
                  </div>

                  <span
                    className={`animal-status ${animal.adoptionStatus}`}
                  >
                    {animal.adoptionStatus}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}

export default ShelterAnimals;