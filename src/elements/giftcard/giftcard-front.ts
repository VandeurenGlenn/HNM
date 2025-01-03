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
        padding: 12px;
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        position: relative;
        color: var(--md-sys-color-on-surface);
        align-items: center;
        justify-content: center;
        width: 409px;
        height: 100%;
        max-height: 191px;

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
        top: 12px;
        right: 12px;
        width: 48px;
        height: 48px;
      }

      .codystar {
        font-family: 'Codystar', serif;
        font-weight: 600;
        font-style: normal;
        letter-spacing: 6px;
        font-size: 18px;
      }
      .codystar-2 {
        font-size: 18px;

        text-underline-offset: 16px;
        letter-spacing: 6px;
      }
      @media (min-width: 1200px) {
        :host {
          width: 816px;
          min-height: 382px;
        }
        .codystar {
          font-size: 30px;
        }

        .codystar-2 {
          font-size: 30px;
        }

        .qr {
          width: 100px;
          height: 100px;
          top: 24px;
          right: 24px;
        }
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
