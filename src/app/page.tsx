'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { config } from '../data/config'

export default function Home() {
  const [paymentStatus, setPaymentStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [phoneValue, setPhoneValue] = useState<string>('')

  const testimonios = [
    { nombre: 'Carlos M.', pais: '🇪🇨 Ecuador', testimonio: 'En 3 meses pasé de cero conocimiento a hacer mi primer 15% en cripto. El soporte de Luis es invaluable.', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', rating: 5 },
    { nombre: 'María G.', pais: '🇲🇽 México', testimonio: 'Probé 5 cursos antes. Este fue el único que me enseñó a leer el mercado de verdad. Ahora opero con confianza.', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', rating: 5 },
    { nombre: 'Javier R.', pais: '🇨🇴 Colombia', testimonio: 'La comunidad es oro puro. Cada semana hay análisis en vivo y estrategias actualizadas. Inversión recuperada en 1 mes.', avatar: 'https://randomuser.me/api/portraits/men/65.jpg', rating: 5 },
    { nombre: 'Ana L.', pais: '🇦🇷 Argentina', testimonio: 'Finalmente entendí el análisis técnico. Las estrategias son claras y aplicables. Mi portafolio creció un 25% este trimestre.', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', rating: 5 },
    { nombre: 'Pedro S.', pais: '🇵🇪 Perú', testimonio: 'Luis es un mentor de verdad. No solo enseña teoría, comparte su experiencia real. El mejor curso que he tomado.', avatar: 'https://randomuser.me/api/portraits/men/52.jpg', rating: 5 }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonios.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonios.length])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    // Validar que el teléfono esté completo y sea válido
    if (!phoneValue || !isValidPhoneNumber(phoneValue)) {
      setPaymentStatus('Por favor, ingresa un número de teléfono válido con código de país')
      setLoading(false)
      return
    }
    
    const data = {
      nombre: formData.get('nombre') as string,
      email: formData.get('email') as string,
      telefono: phoneValue // Usar el valor del PhoneInput con código de país
    }
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      const result = await res.json()
      setLoading(false)
      
      if (result.success) {
        // Si hay una URL de pago (Payphone real), redirigir al usuario
        if (result.paymentUrl) {
          setPaymentStatus('Redirigiendo a Payphone...')
          window.location.href = result.paymentUrl
        } else {
          // Mock o pago completado directamente
          setPaymentStatus('¡Pago exitoso! ID: ' + result.transactionId)
        }
      } else {
        setPaymentStatus('Error en el pago: ' + (result.error || 'Error desconocido'))
      }
    } catch (error) {
      setLoading(false)
      setPaymentStatus('Error de conexión. Por favor, intenta nuevamente.')
    }
  }

  const titleWords = config.titulo.split(' ')

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-light to-white text-gray-900 font-sans overflow-x-hidden">
      {/* Navbar Profesional */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-accent to-gold bg-clip-text text-transparent">
            LUIS COLOMA
          </div>
          <a href="#inscripcion" className="px-6 py-2 rounded-full bg-gradient-to-r from-accent to-accent-light text-white font-semibold hover:shadow-glow-accent transition-all duration-300">
            Inscríbete Ahora
          </a>
        </div>
      </motion.nav>

      {/* Hero con Imagen de Fondo */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center overflow-hidden pt-20">
        {/* Imagen de fondo */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=2000&q=80"
            alt="Trading Background"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-primary/80 to-white" />
        </div>

        {/* Grid Pattern Sutil */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          {/* Texto Hero */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-block bg-gradient-to-r from-accent/10 to-gold/10 border border-accent/20 rounded-full px-6 py-2 mb-8"
            >
              <span className="text-sm font-bold bg-gradient-to-r from-accent to-gold bg-clip-text text-transparent uppercase tracking-wider">
                🏆 Formación Elite • {config.metricas.alumnos} Alumnos Exitosos
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              {titleWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="inline-block mr-3 bg-gradient-to-r from-accent via-accent-light to-gold bg-clip-text text-transparent"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-xl md:text-2xl mb-10 text-gray-700 max-w-3xl font-light leading-relaxed"
            >
              {config.subtitulo}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10"
            >
              <a
                href="#inscripcion"
                className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-accent to-accent-light text-white font-bold text-lg shadow-lg hover:shadow-glow-accent hover:scale-105 transition-all duration-300"
              >
                🚀 Comenzar Ahora
              </a>
              <a
                href="#temario"
                className="inline-block px-10 py-4 rounded-full bg-white border-2 border-accent text-accent font-bold text-lg hover:bg-accent hover:text-white transition-all duration-300"
              >
                Ver Programa
              </a>
            </motion.div>

            {/* Métricas */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="flex flex-wrap gap-8 justify-center lg:justify-start"
            >
              {[
                { label: 'Alumnos', value: config.metricas.alumnos },
                { label: 'Años', value: config.metricas.experiencia },
                { label: 'Satisfacción', value: config.metricas.satisfaccion },
                { label: 'Países', value: config.metricas.paises }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent to-gold bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Imagen Hero */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex-1 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
                alt="Dashboard de Trading"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent" />
            </div>
            {/* Floating Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border-2 border-gold"
            >
              <div className="text-3xl font-bold text-gold">98%</div>
              <div className="text-sm text-gray-600">Satisfacción</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Logos de Confianza (Carrusel) */}
      <section className="py-16 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-sm text-gray-600 mb-8 uppercase tracking-wider font-semibold">
            Metodologías respaldadas por instituciones líderes
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale">
            {['Forbes', 'Bloomberg', 'WSJ', 'CNBC', 'Reuters'].map((logo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-2xl font-bold text-gray-700"
              >
                {logo}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Mejorado con Imágenes */}
      <section id="temario" className="py-24 px-4 bg-gradient-to-b from-white to-primary-light relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-accent via-accent-light to-gold bg-clip-text text-transparent">
              Tu Ruta hacia la Libertad Financiera
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Un sistema modular diseñado para llevarte de cero a profesional. Paso a paso, con resultados reales.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {config.temario.map((modulo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(30, 64, 175, 0.15)' }}
                className={`bg-white border border-gray-200 rounded-3xl p-8 hover:border-accent transition-all duration-500 group shadow-lg ${i === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                  } ${i === 3 ? 'md:col-span-2 lg:col-span-2' : ''}`}
              >
                {/* Mini imagen */}
                <div className="relative w-full h-40 rounded-2xl overflow-hidden mb-6">
                  <img
                    src={
                      i === 0 ? 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80'
                        : i === 1 ? 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=600&q=80'
                          : i === 2 ? 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80'
                            : 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80'
                    }
                    alt={modulo.titulo}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-accent/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-4xl">{i === 0 && '📊'}{i === 1 && '📈'}{i === 2 && '🛡️'}{i === 3 && '💎'}</div>
                </div>

                <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-accent transition-colors duration-300">
                  {modulo.titulo}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {modulo.descripcion}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Carrusel de Testimonios */}
      <section className="py-24 px-4 bg-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-accent to-gold bg-clip-text text-transparent">
              Historias de Éxito Reales
            </h2>
            <p className="text-gray-600 text-lg">
              Alumnos que transformaron su vida financiera
            </p>
          </motion.div>

          {/* Carrusel */}
          <div className="relative h-96">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div className="bg-gradient-to-br from-primary-light to-white border-2 border-accent/20 rounded-3xl p-12 shadow-2xl h-full flex flex-col justify-center">
                  <div className="flex items-center gap-6 mb-8">
                    <img
                      src={testimonios[currentTestimonial].avatar}
                      alt={testimonios[currentTestimonial].nombre}
                      className="w-20 h-20 rounded-full border-4 border-gold shadow-lg"
                    />
                    <div>
                      <div className="font-bold text-2xl text-gray-900">{testimonios[currentTestimonial].nombre}</div>
                      <div className="text-sm text-gray-600">{testimonios[currentTestimonial].pais}</div>
                      <div className="flex gap-1 mt-2">
                        {[...Array(testimonios[currentTestimonial].rating)].map((_, j) => (
                          <span key={j} className="text-gold text-lg">★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-xl italic leading-relaxed">
                    "{testimonios[currentTestimonial].testimonio}"
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Indicadores */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
              {testimonios.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentTestimonial ? 'bg-accent w-8' : 'bg-gray-300'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mentor Section con Imagen */}
      <section className="py-24 px-4 bg-gradient-to-br from-primary-light to-white relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border-2 border-accent/20 rounded-3xl shadow-2xl p-12 flex flex-col md:flex-row items-center gap-12"
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=facearea&w=400&h=400&q=80"
              alt={config.mentor.nombre}
              className="w-64 h-64 rounded-full border-4 border-gold shadow-2xl object-cover"
            />
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-accent to-gold bg-clip-text text-transparent">
                {config.mentor.nombre}
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                {config.mentor.bio}
              </p>
              <blockquote className="italic text-accent-light border-l-4 border-gold pl-6 text-lg mb-6">
                "El dinero no es el objetivo. La libertad de elegir tu vida, sí."
              </blockquote>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <span className="px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-sm text-accent font-semibold">Wall Street Certified</span>
                <span className="px-4 py-2 rounded-full bg-gold/10 border border-gold/30 text-sm text-gold font-semibold">+$10M Gestionados</span>
                <span className="px-4 py-2 rounded-full bg-cyber-emerald/10 border border-cyber-emerald/30 text-sm text-cyber-emerald font-semibold">40+ Países</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <section id="inscripcion" className="py-24 px-4 bg-white relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-accent to-accent-light border-2 border-accent rounded-3xl p-12 shadow-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
              🔥 Asegura Tu Cupo Ahora
            </h2>
            <p className="text-center text-lg text-white/90 mb-8">
              Acceso inmediato al campus + comunidad privada + actualizaciones de por vida.<br />
              <span className="font-bold text-gold">Solo quedan 23 plazas</span> en esta convocatoria.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                name="nombre"
                placeholder="Nombre completo"
                required
                className="w-full p-4 bg-white/95 border-2 border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold text-gray-900 placeholder-gray-500 shadow-lg"
              />
              <input
                name="email"
                type="email"
                placeholder="Correo electrónico"
                required
                className="w-full p-4 bg-white/95 border-2 border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold text-gray-900 placeholder-gray-500 shadow-lg"
              />
              <div className="w-full phone-input-wrapper">
                <PhoneInput
                  international
                  defaultCountry="EC"
                  value={phoneValue}
                  onChange={(value) => setPhoneValue(value || '')}
                  placeholder="Teléfono (WhatsApp)"
                  className="phone-input-custom"
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-gold to-gold-dark text-white font-bold p-5 rounded-xl text-xl shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50"
              >
                {loading ? 'Procesando...' : `💳 Invertir $${config.curso.precio} en Mi Futuro`}
              </motion.button>
            </form>

            {paymentStatus && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mt-6 text-gold font-semibold text-lg"
              >
                {paymentStatus}
              </motion.p>
            )}

            <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <span className="text-gold text-xl">✓</span>
                Garantía 30 días
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gold text-xl">✓</span>
                Pago seguro SSL
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gold text-xl">✓</span>
                Soporte 24/7
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-primary-dark border-t border-gray-300 relative">
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold bg-gradient-to-r from-accent to-gold bg-clip-text text-transparent mb-2">
              LUIS COLOMA ACADEMY
            </div>
            <div className="text-xs text-gray-600">
              © {new Date().getFullYear()} Todos los derechos reservados.
            </div>
            <div className="mt-2 text-xs text-gray-500 italic">
              "El mejor momento para invertir fue ayer. El segundo mejor, hoy."
            </div>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#temario" className="text-gray-600 hover:text-accent transition">Programa</a>
            <a href="#testimonios" className="text-gray-600 hover:text-accent transition">Testimonios</a>
            <a href="#mentor" className="text-gray-600 hover:text-accent transition">Mentor</a>
            <a href="#inscripcion" className="text-gray-600 hover:text-accent transition">Inscripción</a>
          </nav>

          <div className="flex gap-4">
            <a
              href="https://wa.me/593999999999"
              target="_blank"
              rel="noopener"
              aria-label="WhatsApp"
              className="w-10 h-10 rounded-full bg-cyber-emerald/10 border-2 border-cyber-emerald flex items-center justify-center hover:bg-cyber-emerald hover:text-white transition-all duration-300"
            >
              <span className="text-xl">💬</span>
            </a>
            <a
              href="mailto:info@luiscoloma.com"
              aria-label="Email"
              className="w-10 h-10 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300"
            >
              <span className="text-xl">✉️</span>
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-gray-500">
          {config.disclaimer}
        </div>
      </footer>
    </div>
  )
}
