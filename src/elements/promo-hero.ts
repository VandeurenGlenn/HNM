import { html, css, customElement, LiteElement, property } from '@vandeurenglenn/lite'
import '@vandeurenglenn/flex-elements/column.js'
import '@vandeurenglenn/lite-elements/icon-button.js'
import '@vandeurenglenn/lite-elements/divider.js'

@customElement('promo-hero')
export class PromoHero extends LiteElement {
  @property({ type: Boolean, reflect: true }) accessor open

  static styles = [
    css`
      :host {
        display: flex;
        position: absolute;
        overflow: hidden;
        inset: 0;
        z-index: 10001;
        opacity: 0;
        pointer-events: none;
        background-color: rgba(0, 0, 0, 0.5);

        text-align: center;
        align-items: center;
        justify-content: center;
      }

      :host([open]) {
        opacity: 1;
        pointer-events: auto;
      }

      .container {
        padding: 12px 12px 24px 12px;
        box-sizing: border-box;
        max-width: 400px;
        width: 100%;
        text-align: center;
        z-index: 10002;
        position: relative;
        border-radius: 8px;
        background-color: var(--md-sys-color-surface);
        color: var(--md-sys-color-on-surface);
      }

      flex-column {
        align-items: center;
      }

      h2 {
        margin-top: 6px;
      }

      custom-button {
        width: 100%;
        align-items: center;
        justify-content: center;
      }

      flex-column {
        display: flex;
        flex-direction: column;
        gap: 12px;

        box-sizing: border-box;
        padding: 0 48px;
      }

      custom-icon-button {
        position: absolute;
        right: 12px;
        top: 12px;
      }

      [icon='redeem'] {
        --custom-icon-size: 80px;
        position: absolute;
        left: 12px;
        top: 12px;
        transform: rotate(-45deg);
      }

      h1 {
        font-size: 60px;
        margin-top: 0;
        margin-bottom: 0;
      }

      .off-container {
        align-items: center;
        gap: 12px;
        width: 100%;
        font-size: 32px;
        box-sizing: border-box;
        padding: 0 48px;
      }

      .off-container h2 {
        margin: 0;
        text-transform: uppercase;
      }

      p {
        font-size: 24px;
      }
    `
  ]
  render() {
    return html`
      <flex-column class="container">
        <custom-icon-button
          icon="close"
          @click=${() => this.remove()}></custom-icon-button>

        <h2>HNM Hairsystems</h2>

        <flex-column>
          <custom-icon icon="redeem"> </custom-icon>
          <h1>10%</h1>
          <flex-row class="off-container">
            <custom-divider></custom-divider>
            <h2>off</h2>

            <custom-divider></custom-divider>
          </flex-row>
          <p>Registreer als nieuwe klant en ontvang 10% korting op uw eerste aankoop.</p>

          <custom-button
            type="tertiary"
            label="Let's Go!"
            @click=${() => {
              location.href = '/#!/login'
              this.remove()
            }}></custom-button>
        </flex-column>
      </flex-column>
    `
  }
}
