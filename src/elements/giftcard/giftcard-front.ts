import { LiteElement, html, css, property, customElement } from '@vandeurenglenn/lite'
import '@vandeurenglenn/lite-elements/elevation.js'
@customElement('giftcard-front')
export class GiftcardFront extends LiteElement {
  @property({ type: String }) accessor background

  @property({ type: String }) accessor qr

  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        width: 816px;
        height: 382px;

        padding: 24px;
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        position: relative;
        color: var(--md-sys-color-on-surface);
        align-items: center;
        justify-content: center;

        background-color: var(--md-sys-color-surface);
      }

      img {
        width: 100%;
        height: 100%;
        max-width: 50%;
        max-height: 50%;
      }

      .qr {
        position: absolute;
        top: 24px;
        right: 24px;
        width: 100px;
        height: 100px;
      }

      .codystar {
        font-family: 'Codystar', serif;
        font-weight: 600;
        font-style: normal;
        letter-spacing: 6px;
      }

      .codystar-regular {
        font-family: 'Codystar', serif;
        font-weight: 400;
        font-style: normal;
      }
      .codystar-2 {
        font-size: 30px;

        text-underline-offset: 16px;
        letter-spacing: 6px;
      }
    `
  ]
  render() {
    return html`
      <custom-elevation level="2"></custom-elevation>
      <img
        class="qr"
        src=${this.qr} />
      <h1 class="codystar">HELLO NEW ME</h1>
      <img
        src=${this.background}
        alt="background" />

      <h1 class="codystar codystar-2">Giftcard</h1>
    `
  }
}
