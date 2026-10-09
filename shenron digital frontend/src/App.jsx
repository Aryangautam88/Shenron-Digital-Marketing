import React from "react";
import Preloader from "./components/Preloader";
// import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";

function App() {
    return (
        <>
            <Preloader />

            {/* <Navbar /> */}
            <Hero />

            {/* Baaki existing sections yahan same rahenge */}
        </>
    );
}

export default App;