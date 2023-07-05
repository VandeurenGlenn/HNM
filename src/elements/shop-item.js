import { LitElement, html, css } from 'lit';
import './shop-item-bar.js'

export class ShopItem extends LitElement {
  static get properties() {
    return {
      image: { type: String },
      name: { type: String }
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
      }

      img {
        box-sizing: border-box;
        padding: 0px 24px 24px;
        height: calc(100% - 76px);
        overflow: hidden;
      }
    `
  ];

  render() {
    return html`

    <img src="${this.image}">
    <h4>${this.name}</h4>
    <shop-item-bar></shop-item-bar>
    `;
  }
}
customElements.define('shop-item', ShopItem);
