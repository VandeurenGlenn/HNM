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
        width: 816px;
        height: 382px;

        padding: 24px;
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        position: relative;

        color: var(--md-sys-color-on-surface);
        border-color: var(--md-sys-color-on-surface);
        align-items: center;
        justify-content: center;
        background-color: var(--md-sys-color-surface);
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
      }

      .tiro-bangla-regular-italic {
        font-family: 'Tiro Bangla', serif;
        font-weight: 400;
        font-style: italic;
      }

      .amount {
        position: absolute;
        font-size: 32px;
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
      }

      .ms-madi-regular {
        font-family: 'Ms Madi', serif;
        font-weight: 400;
        font-size: 32px;
        font-style: normal;
      }

      .signature {
        margin: 0;
      }

      img {
        position: absolute;
        top: 24px;
        left: 24px;
        width: 100px;
        height: 100px;
      }

      .logo {
        top: auto;
        left: auto;
        bottom: 24px;
        right: 24px;
        transform: rotate(134deg);
      }
      p {
        width: 100%;
        text-align: center;
      }
    `
  ]
  render() {
    return html`
      <custom-elevation level="2"></custom-elevation>
      <img
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
