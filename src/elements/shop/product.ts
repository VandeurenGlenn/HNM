import { LiteElement, html, css, customElement, property } from '@vandeurenglenn/lite'
import '../shop-item-bar.js'
import { translate } from '@lit-shop/translate'

@customElement('shop-product')
export class ShopProduct extends LiteElement {
  @property({ type: Object }) accessor product
  @property({ type: String }) accessor key

  get amount() {
    return this.shadowRoot.querySelector('shop-item-bar').amount
  }

  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        align-items: center;
        overflow: hidden;
        color: var(--md-sys-color-color-on-surface);
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

      flex-container {
        height: 100%;
        width: 100%;
      }
    `
  ]

  render() {
    if (!this.product) return html`<p>Loading</p>`
    return html`
      <flex-container>
        <img src="${this.product.image}" />
        <p>${translate(this.product.description)}</p>
        <flex-row>
          <h4>${translate(this.product.name)}</h4>
          <flex-it></flex-it>
          <strong>${this.product['SKUs'][0].price}</strong>
        </flex-row>
        <flex-it></flex-it>
        <shop-item-bar></shop-item-bar>
      </flex-container>
    `
  }
}
