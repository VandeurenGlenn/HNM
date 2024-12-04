import { html, css, customElement, LiteElement, property, map } from '@vandeurenglenn/lite'
import './cart-item.js'

@customElement('shop-cart')
export class ShopCart extends LiteElement {
  @property({ type: Array }) accessor items = {}

  @property({ reflect: true, type: Boolean }) accessor open = false

  @property({ type: Number }) accessor totalAmount = 0

  addItem(item) {
    if (this.items[item.sku]) {
      this.items[item.sku].amount += item.amount

      this.totalAmount = Object.values(this.items).reduce((acc, item) => acc + item.amount, 0)
      this.requestRender()
      return
    }
    this.items[item.sku] = item
    this.totalAmount = Object.values(this.items).reduce((acc, item) => acc + item.amount, 0)
    this.requestRender()
  }

  removeItem(sku) {
    delete this.items[sku]
  }

  onChange(propertyKey: string, value: any): void {
    console.log(propertyKey, value)
  }

  static styles = [
    css`
      :host {
        display: block;
        width: 48px;
        height: 48px;
      }
      .cart {
        display: flex;
        flex-direction: column;
        position: fixed;
        inset: 0;
        background-color: var(--md-sys-color-surface-container-highest);
        z-index: 0;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
        opacity: 0;
        pointer-events: none;
        padding: 8px 24px;
      }

      :host([open]) .cart {
        z-index: 100000;
        pointer-events: auto;
        opacity: 1;
      }

      .bullet {
        display: flex;
        width: 22px;
        height: 22px;
        background-color: var(--md-sys-color-primary);
        color: var(--md-sys-color-on-primary);
        border-radius: 50%;
        margin-top: -42px;
        margin-left: 30px;
        justify-content: center;
        align-items: center;
      }

      @media (min-width: 1200px) {
        .cart {
          left: auto;

          width: 300px;
        }
      }
      .go-to-shop {
        margin-top: 16px;
        width: -webkit-fill-available;
      }
      .empty {
        text-align: center;
      }
    `
  ]
  render() {
    const entries = this.items ? Object.entries(this.items) : []
    console.log(entries)
    console.log(
      map(
        entries,
        ([sku, item]) => html`
          <shop-cart-item
            .sku=${sku}
            .name=${item.name}
            .image=${item.image}
            .amount=${item.amount}
            .price=${item.price}>
          </shop-cart-item>
        `
      )
    )

    return html`
      ${this.open
        ? html`<div class="backdrop"></div>
            <flex-container class="cart">
              <header>
                <custom-icon-button
                  style="width: fit-content; margin-left: auto;"
                  icon="close"
                  @click=${() => (this.open = false)}></custom-icon-button>
              </header>

              ${entries.length > 0
                ? map(
                    entries,
                    ([sku, item]) => html`
                      <shop-cart-item
                        .sku=${sku}
                        .name=${item.name}
                        .image=${item.image}
                        .amount=${item.amount}
                        .price=${item.price}>
                      </shop-cart-item>
                    `
                  )
                : html`
                    <p class="empty">Your cart is empty</p>
                    <custom-button
                      class="go-to-shop"
                      type="tertiary"
                      @click=${() => (location.hash = '#!/shop')}
                      label="Go to shop"></custom-button>
                  `}
            </flex-container>`
        : html`<custom-icon-button
              icon="shopping_cart"
              @click=${() => (this.open = !this.open)}></custom-icon-button>

            ${this.totalAmount > 0 ? html`<div class="bullet">${this.totalAmount}</div>` : ''}`}
    `
  }
}
