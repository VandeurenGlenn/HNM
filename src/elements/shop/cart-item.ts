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
        display: block;
        padding: 16px;
        border: 1px solid #ccc;
        margin-bottom: 8px;
      }
    `
  ]

  onChange(propertyKey: string, value: any): void {
    if (propertyKey === 'EAN') {
    }
  }

  render() {
    return html`
      <div>
        <h2>${translate(this.name)}</h2>
        ${this.from ? html`<p>From: ${this.from}</p>` : ''}
        <p>Price: ${this.price}</p>
        <p>amount: ${this.amount}</p>
      </div>
    `
  }
}
