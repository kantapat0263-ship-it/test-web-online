import React, { useMemo, useRef, useState } from "react";
import { Upload, Wand2, Store, Sparkles, Download, Image as ImageIcon, CheckCircle2, Loader2, RefreshCw, AlertCircle } from "lucide-react";

// 🔥 IMPROVED VERSION: ทำให้ "ดูเหมือนออกแบบจริง" โดยไม่ใช้ AI

const fontStyles = {
  minimal: "font-sans tracking-tight",
  luxury: "font-serif tracking-wide",
  street: "font-mono tracking-widest",
  cute: "font-sans italic",
  "modern-thai": "font-sans tracking-wide",
  cafe: "font-serif italic",
};

function buildInitials(name) {
  if (!name) return "LS";
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

// 🔥 GENERATOR ใหม่: ใช้ layout + image + typography
function generateDesigns({ storeName, style, imagePreview }) {
  const initials = buildInitials(storeName);

  return [
    {
      id: 1,
      type: "image-logo",
      layout: "top-image",
      name: storeName,
      initials,
    },
    {
      id: 2,
      type: "badge",
      layout: "circle",
      name: storeName,
      initials,
    },
    {
      id: 3,
      type: "split",
      layout: "left-icon",
      name: storeName,
      initials,
    },
    {
      id: 4,
      type: "text-only",
      layout: "typography",
      name: storeName,
      initials,
    },
  ];
}

function LogoCard({ logo, imagePreview, style }) {
  const fontClass = fontStyles[style] || "font-sans";

  return (
    <div className="rounded-2xl border p-5 bg-white shadow-sm">
      {logo.type === "image-logo" && imagePreview && (
        <div className="text-center">
          <img src={imagePreview} className="h-20 mx-auto object-contain mb-3" />
          <div className={`text-xl ${fontClass} font-bold`}>{logo.name}</div>
        </div>
      )}

      {logo.type === "badge" && (
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center text-2xl mx-auto mb-3">
            {logo.initials}
          </div>
          <div className={`text-lg ${fontClass}`}>{logo.name}</div>
        </div>
      )}

      {logo.type === "split" && (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-xl">
            {logo.initials}
          </div>
          <div className={`text-lg ${fontClass}`}>{logo.name}</div>
        </div>
      )}

      {logo.type === "text-only" && (
        <div className="text-center">
          <div className={`text-2xl ${fontClass} font-bold`}>{logo.name}</div>
          <div className="text-xs text-gray-400 mt-1">LOGO</div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const fileRef = useRef(null);
  const [storeName, setStoreName] = useState("");
  const [style, setStyle] = useState("minimal");
  const [imagePreview, setImagePreview] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const upload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const generate = async () => {
    if (!storeName) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));

    const data = generateDesigns({ storeName, style, imagePreview });
    setResults(data);
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🔥 Logo Generator (No AI แต่ดูโปร)</h1>

      <input
        placeholder="ชื่อร้าน"
        value={storeName}
        onChange={(e) => setStoreName(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <select value={style} onChange={(e) => setStyle(e.target.value)} className="border p-2 w-full mb-3">
        <option value="minimal">Minimal</option>
        <option value="luxury">Luxury</option>
        <option value="street">Street</option>
      </select>

      <button onClick={() => fileRef.current.click()} className="border p-3 w-full mb-3">
        Upload Reference Image
      </button>
      <input type="file" ref={fileRef} onChange={upload} className="hidden" />

      {imagePreview && <img src={imagePreview} className="h-20 mb-4" />}

      <button onClick={generate} className="bg-black text-white p-3 w-full">
        {loading ? "Generating..." : "Generate Logo"}
      </button>

      <div className="grid grid-cols-2 gap-4 mt-6">
        {results.map((r) => (
          <LogoCard key={r.id} logo={r} imagePreview={imagePreview} style={style} />
        ))}
      </div>
    </div>
  );
}
