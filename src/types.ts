export type UserInfo = {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  address: {
    city: string
    country: string
    houseNumber: string
    postalCode: string
    street: string
  }
  company: {
    name: string
    BTW: string
  }
}

export type PayconiqPaymentLink = {
  href: string
}

export type PayConiqPaymentStatus =
  | 'PENDING'
  | 'IDENTIFIED'
  | 'CANCELLED'
  | 'AUTHORIZED'
  | 'AUTHORIZATION_FAILED'
  | 'EXPIRED'
  | 'FAILED'
  | 'SUCCEEDED'

export type PayconiqPayment = {
  amount: number
  createdAt: string
  creditor: { profileId: string; merchantId: string; name: string; iban: string }
  currency: string
  description: string
  expiresAt: string
  paymentId: string
  status: PayConiqPaymentStatus
  _links: {
    cancel: PayconiqPaymentLink
    deeplink: PayconiqPaymentLink
    qrcode: PayconiqPaymentLink
    self: PayconiqPaymentLink
  }
}
