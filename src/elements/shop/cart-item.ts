import { translate } from '@lit-shop/translate'
import { LiteElement, html, css, property, customElement } from '@vandeurenglenn/lite'

@customElement('shop-cart-item')
export class ShopCartItem extends LiteElement {
  @property({ type: String }) accessor key = ''
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

      flex-row {
        justify-content: space-between;
      }

      custom-icon-button {
        height: 34px;
        width: 34px;
        --custom-icon-size: 20px;
      }
    `
  ]

  decreaseAmount() {
    if (this.amount > 1) {
      document.dispatchEvent(new CustomEvent('decrease-amount', { detail: this.EAN }))
    } else if (this.amount === 1) {
      document.dispatchEvent(new CustomEvent('remove-from-cart', { detail: this.EAN }))
    }
  }

  increaseAmount() {
    this.amount++
    document.dispatchEvent(new CustomEvent('increase-amount', { detail: this.EAN }))
  }

  removeItem() {
    document.dispatchEvent(new CustomEvent('remove-from-cart', { detail: this.EAN }))
  }
  render() {
    return html`
      <strong>${translate(this.name)}</strong>
      ${this.from ? html`<p>From: ${this.from}</p>` : ''}
      <flex-row center>
        <p>
          ${this.amount} x
          <strong
            >${Number(this.price).toLocaleString('nl-BE', {
              style: 'currency',
              currency: 'EUR'
            })}</strong
          >
        </p>
        <custom-icon-button
          icon="add"
          @click=${() => this.increaseAmount()}></custom-icon-button>
        <custom-icon-button
          icon="remove"
          @click=${() => this.decreaseAmount()}></custom-icon-button>
        <custom-icon-button
          icon="delete"
          @click=${() => this.removeItem()}></custom-icon-button>
      </flex-row>
    `
  }
}
