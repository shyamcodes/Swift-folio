import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaDribbble, FaFigma } from "react-icons/fa";
import { SiDevpost } from "react-icons/si";

export default function HomePage() {
  const [showProfile, setShowProfile] = useState(false);
  const [links, setLinks] = useState([
    { type: "GitHub", url: "" },
    { type: "LinkedIn", url: "" },
  ]);
  const [addedLinks, setAddedLinks] = useState([]);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedUsername = localStorage.getItem("username");
    if (storedEmail) setEmail(storedEmail);
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const handleAddLink = (type) => {
    if (!addedLinks.includes(type)) {
      setAddedLinks([...addedLinks, type]);
      setLinks([...links, { type, url: "" }]);
    }
  };

  const handleRemoveLink = (type) => {
    setAddedLinks(addedLinks.filter((t) => t !== type));
    setLinks(links.filter((l) => l.type !== type));
  };

  const handleChange = (index, value) => {
    const newLinks = [...links];
    newLinks[index].url = value;
    setLinks(newLinks);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/auth";
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5001/api/auth/delete", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        alert("Your account has been deleted successfully.");
        localStorage.clear();
        window.location.href = "/auth";
      } else {
        alert(data.message || "Failed to delete account");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Something went wrong while deleting your account.");
    }
  };

  const handleGeneratePortfolio = () => {
    alert("Portfolio generation feature coming soon! 🚀");
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-linear-to-br from-indigo-900 via-slate-900 to-slate-950 text-black">
      {/* Floating gradient blobs (same as splash/authform) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[120px] -left-20 w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-[-120px] right-[-100px] w-[500px] h-[500px] bg-indigo-500/25 rounded-full blur-[150px] animate-float-slow" />
        <div className="absolute top-[40%] left-[30%] w-[350px] h-[350px] bg-blue-400/20 rounded-full blur-[100px] animate-float-slower" />
      </div>

      {/* Profile Button */}
      <div className="absolute top-6 right-8">
        <button
          onClick={() => setShowProfile(!showProfile)}
          className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-white/20 transition"
        >
          Profile
        </button>

        {showProfile && (
          <div className="absolute right-0 mt-2 w-56 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-4 shadow-xl animate-fade">
            <p className="text-sm mb-3 text-gray-200">
              <span className="font-semibold">Username:</span>{" "}
              {username || "Unknown"}
            </p>

            <button
              onClick={handleLogout}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold transition mb-2"
            >
              Logout
            </button>

            <button
              onClick={handleDeleteAccount}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-semibold transition"
            >
              Delete Account
            </button>
          </div>
        )}
      </div>

      {/* Main Container */}
      <div className="relative bg-white/80 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-8 w-[90%] max-w-md transition">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Your Links
        </h2>

        {links.map((link, index) => (
          <div key={index} className="mb-4 flex items-center gap-3">
            <span className="font-semibold text-black w-24">{link.type}</span>
            <input
              type="url"
              placeholder={`Enter ${link.type} URL`}
              value={link.url}
              onChange={(e) => handleChange(index, e.target.value)}
              className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            />
            {["Figma", "Dribbble", "Devpost"].includes(link.type) && (
              <button
                onClick={() => handleRemoveLink(link.type)}
                className="text-red-500 hover:text-red-700 text-sm font-semibold"
              >
                ✕
              </button>
            )}
          </div>
        ))}

        {/* Add Link Icons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => handleAddLink("Figma")}
            className="text-gray-700 hover:text-indigo-600 text-3xl"
          >
            <FaFigma />
          </button>
          <button
            onClick={() => handleAddLink("Dribbble")}
            className="text-gray-700 hover:text-pink-500 text-3xl"
          >
            <FaDribbble />
          </button>
          <button
            onClick={() => handleAddLink("Devpost")}
            className="text-gray-700 hover:text-blue-500 text-3xl"
          >
            <SiDevpost />
          </button>
        </div>

        {/* Generate Portfolio Button */}
        <button
          onClick={handleGeneratePortfolio}
          className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Generate Your Portfolio 🚀
        </button>
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
        @keyframes fade {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade { animation: fade 0.2s ease-out; }
      `}</style>
    </div>
  );
}
