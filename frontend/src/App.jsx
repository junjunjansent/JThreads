import NavBar from "./components/NavBar/NavBar";
import AppRoutes from "./routes/AppRoutes";

import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";

import "./App.css";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";

const App = () => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      toast.success(`Welcome Back, ${user.username}`);
    }
  }, [user]);
  return (
    <main>
      <section className="navbar">
        <NavBar />
      </section>
      <AppRoutes />
      <ToastContainer />
    </main>
  );
};

export default App;
