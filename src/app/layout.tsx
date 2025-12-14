import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Curso de Bolsa de Valores y Criptomonedas',
  description: 'Aprende a invertir de manera inteligente',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="font-sans">{children}</body>
    </html>
  )
}