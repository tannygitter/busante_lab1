export default function Instructions() {
  const operations = [
    ['+', 'addition'],
    ['−', 'subtraction'],
    ['×', 'multiplication'],
    ['÷', 'division (shows an error when dividing by zero)'],
  ]
  return (
    <section aria-label="User guide" className="rounded-2xl bg-white p-5 shadow-lg">
      <h2 className="mb-3 text-xl font-bold text-purple-800">user guide</h2>
      <ol className="list-decimal space-y-1 pl-5 text-slate-700">
        <li>press the number buttons to enter the first number.</li>
        <li>press an operator (+, −, ×, ÷).</li>
        <li>enter the second number.</li>
        <li>press = to see the result.</li>
        <li>press C to clear and start over.</li>
      </ol>
      <h2 className="mb-3 mt-6 text-xl font-bold text-lilac-800">supported operations</h2>
      <ul className="space-y-2">
        {operations.map(([symbol, name]) => (
          <li key={symbol} className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-700 font-bold text-white">
              {symbol}
            </span>
            <span className="text-lilac-700">{name}</span>
          </li>
        ))}
      </ul>
      <h2 className="mb-3 mt-6 text-xl font-bold text-purple-800">other buttons and keys</h2>
      <ul className="list-disc space-y-1 pl-5 text-slate-700">
        <li><strong>⌫</strong> removes the last digit (Backspace).</li>
        <li><strong>±</strong> switches between positive and negative.</li>
        <li><strong>.</strong> adds a decimal point.</li>
        <li>keyboard: 0–9, + − * /, enter for =, esc or C to clear.</li>
      </ul>
    </section>
  )
}
