import { LiteElement, html, css, property, customElement } from '@vandeurenglenn/lite'
import './shop-item-bar.js'
import { translate } from '@lit-shop/translate'
@customElement('shop-item')
export class ShopItem extends LiteElement {
  @property({ type: Object }) accessor product
  @property({ type: Boolean, attribute: 'is-mobile', consumes: true }) accessor isMobile
  @property({ type: String }) accessor key
  get amount() {
    return this.shadowRoot.querySelector('shop-item-bar').amount
  }

  static styles = [
    css`
      :host {
        display: inline-flex;
        width: 300px;
        height: 300px;

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
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      flex-row {
        width: 100%;
        padding: 0px 22px 0 12px;
        box-sizing: border-box;
      }

      a {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        box-sizing: border-box;
        text-decoration: none;
        color: inherit;
        overflow: hidden;
        width: inherit;
        height: inherit;
        max-width: inherit;
      }

      :host([is-mobile]) {
        max-width: 210px;
        width: 100%;
        height: 375px;
      }
    `
  ]

  render() {
    if (!this.product) return html`<p>Loading</p>`
    return html`
      <a href="/#!/shop?product=${this.key}">
        <img src="${this.product.image}" />
        <flex-row>
          <h4>${translate(this.product.name)}</h4>
        </flex-row>
        <flex-row>
          <strong
            >${Number(this.product['SKUs'][0].price).toLocaleString('nl-BE', {
              style: 'currency',
              currency: 'EUR'
            })}</strong
          >
        </flex-row>
        <flex-it></flex-it>
        <shop-item-bar ?is-mobile=${this.isMobile}></shop-item-bar>
      </a>
    `
  }
}
