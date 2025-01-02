import { LitElement, html, css } from 'lit'
import '@vandeurenglenn/lite-elements/drawer-layout.js'
import '@vandeurenglenn/lite-elements/pages.js'
import '@vandeurenglenn/lite-elements/theme.js'
import '@vandeurenglenn/lite-elements/selector.js'
import '@vandeurenglenn/flex-elements/row.js'
import '@vandeurenglenn/flex-elements/it.js'
import '@vandeurenglenn/lite-elements/banner.js'

import './elements/darkmode/element.js'
import '@material/web/fab/branded-fab.js'
import { query, LiteElement, property } from '@vandeurenglenn/lite'
import { scrollbar } from './mixins/styles.js'
import icons from './icons.js'
import './elements/shop/cart.js'

export default customElements.define(
  'app-shell',
  class AppShell extends LiteElement {
    @query('custom-drawer-layout')
    accessor #drawerLayout

    @query('custom-pages')
    accessor #pages

    @query('custom-selector')
    accessor #selector

    @property({ reflect: true, type: Boolean, provides: 'darkMode', attribute: 'dark-mode' }) accessor darkMode

    @property({ reflect: true, attribute: 'menu-shown', type: Boolean })
    accessor menuShown

    @property({ reflect: true, attribute: 'is-mobile', type: Boolean })
    accessor isMobile

    @property({ type: Boolean }) accessor bannerShown = true

    constructor() {
      super()

      this.init()
    }

    async init() {
      globalThis.onhashchange = this.#hashchange.bind(this)
      let media = matchMedia('(min-width: 1200px)')
      const onMedia = ({ matches }) => {
        this.isMobile = !matches
      }

      this.#darkmode({
        detail: localStorage.getItem('selected-theme') || 'light'
      })
      if (!location.hash) location.hash = '#!/home'

      media.addEventListener('change', onMedia)
      onMedia(media)

      document.addEventListener('drawer-menu-click', () => (this.menuShown = !this.menuShown))
      document.addEventListener('theme-change', this.#darkmode)
      this.#hashchange()
    }

    #darkmode = ({ detail }) => {
      if (detail === 'dark') {
        this.shadowRoot.querySelector(`img[alt="logo"]`).src = './assets/sciccors-dark.svg'
        this.darkMode = true
      } else {
        this.darkMode = false
        this.shadowRoot.querySelector(`img[alt="logo"]`).src = './assets/sciccors.svg'
      }
      console.log('darkmode', detail)
      console.log(this.darkMode)
    }
    async #hashchange() {
      if (this.menuShown && this.isMobile) this.menuShown = false
      const parts = location.hash.split('#!/')
      this.#select(parts[1])
    }

    async #select(selected) {
      requestAnimationFrame(async () => {
        !customElements.get(`${selected}-view`) && (await import(`./${selected}.js`))
        this.#pages.select(selected)
        this.#selector.select(selected)
      })
    }

    async select(selected) {
      location.hash = `#!/${selected}`
    }

    static styles = [
      css`
        @font-face {
          font-family: americanTypewriter;
          src: url('./fonts/American Typewriter Regular.ttf');
        }

        * {
          user-select: none;
          outline: none;
        }

        a {
          text-decoration: none;
        }

        :host(:not([dark-mode])) {
          --md-sys-color-primary: var(--md-sys-color-primary-light);
          --md-sys-color-on-primary: var(--md-sys-color-on-primary-light);
          --md-sys-color-primary-container: var(--md-sys-color-primary-container-light);
          --md-sys-color-on-primary-container: var(--md-sys-color-on-primary-container-light);
          --md-sys-color-secondary: var(--md-sys-color-secondary-light);
          --md-sys-color-on-secondary: var(--md-sys-color-on-secondary-light);
          --md-sys-color-secondary-container: var(--md-sys-color-secondary-container-light);
          --md-sys-color-secondary-container-hover: var(--md-sys-color-secondary-container-hover-light);
          --md-sys-color-on-secondary-container: var(--md-sys-color-on-secondary-container-light);
          --md-sys-color-tertiary: var(--md-sys-color-tertiary-light);
          --md-sys-color-on-tertiary: var(--md-sys-color-on-tertiary-light);
          --md-sys-color-tertiary-container: var(--md-sys-color-tertiary-container-light);
          --md-sys-color-on-tertiary-container: var(--md-sys-color-on-tertiary-container-light);
          --md-sys-color-error: var(--md-sys-color-error-light);
          --md-sys-color-on-error: var(--md-sys-color-on-error-light);
          --md-sys-color-error-container: var(--md-sys-color-error-container-light);
          --md-sys-color-on-error-container: var(--md-sys-color-on-error-container-light);
          --md-sys-color-outline: var(--md-sys-color-outline-light);
          --md-sys-color-background: var(--md-sys-color-background-light);
          --md-sys-color-on-background: var(--md-sys-color-on-background-light);
          --md-sys-color-surface: var(--md-sys-color-surface-light);
          --md-sys-color-on-surface: var(--md-sys-color-on-surface-light);
          --md-sys-color-surface-variant: var(--md-sys-color-surface-variant-light);
          --md-sys-color-on-surface-variant: var(--md-sys-color-on-surface-variant-light);
          --md-sys-color-inverse-surface: var(--md-sys-color-inverse-surface-light);
          --md-sys-color-inverse-on-surface: var(--md-sys-color-inverse-on-surface-light);
          --md-sys-color-inverse-primary: var(--md-sys-color-inverse-primary-light);
          --md-sys-color-surface-tint: var(--md-sys-color-surface-tint-light);
          --md-sys-color-outline-variant: var(--md-sys-color-outline-variant-light);
          --md-sys-color-scrim: var(--md-sys-color-scrim-light);
          --md-sys-color-surface-container-highest: var(--md-sys-color-surface-container-highest-light);
          --md-sys-color-shadow: var(--md-sys-color-shadow-light);
        }

        :host([dark-mode]) {
          --md-sys-color-primary: var(--md-sys-color-primary-dark);
          --md-sys-color-on-primary: var(--md-sys-color-on-primary-dark);
          --md-sys-color-primary-container: var(--md-sys-color-primary-container-dark);
          --md-sys-color-on-primary-container: var(--md-sys-color-on-primary-container-dark);
          --md-sys-color-secondary: var(--md-sys-color-secondary-dark);
          --md-sys-color-on-secondary: var(--md-sys-color-on-secondary-dark);
          --md-sys-color-secondary-container: var(--md-sys-color-secondary-container-dark);
          --md-sys-color-secondary-container-hover: var(--md-sys-color-secondary-container-hover-dark);
          --md-sys-color-on-secondary-container: var(--md-sys-color-on-secondary-container-dark);
          --md-sys-color-tertiary: var(--md-sys-color-tertiary-dark);
          --md-sys-color-on-tertiary: var(--md-sys-color-on-tertiary-dark);
          --md-sys-color-tertiary-container: var(--md-sys-color-tertiary-container-dark);
          --md-sys-color-on-tertiary-container: var(--md-sys-color-on-tertiary-container-dark);
          --md-sys-color-error: var(--md-sys-color-error-dark);
          --md-sys-color-on-error: var(--md-sys-color-on-error-dark);
          --md-sys-color-error-container: var(--md-sys-color-error-container-dark);
          --md-sys-color-on-error-container: var(--md-sys-color-on-error-container-dark);
          --md-sys-color-outline: var(--md-sys-color-outline-dark);
          --md-sys-color-background: var(--md-sys-color-background-dark);
          --md-sys-color-on-background: var(--md-sys-color-on-background-dark);
          --md-sys-color-surface: var(--md-sys-color-surface-dark);
          --md-sys-color-on-surface: var(--md-sys-color-on-surface-dark);
          --md-sys-color-surface-variant: var(--md-sys-color-surface-variant-dark);
          --md-sys-color-on-surface-variant: var(--md-sys-color-on-surface-variant-dark);
          --md-sys-color-inverse-surface: var(--md-sys-color-inverse-surface-dark);
          --md-sys-color-inverse-on-surface: var(--md-sys-color-inverse-on-surface-dark);
          --md-sys-color-inverse-primary: var(--md-sys-color-inverse-primary-dark);
          --md-sys-color-surface-tint: var(--md-sys-color-surface-tint-dark);
          --md-sys-color-outline-variant: var(--md-sys-color-outline-variant-dark);
          --md-sys-color-scrim: var(--md-sys-color-scrim-dark);
          --md-sys-color-surface-container-highest: var(--md-sys-color-surface-container-highest-dark);
          --md-sys-color-shadow: #52596b;
        }
        :host {
          overflow-y: auto;
          position: relative;
          height: 100%;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: row;
          font-family: system-ui, 'Noto Sans', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',
            'Segoe UI Emoji', 'Segoe UI Symbol';
          overflow: hidden;
          font-family: americanTypewriter;
        }

        main {
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          width: 100%;
          // align-items: center;
          height: 100%;
        }

        h1 {
          margin: 0;
          font-size: 24px;
        }

        .backdrop {
          z-index: 10000;
          opacity: 0;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }

        :host([isMobile][menuShown]) .backdrop {
          opacity: 1;
          pointer-events: auto;
          background: #000000a1;
        }

        :host([menuShown]) md-fab {
          opacity: 0;
        }

        button-element {
          pointer-events: auto;
        }

        flex-container {
          min-width: auto;
        }

        aside flex-container {
          align-items: flex-end;
        }

        button-element {
          --button-background: #2b2a2c;
        }

        img {
          width: 100%;
          transition: opacity ease-in 120ms;
        }

        [slot='drawer-content'] {
          padding: 20px;
          box-sizing: border-box;
        }

        [slot='drawer-content'] custom-selector {
          height: auto;
        }

        [slot='drawer-footer'] {
          padding: 20px;
          box-sizing: border-box;
        }

        custom-drawer-item.custom-selected {
          background: var(--md-sys-color-secondary);
          color: var(--md-sys-color-on-secondary);
        }

        custom-drawer-item.custom-selected custom-icon {
          --custom-icon-color: var(--md-sys-color-on-secondary);
        }

        ::slotted(:not(.custom-selected):not([non-interactive]):hover) custom-icon {
          --custom-icon-color: var(--md-sys-color-on-secondary);
        }

        ::slotted(:not(.custom-selected):not([non-interactive]):hover) {
          background: var(--md-sys-color-secondary-container-hover);
          color: var(--md-sys-color-on-secondary-container);
        }

        custom-selector {
          text-transform: capitalize;
          width: 100%;
        }

        custom-banner {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 10000;
          background: var(--md-sys-color-error);
          color: var(--md-sys-color-on-error);
          padding: 12px;
          box-sizing: border-box;
          text-align: center;
          font-size: 16px;
          height: fit-content;
        }
        custom-banner:not([shown]) {
          display: none;
        }
        ${scrollbar}
      `
    ]

    render() {
      return html`
        <link
          rel="preload"
          href="./assets/banner-dark.svg"
          as="image" />

        ${icons}

        <custom-theme
          load-symbols="false"
          load-font="false"></custom-theme>

        <span
          class="backdrop"
          @click="${() => (this.#drawerLayout.drawerOpen = false)}"></span>

        <custom-banner ?shown=${this.bannerShown === true}
          >We are still under construction, feel free to look around but no orders will be accepted yet. Thank you for
          your understanding, we will let you know when we are ready!

          <custom-icon-button
            icon="close"
            slot="actions"
            @click=${() => (this.bannerShown = false)}></custom-icon-button>
        </custom-banner>

        <custom-drawer-layout .drawer-open=${this.menuShown}>
          <span slot="top-app-bar-end">
            <shop-cart></shop-cart>
          </span>

          <flex-container slot="drawer-content">
            <span style="display:block;">
              <img
                alt="logo"
                loading="lazy"
                src="./assets/sciccors-dark.svg"
            /></span>

            <custom-selector
              attr-for-selected="data-route"
              @selected=${({ detail }) => this.select(detail)}>
              <custom-drawer-item data-route="home">
                home
                <flex-it></flex-it>
                <custom-icon icon="home"></custom-icon>
              </custom-drawer-item>

              <custom-drawer-item data-route="shop">
                shop
                <flex-it></flex-it>
                <custom-icon icon="shopping_basket"></custom-icon>
              </custom-drawer-item>

              <custom-drawer-item data-route="giftcards">
                giftcards
                <flex-it></flex-it>
                <custom-icon icon="redeem"></custom-icon>
              </custom-drawer-item>

              <custom-drawer-item data-route="who-we-are">
                wie zijn we
                <flex-it></flex-it>
                <custom-icon icon="groups"></custom-icon>
              </custom-drawer-item>
            </custom-selector>
          </flex-container>

          <darkmode-element slot="drawer-footer"></darkmode-element>

          <md-branded-fab
            branded-fab
            extended
            label="gratis advies"
            name="advies"
            class="fab">
            <md-icon slot="icon">contact_support</md-icon>
          </md-branded-fab>
          <main slot="content">
            <custom-pages attr-for-selected="data-route">
              <home-view data-route="home"></home-view>
              <shop-view data-route="shop"></shop-view>
              <giftcards-view data-route="giftcards"></giftcards-view>
              <who-we-are-view data-route="who-we-are"></who-we-are-view>
            </custom-pages>
          </main>
        </custom-drawer-layout>
      `
      // <img src="./assets/banner.jpg">
    }
  }
)
