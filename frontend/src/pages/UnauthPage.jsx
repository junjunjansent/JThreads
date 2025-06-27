import { useNavigate } from "react-router";
import logoImg from "../assets/JThreads_logo.png";
import { PATHS } from "../routes/PATHS";

const UnauthPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div>
          <h1>About This Page You're Looking For..</h1>
          <p>Why don't you login and use our website babes</p>
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
              maxWidth: "20rem", // limit max width to 400px
              maxHeight: "20rem", // limit max height to 300px
              objectFit: "contain", // keep aspect ratio, no cropping
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default UnauthPage;
