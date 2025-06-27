import { useLocation } from "react-router";

const AboutEditProfilePage = () => {
  const location = useLocation();
  const userProfile = location.state?.userProfile;
  return (
    <>
      <h1>AboutEditProfilePage</h1>
      <pre>{JSON.stringify(userProfile, null, 2)}</pre>
    </>
  );
};

export default AboutEditProfilePage;
