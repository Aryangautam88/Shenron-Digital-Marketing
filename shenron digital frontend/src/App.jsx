import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";
import Hero from "./pages/Hero";

import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <>
          {/* <Navbar /> */}
          <main>
            <Hero />
          </main>
        </>
      )}
    </>
  );
}

export default App;
