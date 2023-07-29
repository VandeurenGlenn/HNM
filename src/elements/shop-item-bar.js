import { LitElement, html, css } from 'lit';
import '@material/web/iconbutton/standard-icon-button.js' 

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
        padding: 12px 12px 12px 3px;
        height: 44px;
      }
      mwc-icon-button, mwc-button {
        pointer-events: auto;
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
    <md-standard-icon-button @click="${() => this.amount += 1}"><md-icon>add</md-icon></md-standard-icon-button>
    <md-standard-icon-button @click="${() => this.amount -= 1}"><md-icon>remove</md-icon></md-standard-icon-button>
    <flex-one></flex-one>
    <md-button>add ${this.amount} to cart</md-button>
    `;
  }
}
customElements.define('shop-item-bar', ShopItemBar);
