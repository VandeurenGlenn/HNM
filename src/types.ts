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
