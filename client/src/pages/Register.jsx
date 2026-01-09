import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/api-helper";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await registerUser(form.username, form.password);
      setSuccess("Account created. You can log in now.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617]">
      <form
        onSubmit={handleSubmit}
        className="w-80 bg-[#0b1220] p-6 rounded-2xl shadow-lg shadow-black/40 border border-white/10"
      >
        <h1 className="text-slate-100 text-2xl mb-5 text-center font-semibold tracking-wide">
          Create Account
        </h1>

        {error && (
          <p className="text-red-400 text-sm mb-3 text-center">{error}</p>
        )}

        {success && (
          <p className="text-emerald-400 text-sm mb-3 text-center">{success}</p>
        )}

        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full mb-3 p-2.5 rounded-lg bg-[#020617] text-slate-100 outline-none placeholder-slate-500 focus:ring-2 focus:ring-indigo-500"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-3 p-2.5 rounded-lg bg-[#020617] text-slate-100 outline-none placeholder-slate-500 focus:ring-2 focus:ring-indigo-500"
          required
        />

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full mb-4 p-2.5 rounded-lg bg-[#020617] text-slate-100 outline-none placeholder-slate-500 focus:ring-2 focus:ring-indigo-500"
          required
        />

        <button
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2.5 rounded-lg hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Register"}
        </button>

        <p className="text-xs text-center text-slate-400 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="cursor-pointer text-indigo-400 hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
