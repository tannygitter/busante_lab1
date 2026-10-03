import { useState, useEffect } from 'react'
import Display from './Display'
import Button from './Button'
const MAX_DIGITS = 12

function calculate(a, b, op) {
  const x = parseFloat(a)
  const y = parseFloat(b)
  let result
  if (op === '+') result = x + y
  else if (op === '−') result = x - y
  else if (op === '×') result = x * y
  else if (op === '÷') {
    if (y === 0) throw new Error('cannot divide by zero')
    result = x / y
  }
  return String(parseFloat(result.toPrecision(12)))
}

export default function Calculator() {
  const [current, setCurrent] = useState('0')
  const [previous, setPrevious] = useState(null)
  const [operator, setOperator] = useState(null)
  const [overwrite, setOverwrite] = useState(false)
  const [expression, setExpression] = useState('')
  const [error, setError] = useState('')
  const reset = () => {
    setCurrent('0')
    setPrevious(null)
    setOperator(null)
    setOverwrite(false)
    setExpression('')
    setError('')
  }
  const inputDigit = (d) => {
    if (error) return inputAfterError(d)
    if (overwrite || current === '0') {
      setCurrent(d)
      setOverwrite(false)
    } else if (current.replace('-', '').replace('.', '').length < MAX_DIGITS) {
      setCurrent(current + d)
    }
  }
  const inputAfterError = (d) => {
    reset()
    setCurrent(d)
  }
  const inputDot = () => {
    if (error) return reset()
    if (overwrite) {
      setCurrent('0.')
      setOverwrite(false)
    } else if (!current.includes('.')) {
      setCurrent(current + '.')
    }
  }
  const chooseOperator = (op) => {
    if (error) return
    if (operator && previous !== null && !overwrite) {
      try {
        const result = calculate(previous, current, operator)
        setPrevious(result)
        setCurrent(result)
        setExpression(`${result} ${op}`)
      } catch (e) {
        showError(e.message)
        return
      }
    } else {
      setPrevious(current)
      setExpression(`${current} ${op}`)
    }
    setOperator(op)
    setOverwrite(true)
  }
  const showError = (message) => {
    setError(message)
    setPrevious(null)
    setOperator(null)
    setOverwrite(true)
    setExpression('')
    setCurrent('0')
  }
  const equals = () => {
    if (error || !operator || previous === null) return
    try {
      const result = calculate(previous, current, operator)
      setExpression(`${previous} ${operator} ${current} =`)
      setCurrent(result)
      setPrevious(null)
      setOperator(null)
      setOverwrite(true)
    } catch (e) {
      showError(e.message)
    }
  }
  const backspace = () => {
    if (error) return reset()
    if (overwrite) return
    const next = current.slice(0, -1)
    setCurrent(next === '' || next === '-' ? '0' : next)
  }
  const toggleSign = () => {
    if (error || current === '0') return
    setCurrent(current.startsWith('-') ? current.slice(1) : '-' + current)
  }
  useEffect(() => {
    const keyOps = { '+': '+', '-': '−', '*': '×', '/': '÷' }
    const onKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      if (/^[0-9]$/.test(e.key)) inputDigit(e.key)
      else if (e.key === '.') inputDot()
      else if (keyOps[e.key]) {
        e.preventDefault()
        chooseOperator(keyOps[e.key])
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault()
        equals()
      } else if (e.key === 'Backspace') backspace()
      else if (e.key === 'Escape' || e.key.toLowerCase() === 'c') reset()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })
  return (
    <section
      aria-label="Calculator"
      className="mx-auto w-full max-w-sm rounded-2xl bg-slate-200 p-4 shadow-lg md:max-w-md border-4 border-black-700"
    >
      <Display expression={expression} value={current} error={error} />
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        <Button label="C" variant="action" onClick={reset} ariaLabel="Clear" />
        <Button label="⌫" variant="action" onClick={backspace} ariaLabel="Backspace" />
        <Button label="±" variant="action" onClick={toggleSign} ariaLabel="Change sign" />
        <Button label="÷" variant="operator" onClick={() => chooseOperator('÷')} ariaLabel="Divide" />
        <Button label="7" onClick={() => inputDigit('7')} />
        <Button label="8" onClick={() => inputDigit('8')} />
        <Button label="9" onClick={() => inputDigit('9')} />
        <Button label="×" variant="operator" onClick={() => chooseOperator('×')} ariaLabel="Multiply" />
        <Button label="4" onClick={() => inputDigit('4')} />
        <Button label="5" onClick={() => inputDigit('5')} />
        <Button label="6" onClick={() => inputDigit('6')} />
        <Button label="−" variant="operator" onClick={() => chooseOperator('−')} ariaLabel="Subtract" />
        <Button label="1" onClick={() => inputDigit('1')} />
        <Button label="2" onClick={() => inputDigit('2')} />
        <Button label="3" onClick={() => inputDigit('3')} />
        <Button label="+" variant="operator" onClick={() => chooseOperator('+')} ariaLabel="Add" />
        <Button label="0" className="col-span-2" onClick={() => inputDigit('0')} />
        <Button label="." onClick={inputDot} ariaLabel="Decimal point" />
        <Button label="=" variant="equals" onClick={equals} ariaLabel="Equals" />
      </div>
    </section>
  )
}
