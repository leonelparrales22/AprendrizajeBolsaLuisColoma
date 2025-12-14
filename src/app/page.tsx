'use client'

import { useState } from 'react'
import { config } from '../data/config'

type Config = typeof config

export default function Home() {
  const [paymentStatus, setPaymentStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const data = {
      nombre: formData.get('nombre') as string,
      email: formData.get('email') as string,
      telefono: formData.get('telefono') as string
    }
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    const result = await res.json()
    setLoading(false)
    if (result.success) {
      setPaymentStatus('Pago exitoso! ID: ' + result.transactionId)
    } else {
      setPaymentStatus('Error en el pago')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero */}
      <section className="py-20 text-center px-4">
        <h1 className="text-5xl font-bold text-blue-400 mb-4">{config.titulo}</h1>
        <p className="text-xl mb-8">{config.subtitulo}</p>
        <button className="bg-yellow-500 text-black px-6 py-3 rounded hover:bg-yellow-600 transition">Inscribirme</button>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4">
        <h2 className="text-3xl text-center mb-10">Temario del Curso</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {config.temario.map((modulo: any, i: number) => (
            <div key={i} className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2 text-yellow-400">{modulo.titulo}</h3>
              <p className="text-gray-300">{modulo.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mentor */}
      <section className="py-20 text-center px-4">
        <img src={config.mentor.foto} alt={config.mentor.nombre} className="mx-auto rounded-full w-32 h-32 mb-4" />
        <h2 className="text-3xl mb-4 text-blue-400">{config.mentor.nombre}</h2>
        <p className="text-lg max-w-2xl mx-auto">{config.mentor.bio}</p>
      </section>

      {/* PaymentSection */}
      <section className="py-20 px-4 bg-gray-800">
        <h2 className="text-3xl text-center mb-10">Inscríbete Ahora - ${config.curso.precio}</h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <input name="nombre" placeholder="Nombre completo" required className="w-full p-3 mb-4 bg-gray-700 border border-gray-600 rounded" />
          <input name="email" type="email" placeholder="Correo electrónico" required className="w-full p-3 mb-4 bg-gray-700 border border-gray-600 rounded" />
          <input name="telefono" placeholder="Teléfono" required className="w-full p-3 mb-4 bg-gray-700 border border-gray-600 rounded" />
          <button type="submit" className="w-full bg-yellow-500 text-black p-3 rounded hover:bg-yellow-600 transition" disabled={loading}>
            {loading ? 'Procesando pago con Payphone...' : `Pagar $${config.curso.precio}`}
          </button>
        </form>
        {paymentStatus && <p className="text-center mt-4 text-green-400">{paymentStatus}</p>}
      </section>

      {/* Footer */}
      <footer className="py-10 text-center bg-gray-900 px-4">
        <p className="text-sm text-gray-400">{config.disclaimer}</p>
      </footer>
    </div>
  )
}