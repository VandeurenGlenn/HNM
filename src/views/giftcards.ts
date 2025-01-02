import { LiteElement, html, css, customElement, property } from '@vandeurenglenn/lite'
import './../elements/header/small-header.js'
import './../elements/giftcard/giftcard-front.js'
import './../elements/giftcard/giftcard-back.js'
import '@vandeurenglenn/flex-elements/container.js'

@customElement('giftcards-view')
export class GiftcardsView extends LiteElement {
  @property({ type: Boolean, consumes: 'darkMode' }) accessor darkMode

  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: auto;
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
  render() {
    return html`
      <small-header></small-header>
      <flex-container>
        <h1>HNM Giftcards</h1>

        <h2>Opzoek naar een tof en nuttig cadeau?</h2>

        <giftcard-front
          .qr=${'./assets/https___hellonewme.be.png'}
          .background=${this.darkMode ? './assets/sciccors-dark.svg' : './assets/sciccors.svg'}></giftcard-front>

        <section>
          <p>Met een giftcard kan de ontvanger zelf kiezen welk product hij of zij wilt kopen.</p>
          <p>Ook kan deze gebruikt worden voor alle diensten die we bieden.</p>
          <p>Onze giftcards kunnen gratis worden afgedrukt of digitaal gebruikt worden!</p>
        </section>

        <giftcard-back
          to="Kaat"
          from="Tom"
          .logo=${this.darkMode ? './assets/sciccors-dark.svg' : './assets/sciccors.svg'}
          .qr=${'./assets/https___hellonewme.be.png'}
          amount="50"></giftcard-back>
        <section>
          <p>De giftcard is 1 jaar geldig en kan zelfs gebruikt worden in onze webshop!</p>
          <p>De giftcard kun je aankopen in onze winkel of in onze <a href="/#!/shop">webshop</a>.</p>
        </section>
      </flex-container>
    `
  }
}
