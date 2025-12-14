# Configuración del Sistema de Pagos Híbrido

Este proyecto implementa un sistema de pagos híbrido que automáticamente usa un servicio mock en desarrollo y se conecta con Payphone en producción.

## Cómo Funciona

### Desarrollo (Automático)
- Cuando `NODE_ENV=development`, el sistema usa automáticamente el mock
- No requiere configuración adicional
- Simula un pago exitoso después de 2 segundos
- Útil para desarrollo y testing sin necesidad de credenciales reales

### Producción
- Cuando `NODE_ENV=production` y las variables de Payphone están configuradas, usa la API real
- Requiere configurar las variables de entorno (ver abajo)
- Redirige al usuario a la plataforma de Payphone para completar el pago

## Variables de Entorno Requeridas (Producción)

Crea un archivo `.env.local` o configura estas variables en tu plataforma de hosting:

```env
# Token de autenticación de Payphone
# Obtener desde: https://payphonetodoesposible.com/dashboard
PAYPHONE_TOKEN=tu_token_aqui

# URL de la API (opcional, tiene valor por defecto)
PAYPHONE_API_URL=https://pay.payphonetodoesposible.com/api

# URLs de retorno después del pago
PAYPHONE_RETURN_URL=https://tudominio.com/payment/success
PAYPHONE_CANCEL_URL=https://tudominio.com/payment/cancel

# URL de tu aplicación
NEXT_PUBLIC_APP_URL=https://tudominio.com
```

## Forzar Mock en Producción

Si necesitas usar el mock incluso en producción (útil para testing), agrega:

```env
USE_PAYPHONE_MOCK=true
```

## Flujo de Pago

1. **Usuario completa el formulario** → Se envía a `/api/checkout`
2. **Backend detecta el entorno**:
   - **Dev**: Usa mock → Retorna éxito inmediato
   - **Prod**: Llama a Payphone → Retorna URL de pago
3. **Frontend maneja la respuesta**:
   - Si hay `paymentUrl`: Redirige al usuario a Payphone
   - Si no hay `paymentUrl`: Muestra mensaje de éxito (mock)

## Estructura del Código

- `src/lib/payphoneService.ts`: Servicio híbrido principal
  - `initiatePayment()`: Función principal que decide qué usar
  - `initiateMockPayment()`: Implementación del mock
  - `initiatePayphonePayment()`: Integración con Payphone real

- `src/app/api/checkout/route.ts`: Endpoint que procesa los pagos
  - Valida los datos del usuario
  - Llama a `payphoneService.initiatePayment()`
  - Retorna la respuesta al frontend

## Testing

### Probar el Mock
```bash
npm run dev
# El sistema usará automáticamente el mock
```

### Probar Payphone Real
1. Configura las variables de entorno con tus credenciales
2. Establece `NODE_ENV=production` o despliega en producción
3. El sistema se conectará automáticamente con Payphone

## Troubleshooting

### El sistema no usa Payphone en producción
- Verifica que `NODE_ENV=production`
- Verifica que `USE_PAYPHONE_MOCK` no esté configurado como `true`
- Verifica que `PAYPHONE_TOKEN` esté configurado

### Error: "PAYPHONE_TOKEN no está configurado"
- Asegúrate de tener la variable `PAYPHONE_TOKEN` en tu `.env.local` o en las variables de entorno de tu hosting

### El usuario no es redirigido a Payphone
- Verifica que la respuesta de la API incluya `paymentUrl`
- Revisa los logs del servidor para ver si hay errores en la llamada a Payphone

