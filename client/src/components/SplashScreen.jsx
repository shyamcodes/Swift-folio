import { useEffect } from "react";

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="relative flex items-center justify-center h-screen text-white overflow-hidden bg-linear-to-br from-indigo-900 via-slate-900 to-slate-950">
      {/* Background Layers */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating gradient blobs */}
        <div className="absolute -top-[120px] -left-20 w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-[-120px] right-[-100px] w-[500px] h-[500px] bg-indigo-500/25 rounded-full blur-[150px] animate-float-slow" />
        <div className="absolute top-[40%] left-[30%] w-[350px] h-[350px] bg-blue-400/20 rounded-full blur-[100px] animate-float-slower" />

        {/* Soft grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[40px_40px]" />

        {/* Glowing dots for subtle motion */}
        <div className="absolute top-1/4 left-1/5 w-3 h-3 bg-indigo-400 rounded-full blur-[2px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-pink-400 rounded-full blur-[2px] animate-pulse-slow" />
        <div className="absolute top-[60%] right-[20%] w-2 h-2 bg-cyan-400 rounded-full blur-[1px] animate-pulse-slower" />
      </div>

      {/* Logo / Title */}
      <h1 className="text-5xl md:text-6xl font-extrabold z-10 animate-logo">
        SwiftFolio 🚀
      </h1>

      {/* Animation Keyframes */}
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

        @keyframes logo-pop {
          0% { transform: scale(0.5); opacity: 0; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-logo { animation: logo-pop 1.2s ease-out; }
      `}</style>
    </div>
  );
}
