import { useEffect, useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const { data } = await API.me();
      setUser(data);
    } catch (err) {
      navigate("/login");
    }
  };

  const logout = async () => {
    await API.logout();
    navigate("/login");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return user ? (
    <div>
      <h2>Welcome, {user.email}</h2>
      <button onClick={logout}>Logout</button>
    </div>
  ) : (
    <p>Loading...</p>
  );
}