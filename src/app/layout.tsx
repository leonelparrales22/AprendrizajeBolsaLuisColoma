import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Curso de Bolsa de Valores - Luis Coloma',
  description: '📈 Domina la Bolsa de Valores y Mercados Financieros. Más de 1,000 alumnos exitosos en 30+ países. 4 años de experiencia. ¡Únete ahora!',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/favicon.svg',
  },
  openGraph: {
    title: '📈 Curso de Bolsa de Valores - Luis Coloma',
    description: 'Domina la Bolsa de Valores y Mercados Financieros. Formación elite con +1,000 alumnos exitosos en 30+ países. ¡Transforma tu futuro financiero!',
    url: 'https://tudominio.com',
    siteName: 'Luis Coloma Academy',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'Curso de Bolsa de Valores - Luis Coloma',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '📈 Curso de Bolsa de Valores - Luis Coloma',
    description: 'Domina la Bolsa y transforma tu futuro financiero. +1,000 alumnos exitosos en 30+ países.',
    images: ['https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&h=630&q=80'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-gray-900 text-white">{children}</body>
    </html>
  )
}