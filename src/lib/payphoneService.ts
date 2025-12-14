/**
 * Servicio híbrido de Payphone
 * - En desarrollo: usa el mock
 * - En producción: usa la API real de Payphone
 */

interface PaymentData {
  amount: number;
  nombre: string;
  email: string;
  telefono: string;
}

interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  paymentUrl?: string;
  error?: string;
}

/**
 * Mock de pago para desarrollo
 */
const initiateMockPayment = async (
  amount: number,
  userData: PaymentData
): Promise<PaymentResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        transactionId: `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      });
    }, 2000);
  });
};

/**
 * Integración real con Payphone API
 */
const initiatePayphonePayment = async (
  amount: number,
  userData: PaymentData
): Promise<PaymentResponse> => {
  const payphoneToken = process.env.PAYPHONE_TOKEN;
  const payphoneApiUrl = process.env.PAYPHONE_API_URL || 'https://pay.payphonetodoesposible.com/api';

  if (!payphoneToken) {
    throw new Error('PAYPHONE_TOKEN no está configurado en las variables de entorno');
  }

  try {
    // Preparar los datos según la API de Payphone
    const paymentData = {
      amount: amount.toFixed(2),
      currency: 'USD',
      clientTransactionId: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      client: {
        name: userData.nombre,
        email: userData.email,
        phone: userData.telefono,
      },
      // URL de retorno después del pago
      returnUrl: process.env.PAYPHONE_RETURN_URL || `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/payment/success`,
      cancelUrl: process.env.PAYPHONE_CANCEL_URL || `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/payment/cancel`,
    };

    const response = await fetch(`${payphoneApiUrl}/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${payphoneToken}`,
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error en Payphone: ${response.statusText}`);
    }

    const result = await response.json();

    return {
      success: true,
      transactionId: result.transactionId || result.id,
      paymentUrl: result.paymentUrl || result.url, // URL para redirigir al usuario
    };
  } catch (error) {
    console.error('Error en Payphone:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido en Payphone',
    };
  }
};

/**
 * Función principal que decide qué servicio usar según el entorno
 */
export const initiatePayment = async (
  amount: number,
  userData: PaymentData
): Promise<PaymentResponse> => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const useMock = process.env.USE_PAYPHONE_MOCK === 'true' || isDevelopment;

  if (useMock) {
    console.log('🔧 [DEV] Usando servicio mock de Payphone');
    return await initiateMockPayment(amount, userData);
  } else {
    console.log('🚀 [PROD] Usando API real de Payphone');
    return await initiatePayphonePayment(amount, userData);
  }
};

