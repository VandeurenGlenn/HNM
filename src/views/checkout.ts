import { LiteElement, html, css, customElement } from '@vandeurenglenn/lite'
import '@material/web/textfield/outlined-text-field.js'
import '@material/web/select/outlined-select.js'
import '@material/web/select/select-option.js'
import '@vandeurenglenn/flex-elements/container.js'

@customElement('checkout-view')
export class CheckoutView extends LiteElement {
  static styles = [
    css`
      :host {
        display: block;
      }

      md-outlined-text-field {
        width: 100%;
        margin-bottom: 12px;
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
