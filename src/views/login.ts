import { LiteElement, html, css, customElement, property } from '@vandeurenglenn/lite'
import '@material/web/textfield/outlined-text-field.js'
import '@material/web/select/outlined-select.js'
import '@material/web/select/select-option.js'
import '@vandeurenglenn/flex-elements/container.js'
import '@vandeurenglenn/lite-elements/toggle-button.js'
import { signInWithEmailAndPassword, signinWithGoogle, createUserWithEmailAndPassword, get } from '../firebase.js'
import { MdOutlinedTextField } from '@material/web/textfield/outlined-text-field.js'
@customElement('login-view')
export class LoginView extends LiteElement {
  @property({ type: Boolean, consumes: 'darkMode' }) accessor darkMode

  static styles = [
    css`
      :host {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: var(--md-sys-color-surface);
        color: var(--md-sys-color-on-surface);
      }
      flex-container {
        padding: 16px 24px;
        position: relative;

        color: var(--md-sys-color-on-surface-variant);
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        max-width: 400px;
        width: 100%;
        text-align: center;
        align-items: center;
        border-radius: var(--md-sys-shape-corner-medium);
      }
      custom-elevation {
        border-radius: var(--md-sys-shape-corner-medium);
      }
      md-outlined-text-field {
        width: 100%;
        margin-bottom: 12px;

        border-radius: var(--md-sys-shape-corner-medium);
      }

      h2 {
        margin-top: 0;
        margin-bottom: 24px;
      }

      custom-button[label='Login'] {
        margin-top: 12px;
      }
    `
  ]

  render() {
    return html`
      <flex-container>
        <custom-elevation level="2"></custom-elevation>
        <h2>Login</h2>
        <md-outlined-text-field
          label="Email"
          type="email"
          required
          autocomplete="username webauthn email">
          <custom-icon
            icon="mail"
            slot="leading-icon"></custom-icon>
        </md-outlined-text-field>
        <md-outlined-text-field
          label="Password"
          type="password"
          required
          autocomplete="current-password webauthn">
          <custom-icon
            icon="password"
            slot="leading-icon"></custom-icon>
          <custom-toggle-button
            slot="trailing-icon"
            togglers='["visibility","visibility_off"]'>
          </custom-toggle-button>
        </md-outlined-text-field>
        <custom-button
          type="tonal"
          @click=${() => this.handleEmailLogin()}
          label="Login"
          ><custom-icon icon="close"></custom-icon
        ></custom-button>
        <p>or</p>
        <custom-button
          type="tonal"
          class="google"
          @click=${() => this.handleGoogleLogin()}
          label="Google">
          <img
            slot="icon"
            src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" />
        </custom-button>
      </flex-container>
    `
  }

  handleEmailLogin = async () => {
    const email = this.shadowRoot.querySelector('md-outlined-text-field[label="Email"]') as MdOutlinedTextField
    const password = this.shadowRoot.querySelector('md-outlined-text-field[label="Password"]') as MdOutlinedTextField

    let errors = false
    if (!email.value || email.value === '') {
      errors = true
      email.errorText = 'Please enter an email'
      email.error = true
    }

    if (!password.value || password.value === '') {
      errors = true
      password.errorText = 'Please enter a password'
      password.error = true
    }
    console.log(email.value, password.value)

    if (errors) return
    try {
      const result = await signInWithEmailAndPassword(email.value, password.value)
    } catch (error) {
      try {
        await createUserWithEmailAndPassword(email.value, password.value)
      } catch (error) {
        console.error(error)
      }
    }
  }

  handleGoogleLogin = async () => {
    await signinWithGoogle()

    // Implement Google login logic here
  }
}
