const styles = {
  number: 'bg-white text-slate-800 hover:bg-slate-100 border border-slate-200',
  operator: 'bg-purple-700 text-white hover:bg-purple-600',
  action: 'bg-slate-300 text-slate-800 hover:bg-slate-200',
  equals: 'bg-amber-500 text-white hover:bg-amber-400',
}
export default function Button({ label, onClick, variant = 'number', className = '', ariaLabel }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel || label}
      className={`h-14 rounded-xl text-xl font-semibold shadow-sm transition active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-700 sm:h-16 sm:text-2xl ${styles[variant]} ${className}`}
    >
      {label}
    </button>
  )
}