import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../utils/api";

export default function ProtectedRoute({ children }) {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    API.me()
      .then(() => setAuth(true))
      .catch(() => setAuth(false));
  }, []);

  if (auth === null) return <p>Loading...</p>;
  if (!auth) return <Navigate to="/login" replace />;

  return children;
}