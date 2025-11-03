import { useState, useEffect } from "react";
import SplashScreen from "./components/SplashScreen";
import Loader from "./components/Loader";
import AuthForm from "./components/AuthForm";
import HomePage from "./components/HomePage";

export default function App() {
  const [stage, setStage] = useState("splash");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (stage === "splash") {
      setTimeout(() => setStage("loader"), 3000);
    } else if (stage === "loader") {
      setTimeout(() => setStage(token ? "home" : "auth"), 2000);
    }
  }, [stage]);

  if (stage === "splash") return <SplashScreen onFinish={() => setStage("loader")} />;
  if (stage === "loader") return <Loader />;
  if (stage === "auth") return <AuthForm onAuthSuccess={() => setStage("home")} />;
  return <HomePage />;
}
