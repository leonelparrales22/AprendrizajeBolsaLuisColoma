# Guía de Despliegue en Vercel (Plan Gratuito) con Mock

Esta guía te ayudará a desplegar tu proyecto en Vercel usando el servicio mock de pagos para demostraciones.

## 📋 Requisitos Previos

1. Cuenta en [Vercel](https://vercel.com) (gratuita)
2. Proyecto en GitHub (recomendado) o puedes subir directamente
3. Node.js instalado localmente (para probar antes de desplegar)

## 🚀 Pasos para Desplegar

### Opción 1: Despliegue desde GitHub (Recomendado)

1. **Sube tu código a GitHub**
   ```bash
   git add .
   git commit -m "Preparado para despliegue en Vercel"
   git push origin main
   ```

2. **Conecta con Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Inicia sesión con GitHub
   - Click en "Add New Project"
   - Selecciona tu repositorio `AprendrizajeBolsaLuisColoma`
   - Vercel detectará automáticamente que es un proyecto Next.js

3. **Configura las Variables de Entorno**
   - En la sección "Environment Variables", agrega:
     ```
     USE_PAYPHONE_MOCK = true
     ```
   - Esto forzará el uso del mock incluso en producción

4. **Configuración del Proyecto**
   - **Framework Preset**: Next.js (detectado automáticamente)
   - **Root Directory**: `./` (raíz del proyecto)
   - **Build Command**: `npm run build` (por defecto)
   - **Output Directory**: `.next` (por defecto)
   - **Install Command**: `npm install` (por defecto)

5. **Despliega**
   - Click en "Deploy"
   - Espera 2-3 minutos
   - ¡Listo! Tu sitio estará en `tu-proyecto.vercel.app`

### Opción 2: Despliegue desde CLI

1. **Instala Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Inicia sesión**
   ```bash
   vercel login
   ```

3. **Despliega**
   ```bash
   vercel
   ```
   - Sigue las instrucciones
   - Cuando pregunte por variables de entorno, agrega: `USE_PAYPHONE_MOCK=true`

4. **Para producción**
   ```bash
   vercel --prod
   ```

## ⚙️ Configuración de Variables de Entorno en Vercel

### Desde el Dashboard:
1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega:
   - **Key**: `USE_PAYPHONE_MOCK`
   - **Value**: `true`
   - **Environments**: Production, Preview, Development (marca todas)

### Desde CLI:
```bash
vercel env add USE_PAYPHONE_MOCK
# Ingresa: true
# Selecciona: Production, Preview, Development
```

## 🔍 Verificar que el Mock Está Activo

Después del despliegue, puedes verificar en los logs de Vercel:
- Ve a tu proyecto → Deployments → Click en el último deployment → Logs
- Busca el mensaje: `🔧 [DEV] Usando servicio mock de Payphone`

O prueba el formulario de pago y debería funcionar con el mock (2 segundos de espera, luego éxito).

## 📝 Notas Importantes

1. **Plan Gratuito de Vercel incluye:**
   - 100 GB de ancho de banda/mes
   - Deployments ilimitados
   - SSL automático
   - Dominio personalizado gratuito (`tu-proyecto.vercel.app`)

2. **El mock funcionará porque:**
   - `USE_PAYPHONE_MOCK=true` fuerza el uso del mock
   - No requiere credenciales de Payphone
   - Simula pagos exitosos en 2 segundos

3. **Para cambiar a Payphone real después:**
   - Elimina o cambia `USE_PAYPHONE_MOCK` a `false`
   - Agrega `PAYPHONE_TOKEN` con tu token real
   - Redespliega

## 🐛 Solución de Problemas

### Error de Build
- Verifica que todas las dependencias estén en `package.json`
- Revisa los logs de build en Vercel

### El mock no funciona
- Verifica que `USE_PAYPHONE_MOCK=true` esté configurado
- Revisa los logs del deployment
- Asegúrate de que la variable esté en todos los ambientes

### Problemas con imágenes externas
- Vercel puede tener restricciones con imágenes de Unsplash
- Considera usar `next/image` con dominio configurado

## ✅ Checklist Pre-Despliegue

- [ ] Código subido a GitHub
- [ ] `package.json` tiene todos los scripts necesarios
- [ ] No hay errores de linting (`npm run lint`)
- [ ] El proyecto funciona localmente (`npm run dev`)
- [ ] El build funciona localmente (`npm run build`)
- [ ] Variables de entorno configuradas en Vercel

## 🎉 ¡Listo!

Una vez desplegado, tu cliente podrá:
- Ver la landing page completa
- Probar el formulario de inscripción
- Ver el flujo de pago simulado (mock)
- Todo funcionando en un dominio de Vercel

