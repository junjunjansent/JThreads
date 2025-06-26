import NavBar from "./components/NavBar/NavBar";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";

import "./App.css";

const App = () => {
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
