'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { isValidPhoneNumber } from 'react-phone-number-input'

// Importar PhoneInput dinámicamente para evitar problemas de CSS en el build
const PhoneInput = dynamic(
  () => import('react-phone-number-input'),
  { 
    ssr: false,
    loading: () => (
      <input
        type="tel"
        placeholder="Teléfono (WhatsApp)"
        className="w-full p-4 bg-white/95 border-2 border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold text-gray-900 placeholder-gray-500 shadow-lg"
        disabled
      />
    )
  }
)

interface PhoneInputWrapperProps {
  value: string
  onChange: (value: string | undefined) => void
}

export default function PhoneInputWrapper({ value, onChange }: PhoneInputWrapperProps) {
  return (
    <div className="w-full phone-input-wrapper">
      <PhoneInput
        international
        defaultCountry="EC"
        value={value}
        onChange={onChange}
        placeholder="Teléfono (WhatsApp)"
        className="phone-input-custom"
      />
    </div>
  )
}

export { isValidPhoneNumber }

