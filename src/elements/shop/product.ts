import { LiteElement, html, css, customElement, property } from '@vandeurenglenn/lite'
import '../shop-item-bar.js'
import { translate } from '@lit-shop/translate'
import { ShopItem } from '../shop-item.js'

@customElement('shop-product')
export class ShopProduct extends LiteElement {
  @property({ type: Object }) accessor product
  @property({ type: String }) accessor key
  @property({ type: String }) accessor placeholder = './assets/sciccors.svg'
  @property({ type: Boolean, consumes: true }) accessor darkMode

  onChange(propertyKey: string, value: any): void {
    if (propertyKey === 'darkMode') {
      if (value) {
        this.placeholder = './assets/sciccors-dark.svg'
      } else {
        this.placeholder = './assets/sciccors.svg'
      }
    }
  }

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
        height: 400px;
      }

      h3 {
        box-sizing: border-box;
        margin: 0;
      }
      flex-row {
        width: 100%;
      }

      flex-container {
        height: 100%;
        width: 100%;
        align-items: center;
      }
    `
  ]

  render() {
    if (!this.product) return html`<p>Loading</p>`
    return html`
      <flex-container>
        <img src=${this.product?.image ? this.product.image : this.placeholder} />

        <flex-row>
          <h3>${translate(this.product.name)}</h3>
          <flex-it></flex-it>
          <strong
            >${Number(this.product['SKUs'][0].price).toLocaleString('nl-BE', {
              style: 'currency',
              currency: 'EUR'
            })}</strong
          >
        </flex-row>
        <p>${translate(this.product.description)}</p>
        <flex-it></flex-it>
        <shop-item-bar
          .key=${this.key}
          .EAN=${this.product['SKUs'][0]['EAN']}></shop-item-bar>
      </flex-container>
    `
  }
}
