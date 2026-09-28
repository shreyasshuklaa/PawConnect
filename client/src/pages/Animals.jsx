import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PetCard from "../components/PetCard";
import "./Animals.css";

function Animals() {
  const [animals, setAnimals] = useState([]);
  const [search, setSearch] = useState("");
  const [species, setSpecies] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAnimals();
  }, []);

  const fetchAnimals = async () => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      if (search) {
        params.append("location", search);
      }

      if (species) {
        params.append("species", species);
      }

      if (gender) {
        params.append("gender", gender);
      }

      const response = await fetch(
        `http://localhost:5000/api/animals?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch animals");
      }

      const data = await response.json();

      setAnimals(data.animals);
    } catch (error) {
      setError("Unable to load animals. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchAnimals();
  };

  return (
    <div className="animals-page">

      <Navbar />

      {/* ================= PAGE HEADER ================= */}
      <section className="animals-header">
        <div>
          <span>FIND YOUR COMPANION</span>

          <h1>Find a Pet</h1>

          <p>
            Discover loving animals from trusted shelters
            waiting for their forever home.
          </p>
        </div>
      </section>


      {/* ================= SEARCH & FILTER ================= */}
      <section className="animal-search-section">

        <form
          className="animal-search"
          onSubmit={handleSearch}
        >

          <input
            type="text"
            placeholder="Search by breed or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
          >
            <option value="">All Species</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="other">Other</option>
          </select>

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">All Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <button type="submit">
            Search
          </button>

        </form>

      </section>


      {/* ================= PET LIST ================= */}
      <section className="animals-list">

        <div className="animals-list-header">
          <div>
            <h2>Available Pets</h2>
            <p>Find your perfect companion.</p>
          </div>
        </div>


        {loading && (
          <p>Loading pets...</p>
        )}


        {error && (
          <p>{error}</p>
        )}


        {!loading && !error && animals.length === 0 && (
          <p>No pets match your search.</p>
        )}


        {!loading && !error && animals.length > 0 && (
          <div className="animal-grid">

            {animals.map((animal) => (
              <PetCard
                key={animal._id}
                id={animal._id}
                name={animal.name}
                species={animal.species}
                age={animal.age}
                location={animal.location}
                image={animal.images?.[0]}
              />
            ))}

          </div>
        )}

      </section>

    </div>
  );
}

export default Animals;