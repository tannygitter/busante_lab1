import Header from './components/Header'
import Calculator from './components/Calculator'
import Instructions from './components/Instructions'
export default function App() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <Header />
      <main className="mx-auto grid max-w-5xl gap-6 px-4 py-6 lg:grid-cols-2 lg:items-start lg:py-10">
        <Calculator />
        <Instructions />
      </main>
      <footer className="pb-6 text-center text-sm text-slate-500">
        Christian Busante - DCIT 26 - Laboratory 1 - Cavite State University - Tanza Campus
      </footer>
    </div>
  )
}
