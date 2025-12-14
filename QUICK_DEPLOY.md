# 🚀 Despliegue Rápido en Vercel (5 minutos)

## Pasos Rápidos:

### 1. Sube tu código a GitHub
```bash
git add .
git commit -m "Listo para Vercel"
git push
```

### 2. Ve a Vercel
- https://vercel.com
- Login con GitHub
- "Add New Project"
- Selecciona tu repo

### 3. Configura Variable de Entorno
En la sección "Environment Variables":
- **Key**: `USE_PAYPHONE_MOCK`
- **Value**: `true`
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

### 4. Deploy
- Click "Deploy"
- Espera 2-3 minutos
- ¡Listo! Tu sitio estará en `tu-proyecto.vercel.app`

## ✅ Verificación

Después del deploy, prueba el formulario de pago. Debería:
- Mostrar "Procesando..." por 2 segundos
- Mostrar "¡Pago exitoso! ID: mock_..."

Si ves eso, el mock está funcionando correctamente.

## 📝 Nota

El plan gratuito de Vercel es suficiente para demostraciones. Incluye:
- ✅ SSL automático
- ✅ Dominio gratuito
- ✅ Deployments ilimitados
- ✅ 100 GB de ancho de banda/mes

