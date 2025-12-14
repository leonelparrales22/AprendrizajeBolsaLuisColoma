# Curso de Bolsa de Valores y Criptomonedas

Landing page moderna y responsive para el curso de inversiones en bolsa y criptomonedas, impartido por Luis Coloma.

## Características

- Diseño oscuro profesional con paleta azul oscuro, dorado y blanco
- Totalmente responsive
- Simulación de pagos con Payphone (mock service)
- Mantenibilidad alta: todo el contenido en un archivo JSON
- Next.js 14 con App Router
- Tailwind CSS para estilos

## Instalación

1. Clona el repositorio
2. Instala dependencias: `npm install`
3. Ejecuta en desarrollo: `npm run dev`
4. Abre http://localhost:3000

## Estructura del Proyecto

- `src/data/config.json`: Archivo de configuración con todo el texto y datos del sitio
- `src/lib/payphoneMock.ts`: Servicio mock para simular pagos con Payphone
- `src/app/api/checkout/route.ts`: API Route para procesar el checkout
- `src/app/page.tsx`: Página principal con componentes Hero, Benefits, Mentor, PaymentSection y Footer
- `public/data/config.json`: Copia del config para acceso desde el frontend

## Tecnologías

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- ESLint

## Notas

- El servicio de pagos es un mock que simula una espera de 2 segundos y devuelve éxito.
- Para producción, reemplazar el mock con la API real de Payphone.
- El disclaimer legal es obligatorio y se muestra en el footer.