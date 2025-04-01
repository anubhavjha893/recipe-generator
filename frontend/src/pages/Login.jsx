import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://mentor-project.onrender.com/api/auth/login",
        { email, password }
      );
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#278783] p-6">
      <div className="w-full max-w-md p-8 bg-[#FFEBD0] rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-[#278783] text-center mb-6">Login</h1>
        <p className="text-gray-700 text-center mb-4">
          Don't have an account? <Link to="/signup" className="text-[#278783] font-semibold">Sign up</Link>
        </p>
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-white border border-gray-300 rounded-lg text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-white border border-gray-300 rounded-lg text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#278783] text-white p-3 rounded-lg mt-4 hover:bg-[#1f6a65] transition"
          >
            {loading ? <span className="animate-spin h-6 w-6 border-b-2 border-white"></span> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
