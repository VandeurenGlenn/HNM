import { LitElement, html, css } from 'lit';
import './shop-item-bar.js'

export class ShopItem extends LitElement {
  static get properties() {
    return {
      image: { type: String },
      name: { type: String },
      price: { type: String }
    };
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
        --mdc-icon-button-size: 40px;
      }

      img {
        box-sizing: border-box;
        padding: 0px 24px 12px 24px;
        height: calc(100% - 76px);
      }

      h4 {
        font-weight: 400;
        box-sizing: border-box;
        padding-left: 6px;
        margin: 0;
      }
    `
  ];

  render() {
    return html`

    <img src="${this.image}">
    <flex-row style="width: 100%;">
      <h4>${this.name}</h4>
      <flex-one></flex-one>
      <strong>${this.price}</strong>
    </flex-row>
    <flex-one></flex-one>
    <shop-item-bar></shop-item-bar>
    `;
  }
}
customElements.define('shop-item', ShopItem);
