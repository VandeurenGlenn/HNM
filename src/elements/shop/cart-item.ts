import { translate } from '@lit-shop/translate'
import { LiteElement, html, css, property, customElement } from '@vandeurenglenn/lite'

@customElement('shop-cart-item')
export class ShopCartItem extends LiteElement {
  @property({ type: String }) accessor name = ''
  @property({ type: Number }) accessor price = 0
  @property({ type: Number }) accessor amount = 1
  @property({ type: String }) accessor from = ''
  @property({ type: String }) accessor sku = ''
  @property({ type: String }) accessor EAN

  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        padding: 12px 16px;
        border: 1px solid #ccc;
        margin-bottom: 8px;
        width: -webkit-fill-available;
      }

      * {
        font-weight: 400;
        box-sizing: border-box;
        margin: 0;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      strong {
        font-weight: 600;
        font-size: 1em;
        margin-bottom: 8px;
      }
    `
  ]

  render() {
    return html`
      <strong>${translate(this.name)}</strong>
      ${this.from ? html`<p>From: ${this.from}</p>` : ''}
      <p>
        ${this.amount} x
        <strong
          >${Number(this.price).toLocaleString('nl-BE', {
            style: 'currency',
            currency: 'EUR'
          })}</strong
        >
      </p>
    `
  }
}
