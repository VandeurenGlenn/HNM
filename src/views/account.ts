import { LiteElement, css, customElement, html, property } from '@vandeurenglenn/lite'
import { translate } from '@lit-shop/translate'
import '@vandeurenglenn/flex-elements/container.js'
import '@vandeurenglenn/flex-elements/row.js'
import '@material/web/textfield/outlined-text-field.js'
import '@material/web/fab/fab.js'
import '@vandeurenglenn/lite-elements/icon.js'
import { UserCredential } from 'firebase/auth'
import { get, set } from '../firebase.js'

@customElement('account-view')
export class AccountView extends LiteElement {
  @property({ type: Object, consumes: 'user' }) accessor user: UserCredential['user']
  @property({ type: Object }) accessor userInfo: any

  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      md-outlined-text-field {
        width: 100%;
        margin-bottom: 12px;
      }
      flex-row {
        width: 100%;
      }
    `
  ]

  save = async () => {
    const inputs = this.shadowRoot.querySelectorAll('md-outlined-text-field')
    let errors = false
    for (const input of inputs) {
      if (!input.value) {
        const valid = input.checkValidity()
        if (!valid) {
          input.reportValidity()
          errors = true
        }
      }
    }
    if (errors) return

    await set(`users/${this.user.uid}`, {
      email: this.user.email,
      firstName: inputs[1].value,
      surname: inputs[2].value,
      street: inputs[3].value,
      houseNumber: inputs[4].value,
      postalCode: inputs[5].value,
      city: inputs[6].value
    })
  }

  async onChange(propertyKey: string, value: any) {
    if (propertyKey === 'user' && value) {
      this.userInfo = await get(`users/${value.uid}`)
      console.log(this.userInfo)
    }
  }
  render() {
    return html`
      <flex-container>
        <h1>${translate('profile')}</h1>
        <h3>${translate('personalInformation')}</h3>
        ${this.user
          ? html` <img
                src=${this.user.photoURL}
                alt=${this.user.displayName} />
              <p>${this.user.displayName}</p>
              <md-outlined-text-field
                required
                disabled
                label="email"
                value=${this.user.email}></md-outlined-text-field>`
          : ''}

        <flex-row>
          <md-outlined-text-field
            required
            label=${translate('first name')}
            value=${this.userInfo?.firstName}></md-outlined-text-field>
          <md-outlined-text-field
            required
            label=${translate('surname')}
            value=${this.userInfo?.surname}></md-outlined-text-field>
        </flex-row>
        <h3>${translate('address')}</h3>
        <md-outlined-text-field
          required
          label=${translate('street')}
          class="street"
          value=${this.userInfo?.street}></md-outlined-text-field>

        <md-outlined-text-field
          required
          label=${translate('houseNumber')}
          class="houseNumber"
          value=${this.userInfo?.houseNumber}></md-outlined-text-field>

        <flex-row>
          <md-outlined-text-field
            required
            label=${translate('postalCode')}
            value=${this.userInfo?.postalCode}
            class="postalCode"></md-outlined-text-field>
          <md-outlined-text-field
            required
            label=${translate('city')}
            value=${this.userInfo?.city}
            class="city"></md-outlined-text-field>
        </flex-row>
        <flex-row style="justify-content: flex-end;">
          <md-fab
            varian="surface"
            @click=${() => this.save()}>
            <custom-icon
              slot="icon"
              icon="save"></custom-icon
          ></md-fab>
        </flex-row>
      </flex-container>
    `
  }
}
