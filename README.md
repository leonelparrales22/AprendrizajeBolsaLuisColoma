# Curso de Bolsa de Valores y Criptomonedas

Landing page moderna y responsive para el curso de inversiones en bolsa y criptomonedas, impartido por Luis Coloma.

## Características

- Diseño oscuro profesional con paleta azul oscuro, dorado y blanco
- Totalmente responsive
- **Sistema de pagos híbrido**: Mock en desarrollo, Payphone real en producción
- Mantenibilidad alta: todo el contenido en un archivo JSON
- Next.js 14 con App Router
- Tailwind CSS para estilos

## Instalación

1. Clona el repositorio
2. Instala dependencias: `npm install`
3. Crea un archivo `.env.local` en la raíz del proyecto (opcional para desarrollo)
4. Ejecuta en desarrollo: `npm run dev`
5. Abre http://localhost:3000

### Configuración de Pagos

El sistema tiene una funcionalidad híbrida:
- **En desarrollo**: Usa automáticamente el servicio mock (no requiere configuración)
- **En producción**: Se conecta con la API real de Payphone

#### Para Producción

Crea un archivo `.env.local` o configura las variables de entorno en tu plataforma de hosting con:

```env
# Token de autenticación de Payphone (obtener desde el dashboard)
PAYPHONE_TOKEN=your_payphone_token_here

# URL de la API de Payphone (opcional, tiene valor por defecto)
PAYPHONE_API_URL=https://pay.payphonetodoesposible.com/api

# URLs de retorno después del pago
PAYPHONE_RETURN_URL=https://tudominio.com/payment/success
PAYPHONE_CANCEL_URL=https://tudominio.com/payment/cancel

# URL de tu aplicación
NEXT_PUBLIC_APP_URL=https://tudominio.com
```

**Nota**: Si quieres forzar el uso del mock incluso en producción (útil para testing), agrega:
```env
USE_PAYPHONE_MOCK=true
```

## Estructura del Proyecto

- `src/data/config.json`: Archivo de configuración con todo el texto y datos del sitio
- `src/lib/payphoneService.ts`: Servicio híbrido de Payphone (mock en dev, real en prod)
- `src/lib/payphoneMock.ts`: Servicio mock (legacy, mantenido por compatibilidad)
- `src/app/api/checkout/route.ts`: API Route para procesar el checkout
- `src/app/page.tsx`: Página principal con componentes Hero, Benefits, Mentor, PaymentSection y Footer
- `public/data/config.json`: Copia del config para acceso desde el frontend

## Tecnologías

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- ESLint

## Despliegue en Vercel (Plan Gratuito)

Para desplegar en Vercel usando el mock de pagos (ideal para demostraciones):

1. **Sube tu código a GitHub**
2. **Ve a [vercel.com](https://vercel.com)** e inicia sesión
3. **Importa tu proyecto** desde GitHub
4. **Configura la variable de entorno**:
   - Key: `USE_PAYPHONE_MOCK`
   - Value: `true`
   - Environments: Production, Preview, Development
5. **Click en "Deploy"**

Tu sitio estará disponible en `tu-proyecto.vercel.app` en 2-3 minutos.

📖 **Guía detallada**: Ver `DEPLOY_VERCEL.md` o `QUICK_DEPLOY.md` para instrucciones completas.

## Notas

- **Sistema de pagos híbrido**: En desarrollo usa automáticamente el mock. En producción se conecta con Payphone si están configuradas las variables de entorno.
- El mock simula una espera de 2 segundos y devuelve éxito (útil para desarrollo y testing).
- El disclaimer legal es obligatorio y se muestra en el footer.
- Las variables de entorno con `NEXT_PUBLIC_` son accesibles desde el cliente, las demás solo en el servidor.