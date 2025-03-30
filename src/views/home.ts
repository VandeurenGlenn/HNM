import '@vandeurenglenn/flex-elements/it.js'
import '@vandeurenglenn/flex-elements/wrap-between.js'
import { scrollbar } from '../mixins/styles.js'
import './../elements/zooming-image.js'
import './../elements/footer/footer-element.js'
import './../elements/header/small-header.js'
import { property, LiteElement, html, css, customElement } from '@vandeurenglenn/lite'
import './../elements/summary-image.js'
@customElement('home-view')
export class HomeView extends LiteElement {
  @property({ type: Boolean, reflect: true, consumes: 'darkMode' }) accessor darkMode
  @property({ type: Boolean, reflect: true }) accessor condensed

  constructor() {
    super()

    this.onscroll = this.#onscroll.bind(this)
  }

  #onscroll(event) {
    event.preventDefault()
    if (this.scrollTop > 0) this.condensed = true
    else this.condensed = false
  }

  static styles = [
    css`
      :host {
        overflow-y: auto;
        position: absolute;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        --svg-icon-color: var(--main-color);
        --md-text-button-with-icon-icon-size: 24px;
      }

      main {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
        padding: 6px 12px;
        box-sizing: border-box;
      }

      section,
      img {
        max-width: 960px;
        width: 100%;
      }

      section,
      img {
        max-width: 960px;
        width: 100%;
      }
      img {
        will-change: padding;
      }

      small-header {
        position: sticky;
        padding: 12px;
        min-height: 76px;
        max-height: 76px;
        height: 100%;
        box-sizing: border-box;
        z-index: 100;
        will-change: margin;
        width: 100%;
        transition: opacity ease-out 60ms;
      }

      :host([condensed]) small-header {
        top: 0;

        background: var(--md-sys-color-background);
        position: sticky;
      }

      .filler {
        display: flex;
        width: 32px;
      }

      flex-wrap-between {
        max-width: 960px;
      }

      p {
        text-align: center;
        font-size: 1.2em;
        line-height: 1.6;
        margin-bottom: 16px;
      }

      h1 {
        text-align: center;
        margin: 0;
      }

      ${scrollbar}
    `
  ]

  render() {
    return html`
      ${localStorage.getItem('theme') === 'dark'
        ? html`<link
            rel="preload"
            as="image"
            href="./assets/banner-dark.svg" />`
        : html`<link
            rel="preload"
            as="image"
            href="./assets/banner.svg" />`}

      <small-header .darkMode=${this.darkMode}></small-header>

      <h2>Get used to, feeling good.</h2>
      <flex-container max-width="960px">
        <summary-image
          src="./assets/colors.webp"
          alt="Hello New Me Systems Colors">
          <p>
            Hello New Me is een jonge, sterk groeiende onderneming die gespecialiseerd is in het maken van haarsystemen
            op maat.
          </p>
        </summary-image>

        <summary-image
          src="./assets/luchtdoorlatend2.webp"
          alt="Hello New Me Systems Products"
          right>
          <p>
            Onze haarsystemen zijn voorzien van een vocht en luchtdoorlatend gaas waardoor onaangename geurtjes
            wegblijven en ervoor zorgt dat de hoofdhuid kan blijven ademen.
          </p>
        </summary-image>

        <summary-image
          src="./assets/products.jpeg"
          alt="Hello New Me Systems Products">
          <p>
            Niet enkel bij mannen is dit een probleem maar ook voor vrouwen en kinderen waarbij haaruitval genetische is
            bepaald. Ze zijn geschikt voor traumatische verwondingen zoals brandwonden op de hoofdhuid die levenslange
            haargroei hebben te niet gedaan. Ook stress is een gekende factor!
          </p>
        </summary-image>
        <zooming-image
          src="./assets/products.jpeg"
          alt="Hello New Me Systems Products">
        </zooming-image>
      </flex-container>
      <footer-element></footer-element>
    `
  }
}
