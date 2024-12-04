import { LitElement, html, css } from 'lit'
import '@material/web/iconbutton/icon-button.js'

export class ShopItemBar extends LitElement {
  #amount
  static get properties() {
    return {
      amount: { type: Number }
    }
  }

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
    `
  ]

  get max() {
    return this.getAttribute('max') || 50
  }

  set amount(value) {
    if (value === 0) return
    if (value === this.max) return
    this.#amount = value
    this.requestUpdate()
  }

  get amount() {
    return this.#amount
  }

  constructor() {
    super()
    this.amount = 1
  }

  render() {
    return html`
      <md-icon-button @click="${() => (this.amount += 1)}"><md-icon>add</md-icon></md-icon-button>
      <md-icon-button @click="${() => (this.amount -= 1)}"><md-icon>remove</md-icon></md-icon-button>
      <flex-it></flex-it>
      <custom-button
        data-action="add-to-cart"
        type="tonal"
        .label="add ${this.amount} to cart"></custom-button>
    `
  }
}
customElements.define('shop-item-bar', ShopItemBar)
