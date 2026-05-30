import "./App.css";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import Savoney from "./components/Savoney";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/SignUp";
import LandingPage from "./components/LandingPage";
import { createUser } from "./lib/api";

function App() {
  const { user, isLoaded } = useUser();
  const clerkId = user?.id;
  const email = user?.primaryEmailAddress?.emailAddress || user?.emailAddresses?.[0]?.emailAddress || "";
  const fullName = user?.fullName || "";

  useEffect(() => {
    if (!isLoaded || !clerkId) return;

    createUser({
        clerkId,
        email,
        fullName,
      }).catch((error) => {
        console.error("Failed to sync Clerk user", error);
      });
  }, [isLoaded, clerkId, email, fullName]);

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
