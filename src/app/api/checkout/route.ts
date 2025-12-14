import { NextRequest, NextResponse } from 'next/server';
import { initiatePayment } from '../../../lib/payphoneMock';

export async function POST(request: NextRequest) {
  const { nombre, email, telefono } = await request.json();
  const amount = 99.99; // TODO: get from config
  const userData = { nombre, email, telefono };

  try {
    const result = await initiatePayment(amount, userData);
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Payment failed' }, { status: 500 });
  }
}