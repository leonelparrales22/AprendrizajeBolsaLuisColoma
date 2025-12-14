/** @type {import('next').NextConfig} */
const nextConfig = {
  // Solución temporal: deshabilitar minimización para evitar error de CSS
  // Esto aumenta ligeramente el tamaño de los archivos pero permite el build
  // TODO: Investigar y corregir el problema de minimización de CSS
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        minimize: false,
      }
    }
    return config
  },
}

module.exports = nextConfig