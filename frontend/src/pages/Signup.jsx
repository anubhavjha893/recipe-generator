import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, lastName, email, password },
        { withCredentials: true }
      );
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#278783] p-6">
      <div className="w-full max-w-md p-8 bg-[#FFEBD0] rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-[#278783] text-center mb-6">Sign Up</h1>
        <p className="text-gray-700 text-center mb-4">
          Already have an account? <Link to="/login" className="text-[#278783] font-semibold">Log in</Link>
        </p>
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-1/2 p-3 bg-white border border-gray-300 rounded-lg text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-1/2 p-3 bg-white border border-gray-300 rounded-lg text-black"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
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
            placeholder="Enter your password"
            className="w-full p-3 bg-white border border-gray-300 rounded-lg text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#278783] text-white p-3 rounded-lg mt-4 hover:bg-[#1f6a65] transition"
          >
            Create account
          </button>
        </form>
      </div>
    </div>
  );
}