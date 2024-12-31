import { LiteElement, html, css, customElement } from '@vandeurenglenn/lite'
import '@vandeurenglenn/flex-elements/container.js'

@customElement('checkout-view')
export class CheckoutView extends LiteElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ]

  render() {
    return html`
      <flex-container>
        <md-outlined-text-field label="Name"></md-outlined-text-field>
        <md-outlined-text-field label="Email"></md-outlined-text-field>
        <md-outlined-text-field label="Address"></md-outlined-text-field>
        <md-outlined-text-field label="City"></md-outlined-text-field>
        <md-outlined-text-field label="Zip code"></md-outlined-text-field>
        <md-outlined-text-field label="Country"></md-outlined-text-field>
        <md-outlined-text-field label="Phone number"></md-outlined-text-field>
        <md-outlined-select label="Payment method">
          <md-select-option value="credit-card">Credit card</md-select-option>
          <md-select-option value="paypal">Paypal</md-select-option>

          <md-select-option value="payconiq/bancontact">payconiq/bancontact</md-select-option>
        </md-outlined-select>
        <md-button>Checkout</md-button>
      </flex-container>
    `
  }
}
