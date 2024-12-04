import { LitElement, html, css } from 'lit'
import './shop-item-bar.js'

export class ShopItem extends LitElement {
  static get properties() {
    return {
      sku: { type: String },
      image: { type: String },
      name: { type: String },
      price: { type: String }
    }
  }
  get amount() {
    return this.shadowRoot.querySelector('shop-item-bar').amount
  }

  static styles = [
    css`
      :host {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        box-sizing: border-box;
        border: 1px solid #555;
        border-radius: 24px;

        overflow: hidden;
      }

      img {
        box-sizing: border-box;
        padding: 0px 24px 12px 24px;
        height: calc(100% - 76px);
      }

      h4 {
        font-weight: 400;
        box-sizing: border-box;
        margin: 0;
      }
      flex-row {
        width: 100%;
        padding: 0px 22px 0 12px;
        box-sizing: border-box;
      }
    `
  ]

  render() {
    return html`
      <img src="${this.image}" />
      <flex-row>
        <h4>${this.name}</h4>
        <flex-it></flex-it>
        <strong>${this.price}</strong>
      </flex-row>
      <flex-it></flex-it>
      <shop-item-bar></shop-item-bar>
    `
  }
}
customElements.define('shop-item', ShopItem)
