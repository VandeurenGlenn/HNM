import { translate } from '@lit-shop/translate'
import { html, css, LiteElement, customElement, property } from '@vandeurenglenn/lite'
import '@vandeurenglenn/flex-elements/container.js'
import './../elements/items/order-item.js'
import './../elements/orders/order.js'
@customElement('orders-view')
export class OrdersView extends LiteElement {
  @property({ type: Object, consumes: true }) accessor orders

  @property({ type: String }) accessor selectedOrder

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

  _handleClick = (e: Event) => {
    const target = e.target as HTMLElement
    console.log('Target', target)

    if (target.tagName === 'ORDER-ITEM') {
      console.log('Order clicked', target.order)
      this.selectedOrder = target.order
    }
  }

  _back = () => {
    this.selectedOrder = null
  }

  render() {
    const orders = Object.entries(this.orders || {})

    console.log(this.selectedOrder)

    if (this.selectedOrder && orders.length > 0) {
      const selectedOrder = this.orders[this.selectedOrder]
      if (selectedOrder) {
        return html`
          <orders-order
            .order=${selectedOrder}
            .orderKey=${this.selectedOrder}
            @go-back=${this._back}></orders-order>
        `
      }
    }

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
