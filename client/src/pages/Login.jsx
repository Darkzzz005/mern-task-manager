import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api-helper";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", res.name);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
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
          Welcome Back
        </h1>

        {error && (
          <p className="text-red-400 text-sm mb-3 text-center">{error}</p>
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
          className="w-full mb-4 p-2.5 rounded-lg bg-[#020617] text-slate-100 outline-none placeholder-slate-500 focus:ring-2 focus:ring-indigo-500"
          required
        />

        <button
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2.5 rounded-lg hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-xs text-center text-slate-400 mt-4">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="cursor-pointer text-indigo-400 hover:underline"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}
