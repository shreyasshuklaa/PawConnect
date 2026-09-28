import { Link } from "react-router-dom";

function PetCard({
  id,
  name,
  species,
  age,
  location,
  image,
}) {
  return (
    <Link to={`/animals/${id}`} className="pet-card-link">

      <div className="pet-card">

        <div className="pet-image">
          <img
            src={image || "https://placehold.co/600x400?text=Pet"}
            alt={name}
          />
        </div>

        <div className="pet-info">
          <h3>{name}</h3>
          <p>
            {species} • {age} years
          </p>
          <p>📍 {location}</p>
        </div>

      </div>

    </Link>
  );
}

export default PetCard;