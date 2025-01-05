import { html, css, customElement, LiteElement, property } from '@vandeurenglenn/lite'
import '@vandeurenglenn/flex-elements/column.js'
import '@vandeurenglenn/lite-elements/icon-button.js'

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
        padding: 12px;
        box-sizing: border-box;
        max-width: 400px;
        width: 100%;
        text-align: center;
        z-index: 10002;
        position: relative;
        border-radius: 8px;
        background-color: var(--md-sys-color-surface-variant);
        color: var(--md-sys-color-on-surface-variant);
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
      }

      custom-icon-button {
        position: absolute;
        right: 12px;
        top: 12px;
      }
    `
  ]
  render() {
    return html`
      <flex-column class="container">
        <custom-icon-button
          icon="close"
          @click=${() => this.remove()}></custom-icon-button>

        <h2>Lancerings korting</h2>

        <flex-column>
          <p>Maak een account en schrijf je in voor onze nieuwsbrief</p>

          <p>ontvang 10% korting bij je eerste bestelling!</p>

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
