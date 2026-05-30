import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";

const Clerk_Key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!Clerk_Key) {
  throw new Error(
    "Missing Clerk publishable key. Please set VITE_CLERK_PUBLISHABLE_KEY in your .env file.",
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={Clerk_Key}
      fallbackRedirectUrl="/dashboard"
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
);
