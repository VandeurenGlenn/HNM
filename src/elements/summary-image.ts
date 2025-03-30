import { LiteElement, html, css, property, customElement } from '@vandeurenglenn/lite'
import '@vandeurenglenn/flex-elements/container.js'
@customElement('summary-image')
export class SummaryImage extends LiteElement {
  @property({ type: Boolean, reflect: true }) accessor left
  @property({ type: Boolean, reflect: true }) accessor right
  @property({ type: Boolean, reflect: true }) accessor top
  @property({ type: Boolean, reflect: true }) accessor bottom
  @property({ type: Boolean, reflect: true, attribute: 'is-mobile', consumes: true }) accessor isMobile
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
      }
      img {
        max-width: 50%;
        height: auto;
      }

      :host([right]) {
        flex-direction: row-reverse;
        justify-content: flex-start;
        align-items: center;
      }
      :host([bottom]) {
        flex-direction: column-reverse;
        justify-content: center;
        align-items: center;
      }

      :host([is-mobile]) img {
        max-width: 100%;
      }
      :host([is-mobile]) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      :host([is-mobile][right]) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      summary {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding: 0 24px;
        box-sizing: border-box;
      }
    `
  ]

  @property({ type: String }) accessor src
  @property({ type: String }) accessor alt

  render() {
    return html`
      <img
        src=${this.src}
        alt=${this.alt} />
      <summary>
        <slot></slot>
      </summary>
    `
  }
}
