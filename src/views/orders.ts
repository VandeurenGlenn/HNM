import { translate } from '@lit-shop/translate'
import { html, css, LiteElement, customElement, property } from '@vandeurenglenn/lite'
import '@vandeurenglenn/flex-elements/container.js'

@customElement('orders-view')
export class OrdersView extends LiteElement {
  @property({ type: Object, consumes: true }) accessor orders
  static styles = [
    css`
      :host {
        display: block;
        justify-content: center;
      }
    `
  ]

  render() {
    return html`<flex-container
      >${this.orders
        ? html` ${this.orders.map((order) => html` <order-item .order=${order}></order-item> `)} `
        : html`<p>${translate('No orders found')}</p>`}</flex-container
    >`
  }
}
