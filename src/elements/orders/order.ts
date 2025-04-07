import { LiteElement, html, css, property } from '@vandeurenglenn/lite'
import { get } from './../../firebase.js'
export class OrdersOrder extends LiteElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
      }

      header {
        display: flex;
        width: 100%;
        padding: 12px 0;
        align-items: center;
        justify-content: space-between;
      }
    `
  ]

  @property({ type: String }) accessor orderKey
  @property({ type: Object }) accessor order

  _back = () => {
    this.dispatchEvent(new CustomEvent('go-back', { bubbles: true }))
  }

  async onChange(propertyKey: string, value: any): Promise<any> {
    if (propertyKey === 'orderKey') {
      this.order = { ...value, ...(await get(`orders/${this.orderKey}`)) }
      console.log('Order', this.order)
    }
  }

  render() {
    const items = Object.entries(this.order.items || {})
    return html`
      <flex-container>
        <header>
          <custom-icon-button
            icon="back"
            @click=${this._back}></custom-icon-button>
          <strong>${this.orderKey}</strong>
        </header>
        <div>
          <h2>Order Details</h2>
          ${items.map(
            ([key, item]) => html`
              <flex-row>
                <span>${key}</span>
                <span>${item.sku}</span>
                <span>${item.name}</span>
                <span>${item.amount}</span>
                <span>${item.price}</span>
                <span>${item.total}</span>
              </flex-row>
            `
          )}
        </div>
      </flex-container>
    `
  }
}

customElements.define('orders-order', OrdersOrder)
