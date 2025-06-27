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
    const hasRefreshed = sessionStorage.getItem("hasRefreshed");
    if (user && !hasRefreshed) {
      toast.success(`Welcome Back, ${user.username}`);
      sessionStorage.setItem("hasRefreshed", "true");
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
