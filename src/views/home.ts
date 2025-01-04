import '@vandeurenglenn/flex-elements/it.js'
import '@vandeurenglenn/flex-elements/wrap-between.js'
import { scrollbar } from '../mixins/styles.js'
import './../elements/zooming-image.js'
import './../elements/footer/footer-element.js'
import './../elements/header/small-header.js'
import { property, LiteElement, html, css, customElement } from '@vandeurenglenn/lite'

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
    const { height } = this.shadowRoot.querySelector('header.big').getBoundingClientRect()
    if (this.scrollTop > height - 54) this.condensed = true
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

      header {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        padding: 12px;
        box-sizing: border-box;
      }

      main {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
        padding: 6px 12px;
      }

      main,
      header {
        box-sizing: border-box;
      }

      header,
      section,
      img {
        max-width: 960px;
        width: 100%;
      }
      header span {
        display: flex;
        align-items: center;
      }

      .examples {
        display: flex;
        flex-direction: column;
      }

      .examples .left,
      .examples .right {
        width: calc(100% / 2);
      }

      .left {
        padding-right: 3px;
      }

      .right {
        padding-left: 3px;
      }

      .left img,
      .right img {
        padding-top: 3px;
      }

      main,
      header {
        box-sizing: border-box;
      }

      header span,
      section,
      img {
        max-width: 960px;
        width: 100%;
      }
      header span {
        display: flex;
        align-items: flex-end;
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
        margin-top: -34px;
        width: 100%;
        opacity: 0;
        transition: opacity ease-out 60ms;
      }
      header.big img {
        opacity: 1;
        max-height: 316px;
        transition: opacity ease-in 120ms;
      }

      :host([condensed]) small-header {
        top: 0;
        background: var(--md-sys-color-background);
        position: sticky;
        opacity: 1;
        transition: opacity ease-in 60ms;
      }

      :host([condensed]) header.big img {
        opacity: 0;
        transition: opacity ease-out 16ms;
      }

      .examples {
        box-sizing: border-box;
        max-width: calc(100% / 2 - 2px);
      }

      .example1 {
        max-height: 220px;
      }

      .example1,
      .example2 {
        will-change: padding;
        padding-top: 4px;
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
      }

      .summary {
        display: flex;
        flex-direction: column;
        padding: 12px 24px;
        box-sizing: border-box;
        max-width: 1200px;
      }

      .summary h2 {
        width: 100%;
        text-align: center;
        margin-top: 36px;
      }

      .summary[right] {
        text-align: right;
        flex-direction: row-reverse;
      }

      .summary flex-column {
        box-sizing: border-box;
      }

      .summary[right] {
        justify-content: flex-end;
      }

      .home-image {
        max-width: 100%;
        max-height: 240px;
      }

      h1 {
        text-align: center;
        margin: 0;
      }

      @media (min-width: 1200px) {
        .summary {
          flex-direction: row;
        }
        .summary flex-column {
          margin-left: 48px;
        }
        .summary h2 {
          text-align: left;
          margin-top: 0;
        }
        .summary p {
          text-align: left;
        }
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

      <header class="big">
        <img
          alt="banner"
          src=${this.darkMode ? './assets/banner-dark.svg' : './assets/banner.svg'} />
      </header>

      <small-header .darkMode=${this.darkMode}></small-header>

      <flex-row class="summary">
        <!-- <zooming-image src="./assets/products.jpeg"></zooming-image> -->
        <!--<img alt="homeimage" class="home-image" loading="lazy" src="./assets/home.webp">-->
        <flex-column>
          <h2>Get used to, feeling good.</h2>
          <p>
            HNM is een jonge, sterk groeiende onderneming die gespecialiseerd is in het maken van haarsystemen op maat.
          </p>
          <p>
            Onze haarsystemen zijn voorzien van een vocht en luchtdoorlatend gaas waardoor onaangename geurtjes
            wegblijven en ervoor zorgt dat de hoofdhuid kan blijven ademen.
          </p>
          <p>
            Verder zijn ze niet enkel geschikt voor mannen die kampen met vervroegt haaruitval, maar ook voor vrouwen en
            kinderen waarbij haaruitval genetische is bepaald. Zelfs zijn ze ontworpen en geschikt na traumatische
            verwondingen zoals brandwonden op de hoofdhuid die levenslange haargroei hebben te niet gedaan. Ook stress
            is een gekende factor!
          </p>
          <p>Onze haarsystemen zijn van hoge kwaliteit en zijn gemaakt van 100% echt haar.</p>
        </flex-column>
      </flex-row>

      <footer-element></footer-element>
    `
  }
}
