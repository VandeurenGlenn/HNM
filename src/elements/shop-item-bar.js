import { LitElement, html, css } from 'lit';
import '@material/mwc-button' 

export class ShopItemBar extends LitElement {
  #amount;
  static get properties() {
    return {
      image: { type: String },
      amount: { type: Number }
    };
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
        padding: 12px;
        height: 44px;
      }

      
    `
  ];

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
    <mwc-icon-button icon="add" @click="${() => this.amount += 1}"></mwc-icon-button>
    <mwc-icon-button icon="remove" @click="${() => this.amount -= 1}"></mwc-icon-button>
    <flex-one></flex-one>
    <mwc-button>add ${this.amount} to cart</mwc-button>
    `;
  }
}
customElements.define('shop-item-bar', ShopItemBar);
