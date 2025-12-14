import { NextRequest, NextResponse } from 'next/server';
import { initiatePayment } from '../../../lib/payphoneService';
import { config } from '../../../data/config';

export async function POST(request: NextRequest) {
  try {
    const { nombre, email, telefono } = await request.json();

    // Validar datos requeridos
    if (!nombre || !email || !telefono) {
      return NextResponse.json(
        { success: false, error: 'Faltan datos requeridos (nombre, email, telefono)' },
        { status: 400 }
      );
    }

    const amount = config.curso.precio;
    const userData = { nombre, email, telefono, amount };

    const result = await initiatePayment(amount, userData);

    if (result.success) {
      return NextResponse.json({
        success: true,
        transactionId: result.transactionId,
        paymentUrl: result.paymentUrl, // URL de Payphone si está disponible
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error || 'Error al procesar el pago' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error en checkout:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido al procesar el pago',
      },
      { status: 500 }
    );
  }
}