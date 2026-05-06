import { useState } from "react";
import { signupUser } from "../../api/authApi";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signupUser(form);

        console.log(res);
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl p-8">
        <h1 className="text-4xl font-bold mb-2">Create Account</h1>

        <p className="text-white/60 mb-8">
          Start preparing with AI-powered interviews
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3"
          />

          <button
            className="w-full bg-white text-black py-3 rounded-xl font-semibold"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-white/60">
          Already have an account?{" "}
          <Link to="/login" className="text-white">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;