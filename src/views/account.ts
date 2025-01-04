import { LiteElement, css, customElement, html } from '@vandeurenglenn/lite'
import { translate } from '@lit-shop/translate'
import '@vandeurenglenn/flex-elements/container.js'
import '@material/web/textfield/outlined-text-field.js'

@customElement('account-view')
export class AccountView extends LiteElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    `
  ]
  render() {
    return html`
      <flex-container>
        <h1>${translate('profile')}</h1>
        <h3>${translate('address')}</h3>
        <md-outlined-text-field
          label=${translate('street')}
          class="street"></md-outlined-text-field>

        <md-outlined-text-field
          label=${translate('houseNumber')}
          class="houseNumber"></md-outlined-text-field>

        <md-outlined-text-field
          label=${translate('city')}
          class="city"></md-outlined-text-field>
      </flex-container>
    `
  }
}
