import { useState } from "react";
import "./App.css";
import ImageConverter from "./Components/ImageConverter.jsx";
import CropImage from "./Components/CropImage.jsx";
import ResizerImage from "./Components/ResizerImage.jsx";
import Header from "./Components/UI/Header.jsx";
import ImageEffect from "./Components/ImageEffect.jsx";
import Footer from "./Components/UI/Footer.jsx";
import LandingPage from "./Components/LandingPage.jsx";

function App() {
  const [activeTab, setActiveTab] = useState("");
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse top-20 -left-48"></div>
        <div className="absolute w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse bottom-20 -right-48"></div>
        <div className="absolute w-96 h-96 bg-pink-500 rounded-full filter blur-3xl opacity-20 animate-pulse top-1/2 left-1/2 transform -translate-x-1/2"></div>
      </div>

      {/* Top Navbar */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "resize" && <ResizerImage />}
      {activeTab === "convert" && <ImageConverter />}
      {activeTab === "crop" && <CropImage />}
      {activeTab === "effects" && <ImageEffect />}
      {activeTab === "" && <LandingPage setActiveTab={setActiveTab} />}
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
