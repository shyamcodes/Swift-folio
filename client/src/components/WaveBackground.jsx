export default function WaveBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-slate-900">
      <svg
        className="absolute bottom-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          className="wave wave1"
          fill="#6366f1"
          fillOpacity="0.5"
          d="M0,256L48,250.7C96,245,192,235,288,234.7C384,235,480,245,576,218.7C672,192,768,128,864,117.3C960,107,1056,149,1152,181.3C1248,213,1344,235,1392,245.3L1440,256V320H0Z"
        />
        <path
          className="wave wave2"
          fill="#818cf8"
          fillOpacity="0.4"
          d="M0,224L48,202.7C96,181,192,139,288,144C384,149,480,203,576,208C672,213,768,171,864,176C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128V320H0Z"
        />
        <path
          className="wave wave3"
          fill="#a5b4fc"
          fillOpacity="0.3"
          d="M0,160L48,154.7C96,149,192,139,288,133.3C384,128,480,128,576,154.7C672,181,768,235,864,234.7C960,235,1056,181,1152,149.3C1248,117,1344,107,1392,101.3L1440,96V320H0Z"
        />
      </svg>
    </div>
  );
}
