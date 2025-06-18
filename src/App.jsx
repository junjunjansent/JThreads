import NavBar from "./components/NavBar/NavBar";
import AppRoutes from "./routes/AppRoutes";

import "./App.css";

const App = () => {
  return (
    <main>
      <section className="navbar">
        <NavBar />
      </section>
      <AppRoutes />
    </main>
  );
};

export default App;
