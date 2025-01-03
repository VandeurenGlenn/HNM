import { LiteElement, html, css, property, customElement } from '@vandeurenglenn/lite'

@customElement('giftcard-back')
export class GiftcardBack extends LiteElement {
  @property({ type: String }) accessor message = ''
  @property({ type: String }) accessor to = ''
  @property({ type: String }) accessor from = ''
  @property({ type: String }) accessor date = ''
  @property({ type: String }) accessor amount = ''
  @property({ type: String }) accessor code = ''
  @property({ type: String }) accessor qr = ''
  @property({ type: String }) accessor logo = ''

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
        border-color: var(--md-sys-color-on-surface);
        align-items: center;
        justify-content: center;
        background-color: var(--md-sys-color-surface);
        width: 409px;
        height: 100%;
        max-height: 191px;
      }

      h1 {
        margin-top: 0;
      }

      .back {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
      }
      .tiro-bangla {
        font-family: 'Tiro Bangla', serif;
        font-weight: 600;
        font-style: normal;
        letter-spacing: 6px;
        font-size: 16px;
      }

      .amount {
        position: absolute;
        font-size: 20px;
        font-weight: 600;
        font-style: normal;
        letter-spacing: 6px;
      }

      h2 {
        margin-top: 0;
      }

      .nothing-you-could-do {
        font-family: 'Nothing You Could Do', serif;
        font-weight: 400;
        font-style: normal;

        font-size: 18px;
      }

      .ms-madi-regular {
        font-family: 'Ms Madi', serif;
        font-weight: 400;
        font-style: normal;
        font-size: 20px;
      }

      .signature {
        margin: 0;
      }

      img {
        position: absolute;
        top: 12px;
        left: 12px;
        width: 50px;
        height: 50px;
      }

      .logo {
        top: auto;
        left: auto;
        bottom: 12px;
        right: 12px;
        transform: rotate(134deg);
      }
      p {
        width: 100%;
        text-align: center;
      }

      @media (min-width: 1200px) {
        :host {
          width: 816px;
          min-height: 382px;
          height: 100%;
          max-height: 382px;
        }
        .tiro-bangla {
          font-size: 32px;
        }
        .nothing-you-could-do {
          font-size: 36px;
        }

        .ms-madi-regular {
          font-size: 32px;
        }

        .qr {
          width: 100px;
          height: 100px;
          top: 24px;
          right: 24px;
        }
        .amount {
          font-size: 32px;
        }
        .logo {
          bottom: 24px;
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
        src=${this.qr}
        alt="https://hellonewme.be" />

      <img
        src=${this.logo}
        class="logo"
        alt="logo" />

      <h1 class="tiro-bangla">A GIFT CARD</h1>
      <h2 class="nothing-you-could-do">For you</h2>

      <flex-it></flex-it>

      <span class="amount">€${this.amount}</span>
      <p class="signature">Hey <span class="ms-madi-regular">${this.to}</span> alvast veel shop plezier!</p>
      <p class="signature ms-madi-regular">Vanwege ${this.from}</p>
    `
  }
}
