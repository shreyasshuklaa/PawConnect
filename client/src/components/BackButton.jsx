import { useNavigate } from "react-router-dom";
import "./BackButton.css";

function BackButton({ fallback = "/" }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);

      // Previous page par pahunchne ke baad top par scroll karo.
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant",
        });
      }, 100);
    } else {
      navigate(fallback);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }
  };

  return (
    <button
      type="button"
      className="back-button"
      onClick={handleBack}
      aria-label="Go back to previous page"
      title="Go back"
    >
      <span className="back-arrow" aria-hidden="true">
        ←
      </span>
      <span>Back</span>
    </button>
  );
}

export default BackButton;