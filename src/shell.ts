import { LitElement, html, css } from 'lit'
import '@vandeurenglenn/lite-elements/drawer-layout.js'
import '@vandeurenglenn/lite-elements/pages.js'
import '@vandeurenglenn/lite-elements/theme.js'
import '@vandeurenglenn/lite-elements/selector.js'

import './elements/darkmode/element.js'
import '@material/web/fab/branded-fab.js'
import { query, LiteElement, property } from '@vandeurenglenn/lite'
import { scrollbar } from './mixins/styles.js'
import icons from './icons.js'

export default customElements.define(
  'app-shell',
  class AppShell extends LiteElement {
    @query('custom-drawer-layout')
    accessor #drawerLayout

    @query('custom-pages')
    accessor #pages

    @query('custom-selector')
    accessor #selector

    @property({ reflect: true }) accessor darkmode

    @property({ reflect: true, attribute: 'menu-shown', Boolean: true })
    accessor menuShown

    @property({ reflect: true, attribute: 'is-mobile', Boolean: true })
    accessor isMobile

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
      document.addEventListener('theme-change', this.#darkmode.bind(this))
      this.#hashchange()
    }

    #darkmode({ detail }) {
      if (detail === 'dark') {
        this.shadowRoot.querySelector(`img[alt="logo"]`).src = './assets/sciccors-dark.svg'
      } else {
        this.shadowRoot.querySelector(`img[alt="logo"]`).src = './assets/sciccors.svg'
      }
      this.darkmode = detail === 'dark' ? true : false
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

        :host(:not([darkmode])) {
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
          --md-sys-color-shadow: var(--md-sys-color-shadow-light);
          --md-sys-color-surface-tint: var(--md-sys-color-surface-tint-light);
          --md-sys-color-outline-variant: var(--md-sys-color-outline-variant-light);
          --md-sys-color-scrim: var(--md-sys-color-scrim-light);
        }

        :host([darkmode]) {
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
          --md-sys-color-shadow: var(--md-sys-color-shadow-dark);
          --md-sys-color-surface-tint: var(--md-sys-color-surface-tint-dark);
          --md-sys-color-outline-variant: var(--md-sys-color-outline-variant-dark);
          --md-sys-color-scrim: var(--md-sys-color-scrim-dark);
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
        <custom-theme load-symbols="false"></custom-theme>
        <span
          class="backdrop"
          @click="${() => (this.#drawerLayout.drawerOpen = false)}"></span>

        <custom-drawer-layout .drawer-open=${this.menuShown}>
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

              <custom-drawer-item data-route="services">
                services
                <flex-it></flex-it>
                <custom-icon icon="linked_services"></custom-icon>
              </custom-drawer-item>

              <custom-drawer-item data-route="team">
                team
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
              <services-view data-route="services"></services-view>
              <team-view data-route="team"></team-view>
            </custom-pages>
          </main>
        </custom-drawer-layout>
      `
      // <img src="./assets/banner.jpg">
    }
  }
)
