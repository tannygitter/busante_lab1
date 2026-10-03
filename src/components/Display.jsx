export default function Display({ expression, value, error }) {
  const text = error || value
  const size = error
    ? 'text-xl'
    : text.length > 12
      ? 'text-2xl'
      : text.length > 8
        ? 'text-4xl'
        : 'text-5xl'
  return (
    <div className="mb-4 rounded-xl bg-slate-900 p-4 text-right" aria-live="polite">
      <div className="h-6 truncate text-sm text-slate-400">{expression}</div>
      <div
        className={`mt-1 truncate font-mono font-semibold ${size} ${
          error ? 'text-red-400' : 'text-white'
        }`}
      >
        {text}
      </div>
    </div>
  )
}
