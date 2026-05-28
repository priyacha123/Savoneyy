import "./App.css";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

import LandingPage from "./components/LandingPage";
import Savoney from "./pages/Main";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/SignUp";

function App() {
  return (
    <>
      <header>
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>

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