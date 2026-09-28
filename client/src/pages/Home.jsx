import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import PetCard from "../components/PetCard";
import "./Home.css";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="home-page">
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="hero">
        <div className="hero-content">

          <span className="hero-badge">
            🐾 Every Paw Deserves a Home
          </span>

          <h1>
            Give a Paw.
            <br />
            <span>Change a Life.</span>
          </h1>

          <p>
            Find loving pets, connect with trusted shelters,
            and help animals find the safe and caring homes
            they deserve.
          </p>

          <div className="hero-buttons">
            <Link to="/animals" className="primary-btn">
              Find a Pet →
            </Link>

            <Link to="/register" className="secondary-btn">
              Join PawConnect
            </Link>
          </div>

          <div className="hero-trust">
            <span>✓ Trusted Shelters</span>
            <span>✓ Verified Listings</span>
            <span>✓ Adoption Support</span>
          </div>

        </div>

        <div className="hero-visual">
          <div className="hero-circle">
            🐕
          </div>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
<section className="stats-section">

  <div className="stat-item">
    <h3>500+</h3>
    <p>Animals Rescued</p>
  </div>

  <div className="stat-item">
    <h3>120+</h3>
    <p>Trusted Shelters</p>
  </div>

  <div className="stat-item">
    <h3>300+</h3>
    <p>Successful Adoptions</p>
  </div>

  <div className="stat-item">
    <h3>1000+</h3>
    <p>Happy Users</p>
  </div>

</section>

{/* ================= HOW IT WORKS ================= */}
<section className="how-it-works">

  <div className="section-heading">
    <span>Simple & Easy</span>
    <h2>How PawConnect Works</h2>
    <p>
      Finding a loving companion has never been easier.
    </p>
  </div>

  <div className="steps-container">

    <div className="step-card">
      <div className="step-icon">🔍</div>
      <span className="step-number">01</span>
      <h3>Find a Pet</h3>
      <p>
        Browse pets from trusted shelters and find
        the one that matches your heart.
      </p>
    </div>

    <div className="step-card">
      <div className="step-icon">📝</div>
      <span className="step-number">02</span>
      <h3>Apply for Adoption</h3>
      <p>
        Submit a simple adoption application and
        tell the shelter why you are a good match.
      </p>
    </div>

    <div className="step-card">
      <div className="step-icon">❤️</div>
      <span className="step-number">03</span>
      <h3>Bring Them Home</h3>
      <p>
        Connect with the shelter, complete the process,
        and give your new friend a forever home.
      </p>
    </div>

  </div>

</section>

{/* ================= SHELTER CTA ================= */}
<section className="shelter-section">

  <div className="shelter-content">

    <span className="shelter-badge">
      For Shelters & NGOs
    </span>

    <h2>
      Help More Animals Find
      <span> Loving Homes.</span>
    </h2>

    <p>
      Join PawConnect and reach more potential adopters.
      Manage your animal listings, receive adoption applications,
      and make the adoption process easier.
    </p>

    <div className="shelter-features">
      <div>✓ Create animal listings</div>
      <div>✓ Manage adoption applications</div>
      <div>✓ Connect with potential adopters</div>
    </div>

    <Link to="/register" className="shelter-btn">
      Register Your Shelter →
    </Link>

  </div>

  <div className="shelter-visual">
    🏠🐕
  </div>

</section>


{/* ================= ABOUT PAWCONNECT ================= */}
<section className="about-section">

  <div className="about-visual">
    🐾❤️
  </div>

  <div className="about-content">

    <span>ABOUT PAWCONNECT</span>

    <h2>
      Connecting Paws With
      <span> People Who Care.</span>
    </h2>

    <p>
      PawConnect is a platform built to make animal adoption
      simpler, safer and more accessible.
    </p>

    <p>
      We connect adopters with trusted shelters and rescue
      organizations, helping animals find caring forever homes.
    </p>

    <Link to="/animals" className="about-btn">
      Explore Available Pets →
    </Link>

  </div>

</section>




      {/* ================= FEATURED PETS ================= */}
      <section className="featured-pets">

        <h2>Meet Our Featured Pets</h2>

        <p>
          These lovely animals are waiting for a loving forever home.
        </p>

        <div className="pet-grid">

          <PetCard
            name="Bruno"
            species="Dog"
            age={2}
            location="Ghaziabad"
          />

          <PetCard
            name="Milo"
            species="Cat"
            age={1}
            location="Delhi"
          />

          <PetCard
            name="Rocky"
            species="Dog"
            age={3}
            location="Noida"
          />

        </div>

        <Link to="/animals" className="view-all-btn">
          View All Pets →
        </Link>

      </section>


      {/* ================= FINAL CTA ================= */}
<section className="final-cta">

  <div className="final-cta-content">

    <span>MAKE A DIFFERENCE</span>

    <h2>
      One Adoption Can
      <br />
      <strong>Change Two Lives.</strong>
    </h2>

    <p>
      Give an animal a second chance and bring a new
      companion into your life.
    </p>

    <Link to="/animals" className="cta-btn">
      Start Your Adoption Journey →
    </Link>

  </div>

</section>
<Footer />

    </div>
  );
}




export default Home;