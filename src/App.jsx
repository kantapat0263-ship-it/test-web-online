import React, { useRef, useState } from 'react'
import { Upload, Wand2, Store, Image as ImageIcon, Sparkles } from 'lucide-react'

const styleOptions = [
  { value: 'minimal', label: 'Minimal' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'street', label: 'Street' },
  { value: 'cute', label: 'Cute' },
  { value: 'cafe', label: 'Cafe' },
]

const fontStyles = {
  minimal: 'font-sans tracking-tight',
  luxury: 'font-serif tracking-[0.12em]',
  street: 'font-mono tracking-[0.2em] uppercase',
  cute: 'font-sans italic tracking-wide',
  cafe: 'font-serif italic tracking-wide',
}

function buildInitials(name) {
  if (!name) return 'LS'
  const words = name.trim().split(/\s+/).filter(Boolean)
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}

function generateDesigns({ storeName, style, imagePreview }) {
  const initials = buildInitials(storeName)

  return [
    {
      id: 1,
      type: 'image-logo',
      title: 'Image + Wordmark',
      name: storeName,
      initials,
      accent: 'bg-white',
      border: 'border-stone-200',
    },
    {
      id: 2,
      type: 'badge',
      title: 'Badge Mark',
      name: storeName,
      initials,
      accent: 'bg-stone-950 text-white',
      border: 'border-stone-900',
    },
    {
      id: 3,
      type: 'split',
      title: 'Split Logo',
      name: storeName,
      initials,
      accent: 'bg-amber-50',
      border: 'border-amber-200',
    },
    {
      id: 4,
      type: 'text-only',
      title: 'Typography',
      name: storeName,
      initials,
      accent: 'bg-white',
      border: 'border-stone-200',
    },
  ].map((item) => ({
    ...item,
    hasImage: Boolean(imagePreview),
    fontClass: fontStyles[style] || 'font-sans',
  }))
}

function LogoCard({ logo, imagePreview }) {
  return (
    <div className={`rounded-3xl border ${logo.border} ${logo.accent} p-5 shadow-sm transition hover:-translate-y-0.5`}>
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">{logo.title}</span>
        <Sparkles className="h-4 w-4 text-stone-400" />
      </div>

      {logo.type === 'image-logo' && (
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border border-stone-200 bg-stone-50">
            {imagePreview ? (
              <img src={imagePreview} alt="Reference" className="h-full w-full object-contain" />
            ) : (
              <ImageIcon className="h-8 w-8 text-stone-300" />
            )}
          </div>
          <div className={`text-2xl font-bold ${logo.fontClass}`}>{logo.name}</div>
          <div className="mt-2 text-xs text-stone-500">reference-based layout</div>
        </div>
      )}

      {logo.type === 'badge' && (
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-black text-3xl font-semibold text-white">
            {logo.initials}
          </div>
          <div className={`text-xl ${logo.fontClass}`}>{logo.name}</div>
          <div className="mt-2 text-xs opacity-70">strong brand mark</div>
        </div>
      )}

      {logo.type === 'split' && (
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-stone-950 text-2xl font-bold text-white">
            {logo.initials}
          </div>
          <div>
            <div className={`text-xl font-semibold ${logo.fontClass}`}>{logo.name}</div>
            <div className="mt-1 text-sm text-stone-500">balanced icon + wordmark</div>
          </div>
        </div>
      )}

      {logo.type === 'text-only' && (
        <div className="text-center">
          <div className={`text-3xl font-bold ${logo.fontClass}`}>{logo.name}</div>
          <div className="mt-2 text-xs text-stone-400">clean typography concept</div>
        </div>
      )}
    </div>
  )
}

export default function App() {
  const fileRef = useRef(null)
  const [storeName, setStoreName] = useState('')
  const [style, setStyle] = useState('minimal')
  const [imagePreview, setImagePreview] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const upload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => setImagePreview(String(reader.result))
    reader.readAsDataURL(file)
  }

  const generate = async () => {
    if (!storeName.trim()) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 600))
    setResults(generateDesigns({ storeName, style, imagePreview }))
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-stone-50 to-stone-100 text-stone-900">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-950 text-white shadow-sm">
            <Store className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Logo Generator ร้านค้า</h1>
            <p className="text-sm text-stone-500">เวอร์ชันเริ่มต้นพร้อมเอาขึ้น GitHub และ Deploy ต่อได้ทันที</p>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
          <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">ตั้งค่าการสร้างโลโก้</h2>
            <p className="mt-1 text-sm text-stone-500">ใส่ชื่อร้าน เลือกสไตล์ แล้วแนบภาพอ้างอิงได้</p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">ชื่อร้าน</label>
                <input
                  placeholder="เช่น สวยมือลั่น เดนิม"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full rounded-2xl border border-stone-300 px-4 py-3 outline-none transition focus:border-stone-900"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">สไตล์</label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full rounded-2xl border border-stone-300 px-4 py-3 outline-none transition focus:border-stone-900"
                >
                  {styleOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">ภาพอ้างอิง</label>
                <button
                  onClick={() => fileRef.current?.click()}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-4 py-5 text-stone-700 transition hover:border-stone-900 hover:bg-stone-100"
                >
                  <Upload className="h-4 w-4" />
                  Upload Reference Image
                </button>
                <input type="file" ref={fileRef} onChange={upload} accept="image/*" className="hidden" />
              </div>

              {imagePreview && (
                <div className="overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 p-3">
                  <img src={imagePreview} alt="Preview" className="h-28 w-full rounded-xl object-contain" />
                </div>
              )}

              <button
                onClick={generate}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-stone-950 px-4 py-3 font-medium text-white transition hover:bg-stone-800"
              >
                <Wand2 className="h-4 w-4" />
                {loading ? 'Generating...' : 'Generate Logo'}
              </button>
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">ผลลัพธ์ตัวอย่าง</h2>
              <span className="text-sm text-stone-500">4 concepts</span>
            </div>

            {results.length === 0 ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-dashed border-stone-300 bg-white p-8 text-center shadow-sm">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-stone-100">
                  <ImageIcon className="h-7 w-7 text-stone-400" />
                </div>
                <h3 className="text-lg font-semibold">ยังไม่มีผลลัพธ์</h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-stone-500">
                  กรอกชื่อร้าน อัปโหลดภาพอ้างอิงถ้ามี แล้วกดสร้างโลโก้เพื่อดูตัวอย่างหน้าเว็บจริง
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {results.map((item) => (
                  <LogoCard key={item.id} logo={item} imagePreview={imagePreview} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
