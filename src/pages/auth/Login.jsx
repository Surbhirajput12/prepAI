import { useState } from "react";
import { loginUser } from "../../api/authApi";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const response = await loginUser(form);

    console.log("FULL RESPONSE:", response);

    const token = response?.data?.token;
    const user = response?.data?.user;

    if (!token || !user) {
      console.error("Invalid backend response:", response);

      alert("Invalid backend response");
      return;
    }

    localStorage.setItem("prepai_token", token);

    setUser(user);

    navigate("/dashboard");
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    alert(
      error?.response?.data?.message ||
      error?.message ||
      "Login failed"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl p-8">
        <h1 className="text-4xl font-bold mb-2">
          Welcome Back
        </h1>

        <p className="text-white/60 mb-8">
          Continue your AI interview preparation
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            onChange={handleChange}
            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            onChange={handleChange}
            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black py-3 rounded-xl font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-white/60">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-white">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;