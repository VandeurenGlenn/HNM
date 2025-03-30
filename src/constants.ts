// @ts-ignore - Ignoring as this is replaced during build
export const isProduction = process.env.NODE_ENV === 'production'

export const CHECKOUT_PAYCONIQ_URL = isProduction
  ? 'https://api.hellonewme.be/checkout/payconiq/createPayment'
  : 'http://localhost:3005/checkout/payconiq/createPayment'
