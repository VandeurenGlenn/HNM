import { LiteElement, html, css, customElement, property, query } from '@vandeurenglenn/lite'
import '@material/web/iconbutton/icon-button.js'

@customElement('shop-item-bar')
export class ShopItemBar extends LiteElement {
  @property({ type: Number }) accessor amount = 1
  @property({ type: String }) accessor key
  @property({ type: String }) accessor EAN

  static styles = [
    css`
      :host {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        position: relative;
        box-sizing: border-box;
        width: 100%;
        padding: 12px 6px 12px 6px;
        height: 40px;
        margin-bottom: 6px;
      }
      mwc-icon-button,
      mwc-button {
        pointer-events: auto;
      }

      :host([is-mobile]) {
        height: 100px;
        flex-direction: column;
      }
    `
  ]

  render() {
    return html`
      <flex-row>
        <custom-icon-button
          icon="add"
          @click=${(event) => {
            event.stopImmediatePropagation()
            event.preventDefault()
            event.stopPropagation()
            this.amount += 1
          }}></custom-icon-button>
        <custom-icon-button
          icon="remove"
          @click=${(event) => {
            event.stopImmediatePropagation()
            event.preventDefault()
            event.stopPropagation()
            if (this.amount === 1) return
            this.amount -= 1
          }}></custom-icon-button>
      </flex-row>

      <flex-it></flex-it>
      <custom-button
        data-action="add-to-cart"
        @click=${(event) => {
          event.stopImmediatePropagation()
          event.preventDefault()
          event.stopPropagation()
          document.dispatchEvent(
            new CustomEvent('add-to-cart', { detail: { key: this.key, EAN: this.EAN, amount: this.amount } })
          )
        }}
        type="tonal"
        .label="add ${this.amount} to cart"></custom-button>
    `
  }
}
