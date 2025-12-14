'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { config } from '../data/config'

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
      setPaymentStatus('¡Pago exitoso! ID: ' + result.transactionId)
    } else {
      setPaymentStatus('Error en el pago')
    }
  }

  const titleWords = config.titulo.split(' ')

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      {/* Hero Premium con Grid Pattern */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center overflow-hidden bg-primary-dark">
        {/* Fondo Grid Financiero */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        <div className="absolute inset-0 bg-gradient-radial from-gold/10 via-transparent to-primary-dark" />
        
        {/* Navbar Glassmorphism */}
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-primary-dark/30 border-b border-gold/20"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-gold via-gold-light to-cyber-cyan bg-clip-text text-transparent">
              LUIS COLOMA
            </div>
            <a href="#inscripcion" className="px-6 py-2 rounded-full bg-gradient-to-r from-gold to-gold-dark text-black font-bold hover:shadow-glow-gold transition-all duration-300">
              Asegurar Cupo
            </a>
          </div>
        </motion.nav>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto mt-20 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block bg-gradient-to-r from-gold/20 to-cyber-cyan/20 backdrop-blur-sm border border-gold/30 rounded-full px-6 py-2 mb-8"
          >
            <span className="text-sm font-bold bg-gradient-to-r from-gold to-cyber-cyan bg-clip-text text-transparent uppercase tracking-wider">
              🔥 Formación Elite • {config.metricas.alumnos} Alumnos Transformados
            </span>
          </motion.div>

          {/* Título con Stagger */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="inline-block mr-3 bg-gradient-to-r from-white via-gold-light to-cyber-cyan bg-clip-text text-transparent"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-xl md:text-2xl mb-10 text-gray-300 max-w-3xl font-light leading-relaxed"
          >
            {config.subtitulo}
          </motion.p>

          {/* Métricas Hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 w-full max-w-4xl"
          >
            {[
              { label: 'Alumnos', value: config.metricas.alumnos },
              { label: 'Experiencia', value: config.metricas.experiencia },
              { label: 'Satisfacción', value: config.metricas.satisfaccion },
              { label: 'Países', value: config.metricas.paises }
            ].map((stat, i) => (
              <div key={i} className="backdrop-blur-md bg-primary-light/30 border border-gold/20 rounded-2xl p-6 hover:border-cyber-cyan/40 transition-all duration-300">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gold to-cyber-emerald bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.a
            href="#inscripcion"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(245, 158, 11, 0.6)' }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-12 py-5 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold-dark text-black font-bold text-xl shadow-glow-gold transition-all duration-300"
          >
            🚀 Transformar Mi Futuro Financiero Ahora
          </motion.a>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="mt-6 text-sm text-gray-500"
          >
            ⚡ Plazas limitadas • Acceso inmediato • Garantía de satisfacción 30 días
          </motion.p>
        </div>

        {/* Degradado Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* Bento Grid: Tu Ruta hacia la Libertad Financiera */}
      <section className="py-24 px-4 bg-black relative">
        <div className="absolute inset-0 bg-gradient-radial from-cyber-cyan/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-gold via-cyber-cyan to-cyber-emerald bg-clip-text text-transparent">
              Tu Ruta hacia la Libertad Financiera
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Un sistema modular diseñado para llevarte de cero a profesional. Paso a paso, sin atajos ni trucos baratos.
            </p>
          </motion.div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {config.temario.map((modulo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -10, boxShadow: '0 0 40px rgba(245, 158, 11, 0.3)' }}
                className={`backdrop-blur-md bg-primary-light/40 border border-gold/20 rounded-3xl p-8 hover:border-cyber-cyan/50 transition-all duration-500 group ${
                  i === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                } ${i === 3 ? 'md:col-span-2 lg:col-span-2' : ''}`}
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-gold/20 to-cyber-cyan/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">
                    {i === 0 && '📊'}
                    {i === 1 && '📈'}
                    {i === 2 && '🛡️'}
                    {i === 3 && '💎'}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-gold group-hover:to-cyber-cyan transition-all duration-300">
                  {modulo.titulo}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {modulo.descripcion}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof con Glow */}
      <section className="py-24 px-4 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-cyber-emerald/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyber-cyan to-cyber-emerald bg-clip-text text-transparent">
              Historias de Éxito Reales
            </h2>
            <p className="text-gray-400 text-lg">
              Alumnos que pasaron de la incertidumbre a la rentabilidad consistente
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { nombre: 'Carlos M.', pais: '🇪🇨 Ecuador', testimonio: 'En 3 meses pasé de cero conocimiento a hacer mi primer 15% en cripto. El soporte de Luis es invaluable.', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
              { nombre: 'María G.', pais: '🇲🇽 México', testimonio: 'Probé 5 cursos antes. Este fue el único que me enseñó a leer el mercado de verdad. Ahora opero con confianza.', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
              { nombre: 'Javier R.', pais: '🇨🇴 Colombia', testimonio: 'La comunidad es oro puro. Cada semana hay análisis en vivo y estrategias actualizadas. Inversión recuperada en 1 mes.', avatar: 'https://randomuser.me/api/portraits/men/65.jpg' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(16, 185, 129, 0.4)' }}
                className="backdrop-blur-md bg-primary-light/40 border border-cyber-emerald/20 rounded-3xl p-8 hover:border-cyber-emerald/60 transition-all duration-500 group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img src={item.avatar} alt={item.nombre} className="w-16 h-16 rounded-full border-2 border-gold group-hover:border-cyber-cyan transition-colors duration-300" />
                  <div>
                    <div className="font-bold text-lg">{item.nombre}</div>
                    <div className="text-sm text-gray-500">{item.pais}</div>
                  </div>
                </div>
                <p className="text-gray-300 italic leading-relaxed">
                  "{item.testimonio}"
                </p>
                <div className="mt-6 flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-gold text-xl">★</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentor Section Premium */}
      <section className="py-24 px-4 bg-gradient-to-br from-primary-dark via-black to-primary-dark relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="backdrop-blur-md bg-primary-light/40 border border-gold/30 rounded-3xl p-12 flex flex-col md:flex-row items-center gap-12"
          >
            <motion.img
              whileHover={{ scale: 1.05, rotate: 2 }}
              src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=400&h=400&q=80"
              alt={config.mentor.nombre}
              className="w-48 h-48 rounded-full border-4 border-gold shadow-glow-gold object-cover"
            />
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-gold to-cyber-cyan bg-clip-text text-transparent">
                {config.mentor.nombre}
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                {config.mentor.bio}
              </p>
              <blockquote className="italic text-cyber-cyan border-l-4 border-gold pl-6 text-lg">
                "El dinero no es el objetivo. La libertad de elegir tu vida, sí."
              </blockquote>
              <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
                <span className="px-4 py-2 rounded-full bg-gold/10 border border-gold/30 text-sm text-gold">Wall Street Certified</span>
                <span className="px-4 py-2 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-sm text-cyber-cyan">+$10M Gestionados</span>
                <span className="px-4 py-2 rounded-full bg-cyber-emerald/10 border border-cyber-emerald/30 text-sm text-cyber-emerald">40+ Países</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Final Premium */}
      <section id="inscripcion" className="py-24 px-4 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-gold/10 via-transparent to-transparent" />
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="backdrop-blur-md bg-primary-light/50 border border-gold/40 rounded-3xl p-12 shadow-glow-gold"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-gold via-gold-light to-cyber-cyan bg-clip-text text-transparent">
              🔥 Asegura Tu Cupo Ahora
            </h2>
            <p className="text-center text-lg text-gray-300 mb-8">
              Acceso inmediato al campus + comunidad privada + actualizaciones de por vida.<br/>
              <span className="font-bold text-gold">Solo quedan 23 plazas</span> en esta convocatoria.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                name="nombre"
                placeholder="Nombre completo"
                required
                className="w-full p-4 bg-primary-light/60 border border-gold/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition backdrop-blur-sm text-white placeholder-gray-500"
              />
              <input
                name="email"
                type="email"
                placeholder="Correo electrónico"
                required
                className="w-full p-4 bg-primary-light/60 border border-gold/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition backdrop-blur-sm text-white placeholder-gray-500"
              />
              <input
                name="telefono"
                placeholder="Teléfono (WhatsApp)"
                required
                className="w-full p-4 bg-primary-light/60 border border-gold/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition backdrop-blur-sm text-white placeholder-gray-500"
              />

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(245, 158, 11, 0.7)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-gold via-gold-light to-gold-dark text-black font-bold p-5 rounded-xl text-xl shadow-glow-gold transition-all duration-300 disabled:opacity-50"
              >
                {loading ? 'Procesando...' : `💳 Invertir $${config.curso.precio} en Mi Futuro`}
              </motion.button>
            </form>

            {paymentStatus && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mt-6 text-cyber-emerald font-semibold"
              >
                {paymentStatus}
              </motion.p>
            )}

            <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span className="text-cyber-emerald text-xl">✓</span>
                Garantía 30 días
              </div>
              <div className="flex items-center gap-2">
                <span className="text-cyber-emerald text-xl">✓</span>
                Pago seguro SSL
              </div>
              <div className="flex items-center gap-2">
                <span className="text-cyber-emerald text-xl">✓</span>
                Soporte 24/7
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Premium */}
      <footer className="py-12 px-4 bg-primary-dark border-t border-gold/10 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold bg-gradient-to-r from-gold to-cyber-cyan bg-clip-text text-transparent mb-2">
              LUIS COLOMA ACADEMY
            </div>
            <div className="text-xs text-gray-500">
              © {new Date().getFullYear()} Todos los derechos reservados.
            </div>
            <div className="mt-2 text-xs text-gray-600 italic">
              "El mejor momento para invertir fue ayer. El segundo mejor, hoy."
            </div>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#temario" className="text-gray-400 hover:text-gold transition">Programa</a>
            <a href="#testimonios" className="text-gray-400 hover:text-gold transition">Testimonios</a>
            <a href="#mentor" className="text-gray-400 hover:text-gold transition">Mentor</a>
            <a href="#inscripcion" className="text-gray-400 hover:text-gold transition">Inscripción</a>
          </nav>

          <div className="flex gap-4">
            <a
              href="https://wa.me/593999999999"
              target="_blank"
              rel="noopener"
              aria-label="WhatsApp"
              className="w-10 h-10 rounded-full bg-primary-light/40 border border-cyber-emerald/30 flex items-center justify-center hover:border-cyber-emerald hover:shadow-glow-emerald transition-all duration-300"
            >
              <span className="text-cyber-emerald text-xl">💬</span>
            </a>
            <a
              href="mailto:info@luiscoloma.com"
              aria-label="Email"
              className="w-10 h-10 rounded-full bg-primary-light/40 border border-cyber-cyan/30 flex items-center justify-center hover:border-cyber-cyan hover:shadow-glow-cyan transition-all duration-300"
            >
              <span className="text-cyber-cyan text-xl">✉️</span>
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-gray-600">
          {config.disclaimer}
        </div>
      </footer>
    </div>
  )
}
