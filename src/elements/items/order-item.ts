import { LiteElement, css, html, customElement, property } from '@vandeurenglenn/lite'

@customElement('order-item')
export class OrderItem extends LiteElement {
  @property({ type: String }) accessor order
  @property({ type: String }) accessor status
  static styles = [
    css`
      * {
        font-weight: 400;
        box-sizing: border-box;
        margin: 0;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        pointer-events: none;
      }
      :host {
        display: flex;
        flex-direction: row;
        padding: 12px 16px;
        box-sizing: border-box;
        margin-bottom: 8px;
        width: -webkit-fill-available;
        height: 56px;
        justify-content: space-between;
        background: var(--md-sys-color-surface-container-high);
        border-radius: 24px;
        align-items: center;
        cursor: pointer;
        pointer-events: auto !important;
      }

      strong {
        font-weight: 600;
        font-size: 1em;
      }
    `
  ]

  render() {
    return html`
      <strong>${this.order}</strong>
      <span>${this.status}</span>
    `
  }
}
