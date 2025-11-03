import { useState, useEffect } from "react";
import { API_BASE_URL } from "../config";

export default function AuthForm({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = isLogin
        ? `${API_BASE_URL}/api/auth/login`
        : `${API_BASE_URL}/api/auth/signup`;

      const body = isLogin
        ? { identifier: formData.email, password: formData.password }
        : {
            username: formData.username,
            email: formData.email,
            password: formData.password,
          };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Request failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
      localStorage.setItem("username", data.username);

      onAuthSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen text-white overflow-hidden bg-linear-to-br from-indigo-900 via-slate-900 to-slate-950">
      {/* Background Layers (same as SplashScreen) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[120px] -left-20 w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-[-120px] right-[-100px] w-[500px] h-[500px] bg-indigo-500/25 rounded-full blur-[150px] animate-float-slow" />
        <div className="absolute top-[40%] left-[30%] w-[350px] h-[350px] bg-blue-400/20 rounded-full blur-[100px] animate-float-slower" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[40px_40px]" />

        <div className="absolute top-1/4 left-1/5 w-3 h-3 bg-indigo-400 rounded-full blur-[2px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-pink-400 rounded-full blur-[2px] animate-pulse-slow" />
        <div className="absolute top-[60%] right-[20%] w-2 h-2 bg-cyan-400 rounded-full blur-[1px] animate-pulse-slower" />
      </div>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          {isLogin ? "Welcome Back 👋" : "Create an Account 🚀"}
        </h2>

        {error && (
          <p className="text-red-300 bg-red-500/10 text-center p-2 rounded mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-white/80 text-black placeholder-gray-500 focus:outline-none"
            />
          )}

          <input
            type={isLogin ? "text" : "email"}
            name="email"
            placeholder={isLogin ? "Email or Username" : "Email"}
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-white/80 text-black placeholder-gray-500 focus:outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-white/80 text-black placeholder-gray-500 focus:outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-200">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-400 hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-15px) translateX(-10px); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-10px) translateX(15px); }
        }
        .animate-float { animation: float 10s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 14s ease-in-out infinite; }
        .animate-float-slower { animation: float-slower 18s ease-in-out infinite; }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.4); }
        }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-pulse-slower { animation: pulse-slower 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
