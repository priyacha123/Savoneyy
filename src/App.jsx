import "./App.css";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";


import Savoney from "./components/Savoney";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/SignUp";
import LandingPage from "./components/LandingPage";

function App() {
   const { user } = useUser();

  useEffect(() => {

    if (!user) return;

    fetch("/api/create-user", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        clerkId: user.id,
        email: user.primaryEmailAddress.emailAddress,
        fullName: user.fullName,
      }),
    });

  }, [user]);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Savoney />
            </ProtectedRoute>
          }
        />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;