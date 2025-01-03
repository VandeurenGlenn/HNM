import { LiteElement, html, css, customElement, property } from '@vandeurenglenn/lite'
import './../elements/header/small-header.js'
import './../elements/giftcard/giftcard-front.js'
import './../elements/giftcard/giftcard-back.js'
import '@vandeurenglenn/flex-elements/container.js'
import '@material/web/textfield/outlined-text-field.js'
import { ShopCart } from '../elements/shop/cart.js'
import './../elements/footer/footer-element.js'
@customElement('giftcards-view')
export class GiftcardsView extends LiteElement {
  @property({ type: Boolean, consumes: 'darkMode' }) accessor darkMode
  @property({ type: String }) accessor to = 'Kaat'
  @property({ type: String }) accessor from = 'Tom'
  @property({ type: String }) accessor amount = 50

  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: auto;
        overflow-x: hidden;
      }

      flex-row img {
        width: 50%;
      }

      flex-container {
        align-items: center;
        max-width: 960px;
      }

      section {
        text-align: center;
        margin: 48px 0;
      }
      a {
        color: var(--md-sys-color-tertiary);
      }

      flex-row p {
        margin-bottom: 12px;
      }
      .giftcard-form {
        margin-top: 48px;
        width: 100%;
        max-width: 816px;
        justify-content: space-between;
      }

      custom-button {
        margin-top: 56px;
      }
    `
  ]

  saveAs(dataUrl, name) {
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = name
    a.click()

    a.remove()
  }
  firstRender(): void {
    setTimeout(() => {
      // domtoimage.toSvg(this.shadowRoot.querySelector('giftcard-front')).then((dataUrl) => {
      //   console.log(dataUrl)
      //   this.saveAs(dataUrl, 'giftcard-front.svg')
      // })
      // domtoimage.toSvg(this.shadowRoot.querySelector('giftcard-back')).then((dataUrl) => {
      //   console.log(dataUrl)
      //   this.saveAs(dataUrl, 'giftcard-back.svg')
      // })
      // domtoimage.toPng(this.shadowRoot.querySelector('giftcard-front')).then((dataUrl) => {
      //   console.log(dataUrl)
      //   this.saveAs(dataUrl, 'giftcard-front.png')
      // })
      // domtoimage.toPng(this.shadowRoot.querySelector('giftcard-back')).then((dataUrl) => {
      //   console.log(dataUrl)
      //   this.saveAs(dataUrl, 'giftcard-back.png')
      // })
    }, 10000)
  }

  toInput = (event) => {
    console.log(event.target.value)

    this.to = event.target.value
  }

  fromInput = (event) => {
    this.from = event.target.value
  }

  amountInput(event) {
    this.amount = event.target.value
  }

  addToCart() {
    const cart = document.querySelector('app-shell').shadowRoot.querySelector('shop-cart') as ShopCart
    cart.addItem({
      sku: `giftcard-${this.amount}-${this.to}-${this.from}`,
      name: `Giftcard voor ${this.to}`,
      to: this.to,
      from: this.from,
      price: this.amount,
      amount: 1
    })
  }

  render() {
    return html`
      <small-header></small-header>
      <flex-container>
        <h2>Opzoek naar een tof cadeau?</h2>

        <giftcard-front
          .qr=${'./assets/https___hellonewme.be.png'}
          .background=${this.darkMode ? './assets/sciccors-dark.svg' : './assets/sciccors.svg'}></giftcard-front>

        <section>
          <p>Met een giftcard kan de ontvanger zelf kiezen welk product hij of zij wilt kopen.</p>
          <p>Ook kan deze gebruikt worden voor alle diensten die we bieden.</p>
          <p>Onze giftcards kunnen gratis worden afgedrukt of digitaal gebruikt worden!</p>
        </section>

        <giftcard-back
          .to=${this.to}
          .from=${this.from}
          .logo=${this.darkMode ? './assets/sciccors-dark.svg' : './assets/sciccors.svg'}
          .qr=${'./assets/https___hellonewme.be.png'}
          .amount=${this.amount}></giftcard-back>

        <flex-row class="giftcard-form">
          <md-outlined-text-field
            label="Voor"
            value="Kaat"
            @input=${(event) => this.toInput(event)}></md-outlined-text-field>
          <md-outlined-text-field
            label="Van"
            value="Tom"
            @input=${(event) => this.fromInput(event)}></md-outlined-text-field>
          <md-outlined-text-field
            label="Bedrag"
            @input=${(event) => this.amountInput(event)}
            value="50"></md-outlined-text-field>
        </flex-row>
        <custom-button
          label="voeg toe aan winkelmand"
          @click=${() => this.addToCart()}
          type="tertiary"></custom-button>
        <section>
          <p>De giftcard is 1 jaar geldig en kan zelfs gebruikt worden in onze webshop!</p>
          <p>De giftcard kun je aankopen in onze winkel of in onze <a href="/#!/shop">webshop</a>.</p>
        </section>
      </flex-container>
      <footer-element></footer-element>
    `
  }
}
