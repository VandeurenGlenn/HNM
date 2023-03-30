import {LitElement, html, css} from 'lit'
import 'custom-svg-iconset'
import 'custom-svg-icon'
import 'custom-pages'
import './elements/drawer.js'
import './elements/button.js'
import '@material/web/fab/fab.js'

import '@material/web/fab/fab-extended.js'
import '@material/web/button/filled-button.js'

export default customElements.define('app-shell', class AppShell extends LitElement {
  static get properties() {
    return {
      menuShown: { type: Boolean, reflect: true },
    };
  }

  constructor() {
    super()

    globalThis.onhashchange = this.#hashchange.bind(this)
  }

  get #drawer() {
    return this.renderRoot.querySelector('drawer-element')
  }

  set menuShown(value) {
    if (this.#drawer) this.#drawer.shown = value
    else this.updateComplete.then(() => {
      this.#drawer.shown = value
    })
    if (value) this.setAttribute('menuShown', '')
    else this.removeAttribute('menuShown')
  }

  get menuShown() {
    return this.#drawer?.shown
  }

  async connectedCallback() {
    super.connectedCallback();
    document.addEventListener('menu-click', () => (this.menuShown = !this.menuShown));
    document.addEventListener('menu-shown', ({detail}) => this.menuShown = detail);
    if (!location.hash) location.hash = '#!/home'
    this.#hashchange()
  }



  get #pages() {
    return this.renderRoot.querySelector('custom-pages')
  }

  async #hashchange() {
    if (this.menuShown) this.menuShown = false
    const parts = location.hash.split('#!/')
    console.log(parts);
    this.#select(parts[1])
  }

  async #select(selected) {
    requestAnimationFrame(async () => {
      !customElements.get(`${selected}-view`) && await import(`./${selected}.js`)
      this.#pages.select(selected)
    })
    
  }

  async select(selected) {
    location.hash = `#!/${selected}`
  }

  static styles = css`
    @font-face {
      font-family: americanTypewriter;
      src: url("./fonts/American Typewriter Regular.ttf");
    }

    * {
      pointer-events: none;
      user-select: none;
      outline: none;
    }

    a {
      text-decoration: none;
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
      font-family: system-ui, "Noto Sans", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
      color: var(--main-color);
      background-color: var(--main-background-color);
      overflow: hidden;
      font-family: americanTypewriter;
    }
    
    main {
      overflow-y: auto;
      position: absolute;
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

    :host([menuShown]) .backdrop {
      opacity: 1;
      pointer-events: auto;
      background: #000000a1
    }

    :host([menuShown]) md-fab {
      opacity: 0;
    }
    
    button-element {
      pointer-events: auto;
    }
    
    flex-container {
      padding-top: 24px;
      min-width: auto;
    }

    aside flex-container {
      align-items: flex-end;
    }

    button-element {
      --button-background: #2b2a2c;
    }
  `

  render() {
    return html`
    <span class="backdrop" @click="${() => this.menuShown = false}"></span>
    
    <drawer-element></drawer-element>
    
    <button-element fab extended label="gratis offerte" name="advies" class="fab">
      gratis advies
    </button-element>

    <main>
      <custom-pages attr-for-selected="data-route">
        <home-view data-route="home"></home-view>
      </custom-pages>
    </main>
    `
    // <img src="./assets/banner.jpg">
  }
})