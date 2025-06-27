import { useNavigate } from "react-router";
import logoImg from "../assets/JThreads_logo.png";
import { PATHS } from "../routes/PATHS";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div>
          <h1>Welcome to JThreads</h1>
          <p>
            Discover a calm, modern platform built with care. Whether you're
            here to learn, create, or just breathe — you're in the right place.
          </p>
          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <button onClick={() => navigate(PATHS.PUBLIC.SIGN_UP)}>
              Don't have an Account? what an L...
            </button>
            <button onClick={() => navigate(PATHS.PUBLIC.SIGN_IN)}>
              Login like a W
            </button>
          </div>
        </div>

        <div>
          <img
            src={logoImg}
            alt="Logo"
            style={{
              width: "100%",
              maxWidth: "20rem",
              maxHeight: "20rem",
              objectFit: "contain",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
