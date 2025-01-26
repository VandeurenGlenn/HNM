import { html, css, customElement, LiteElement, property, map } from '@vandeurenglenn/lite'
import './cart-item.js'
import { translate } from '@lit-shop/translate'

declare type CartItem = {
  [EAN: string]: {
    EAN: string
    amount: number
    key: string
    image: string
    name: string
    price: number
  }
}
@customElement('shop-cart')
export class ShopCart extends LiteElement {
  @property({ type: Object, consumes: true }) accessor products = {}
  @property({ type: Array, consumes: true }) accessor cartItems: CartItem = {}

  @property({ reflect: true, type: Boolean }) accessor open = false

  @property({ type: Number }) accessor totalAmount = 0
  @property({ type: Number }) accessor totalPrice = 0

  async addItem(item) {
    console.log(item)
    console.log(this.products)
    const product = this.products[item.key]

    if (!product) {
      console.error('Product not found')
      return
    }

    item = {
      ...item,
      name: product.name,
      price: product.SKUs.find((sku) => sku.EAN === item.EAN).price
    }

    const items = this.cartItems

    if (items[item.EAN]) {
      items[item.EAN].amount += item.amount
    } else {
      items[item.EAN] = item
    }
    await firebase.set(`carts/${firebase.auth.currentUser.uid}`, items)
  }

  async removeItem(EAN) {
    const items = this.cartItems
    delete items[EAN]
    await firebase.set(`carts/${firebase.auth.currentUser.uid}`, items)
  }

  async onChange(propertyKey: string, value: any) {
    console.log(propertyKey, value)
    if (
      (propertyKey === 'cartItems' && this.products && value) ||
      (propertyKey === 'products' && this.cartItems && value)
    ) {
      this.totalAmount = Object.values(this.cartItems).reduce((acc, item) => acc + item.amount, 0)
      this.totalPrice = Object.values(this.cartItems).reduce((acc, item) => acc + item.amount * item.price, 0)
      // this.requestRender()
    }
  }

  static styles = [
    css`
      :host {
        display: block;
        width: 48px;
        height: 48px;
      }

      custom-button {
        overflow: hidden;
      }
      .cart {
        display: flex;
        flex-direction: column;
        position: fixed;
        inset: 0;
        background-color: var(--md-sys-color-surface);
        z-index: 0;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
        opacity: 0;
        pointer-events: none;
        padding: 8px 24px 24px 24px;
        font-size: 15px;
      }

      flex-column {
        flex: 1;
        overflow-y: auto;
      }

      footer {
        width: 100%;
        box-sizing: border-box;
        height: 82px;
        justify-content: space-between;
        padding: 12px 0;
      }

      footer flex-row {
        height: 26px;
        align-items: center;
        justify-content: space-between;
      }

      footer custom-button {
        width: 100%;
        margin-top: 12px;
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

      [type='tertiary'] custom-icon {
        --custom-icon-color: var(--md-sys-color-on-tertiary);
      }
    `
  ]
  render() {
    const entries = this.cartItems ? Object.entries(this.cartItems) : []
    console.log(entries)

    return html`
      ${this.open
        ? html`<div class="backdrop"></div>
            <flex-container class="cart">
              <header>
                <custom-icon-button
                  style="margin-left: auto;"
                  icon="close"
                  @click=${() => (this.open = false)}></custom-icon-button>
              </header>
              <flex-column>
                ${
                  entries.length > 0
                    ? map(
                        entries,
                        ([sku, item]) => html`
                          <shop-cart-item
                            .sku=${sku}
                            .key=${item.key}
                            .EAN=${item.EAN}
                            .name=${item.name}
                            .from=${item.from}
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
                          label="Go to shop">
                          <custom-icon
                            slot="icon"
                            icon="shopping_basket"></custom-icon>
                        </custom-button>
                      `
                }
              </flex-column>

              <footer>
                <flex-row>
                  <p>${translate('total')}</p>
                  ${this.totalPrice.toLocaleString('nl-BE', {
                    style: 'currency',
                    currency: 'EUR'
                  })}
                </flex-row>

                <custom-button
                  type="tonal"
                  label="Checkout"
                  @click=${() => {
                    location.hash = '#!/checkout'
                    this.open = !this.open
                  }}>
                  <custom-icon
                    slot="icon"
                    icon="shopping_cart"></custom-icon>
              </footer>
            </flex-container>`
        : html`<custom-icon-button
              icon="shopping_cart"
              @click=${() => (this.open = !this.open)}></custom-icon-button>

            ${this.totalAmount > 0 ? html`<div class="bullet">${this.totalAmount}</div>` : ''}`}
    `
  }
}
