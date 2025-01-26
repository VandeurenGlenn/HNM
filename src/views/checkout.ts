import { LiteElement, html, css, customElement, property } from '@vandeurenglenn/lite'
import '@material/web/textfield/outlined-text-field.js'
import '@material/web/select/outlined-select.js'
import '@material/web/select/select-option.js'
import '@vandeurenglenn/flex-elements/container.js'
import { translate } from '@lit-shop/translate'
import { UserInfo } from '../types.js'

@customElement('checkout-view')
export class CheckoutView extends LiteElement {
  @property({ type: Object, consumes: true }) accessor userInfo: UserInfo

  static styles = [
    css`
      :host {
        display: block;
        align-items: center;
        justify-content: center;
        overflow-y: auto;
      }

      md-outlined-text-field {
        width: 100%;
        margin-bottom: 12px;
      }

      flex-row {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        width: 100%;
        justify-content: space-between;
        align-items: center;
      }

      flex-row md-outlined-text-field {
        flex: 1;
      }

      custom-button {
        width: 124px;
      }

      h2 {
        margin-bottom: 0;
      }
    `
  ]

  handlePay = () => {
    const inputs = this.shadowRoot.querySelectorAll('md-outlined-text-field')
    let errors = false
    for (const input of inputs) {
      const valid = input.checkValidity()
      if (!valid || (!input.value && input.required)) {
        errors = true
        input.errorText = translate('Please fill in this field')
        input.error = true
      } else input.error = false
    }
    const selectors = this.shadowRoot.querySelectorAll('md-outlined-select')

    for (const select of selectors) {
      if (!select.value && select.required) {
        errors = true
        select.errorText = translate('Please select a payment method')
        select.error = true
      } else {
        select.error = false
      }
    }

    if (errors) return
    requestAnimationFrame(() => this.completePayment())
  }

  completePayment = () => {
    alert(translate('Payment completed'))
  }

  render() {
    return html`
      <flex-container>
        <h2>${translate('Checkout')}</h2>
        <h4>${translate('shipping address')}</h4>
        ${this.userInfo ? '' : html`<p>${translate('Please fill in the fields below or login.')}</p>`}
        <form>
          <flex-row>
            <md-outlined-text-field
              label=${translate('First Name')}
              .value=${this.userInfo?.firstName}
              autocomplete="given-name"
              required></md-outlined-text-field>
            <md-outlined-text-field
              label=${translate('Last Name')}
              .value=${this.userInfo?.lastName}
              autocomplete="family-name"
              required></md-outlined-text-field>
          </flex-row>

          <flex-row>
            <md-outlined-text-field
              label=${translate('Address')}
              value=${this.userInfo?.address?.street}
              autocomplete="shipping street-address"
              required></md-outlined-text-field>
            <md-outlined-text-field
              label=${translate('House number')}
              value=${this.userInfo?.address?.houseNumber}
              required></md-outlined-text-field>
          </flex-row>
          <flex-row>
            <md-outlined-text-field
              label=${translate('City')}
              value=${this.userInfo?.address?.city}
              required></md-outlined-text-field>
            <md-outlined-text-field
              label=${translate('Zip code')}
              value=${this.userInfo?.address?.postalCode}
              required></md-outlined-text-field>
            <md-outlined-text-field
              label=${translate('Country')}
              value=${this.userInfo?.address?.country}
              required></md-outlined-text-field>
          </flex-row>
          <md-outlined-text-field
            label=${translate('Phone Number')}
            autocomplete="mobile"
            value=${this.userInfo?.phoneNumber}
            required></md-outlined-text-field>

          <md-outlined-text-field
            label="Email"
            type="email"
            value=${this.userInfo?.email}
            autocomplete="email"
            required></md-outlined-text-field>
          <h4>${translate('company info')}</h4>
          <flex-row>
            <md-outlined-text-field
              autocomplete="shipping company"
              label=${translate('company name')}
              value=${this.userInfo?.company?.name}></md-outlined-text-field>
            <md-outlined-text-field
              autocomplete="shipping vat"
              label=${'BTW'}
              value=${this.userInfo?.company?.BTW}></md-outlined-text-field>
          </flex-row>

          <h4>${translate('Payment')}</h4>

          <flex-row>
            <md-outlined-select
              required
              label=${translate('Payment method')}>
              <md-select-option value="credit-card">${translate('Credit card')}</md-select-option>
              <md-select-option value="paypal">${translate('Paypal')}</md-select-option>

              <md-select-option value="payconiq/bancontact">payconiq/bancontact</md-select-option>
            </md-outlined-select>

            <custom-button
              type="tonal"
              @click=${() => this.handlePay()}
              has-label="true"
              label=${translate('Pay')}>
              <custom-icon
                icon="payments"
                slot="icon"></custom-icon>
            </custom-button>
          </flex-row>
        </form>
      </flex-container>
    `
  }
}
