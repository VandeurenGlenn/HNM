import { translate } from '@lit-shop/translate'
import { html, css, LiteElement, customElement, property } from '@vandeurenglenn/lite'
import '@vandeurenglenn/flex-elements/container.js'
import './../elements/items/order-item.js'
@customElement('orders-view')
export class OrdersView extends LiteElement {
  @property({ type: Object, consumes: true }) accessor orders
  static styles = [
    css`
      :host {
        display: block;
        justify-content: center;
        overflow-y: auto;
      }

      flex-container {
        margin-top: 24px;
      }
    `
  ]

  firstRender(): void {
    this.shadowRoot.addEventListener('click', this._handleClick)
  }

  _handleClick(e: Event) {
    const target = e.target as HTMLElement
    console.log('Target', target)

    if (target.tagName === 'ORDER-ITEM') {
      console.log('Order clicked', target.order)
      location.href = `#!/orders?order=${target.order}`
    }
  }

  render() {
    const orders = Object.entries(this.orders || {})
    return html`<flex-container
      >${orders.length > 0
        ? html`
            ${Object.entries(this.orders).map(
              ([order, value]) =>
                html`
                  <order-item
                    .order=${order}
                    .status=${value.status}></order-item>
                `
            )}
          `
        : html`<p>${translate('No orders found')}</p>`}</flex-container
    >`
  }
}
