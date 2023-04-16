import {LitElement, html, css} from 'lit'
import 'custom-svg-iconset'
import 'custom-svg-icon'
import 'custom-pages'
import '@material/mwc-drawer'
import '@material/mwc-fab'
import '@material/mwc-button'
import '@material/mwc-icon-button'
import '@material/mwc-top-app-bar-fixed'

import './elements/darkmode/element.js'
import '@material/mwc-list'
import '@vandeurenglenn/flex-elements'
export default customElements.define('app-shell', class AppShell extends LitElement {
  static get properties() {
    return {
      menuShown: { type: Boolean, reflect: true },
      isMobile: { type: Boolean, reflect: true },
    };
  }

  constructor() {
    super()

    this.init()
  }

  async init() {
    globalThis.onhashchange = this.#hashchange.bind(this)
    let media = matchMedia("(min-width: 1200px)");
    const onMedia = ({matches}) => {
      this.isMobile = !matches
    }
    await this.updateComplete

    this.#darkmode({detail: localStorage.getItem('selected-theme') || 'light'})
    if (!location.hash) location.hash = '#!/home'
    const elemStyleSheets = this.#drawer.shadowRoot.adoptedStyleSheets;

    const sheet = new CSSStyleSheet()
    sheet.replaceSync('.mdc-drawer { z-index: 1000; }')
    this.#drawer.shadowRoot.adoptedStyleSheets = [...elemStyleSheets, sheet];
    media.addEventListener('change', onMedia)
    onMedia(media)


    document.addEventListener('menu-click', () => (this.menuShown = !this.menuShown));
    document.addEventListener('menu-shown', ({detail}) => this.menuShown = detail);
    document.addEventListener('theme-change', this.#darkmode.bind(this))
    this.#hashchange()
  }

  set isMobile(value) {
    if (this._isMobile === value) return
    this._isMobile = value
    if (value) {
      this.#drawer.setAttribute('type', 'modal')
      this.menuShown = false
    } else {
      this.#drawer.setAttribute('type', 'dismissible')
      this.menuShown = true
    }
  }

  set menuShown(value) {
    if (this._menuShown === value) return
    this._menuShown = value


    this.#drawer.open = value
  }

  get menuShown() {
    return this._menuShown
  }

  get isMobile() {
    return this._isMobile
  }

  get #drawer() {
    return this.renderRoot.querySelector('mwc-drawer')
  }

  get #drawerNav() {
    return this.#drawer.querySelector('mwc-list')
  }

  #darkmode({detail}) {
    if (detail === 'dark') {
      this.renderRoot.querySelector(`img[alt="logo"]`).src = './assets/sciccors-dark.svg'
    } else {
      this.renderRoot.querySelector(`img[alt="logo"]`).src = './assets/sciccors.svg'
    }
  }


  get #pages() {
    return this.renderRoot.querySelector('custom-pages')
  }

  async #hashchange() {
    if (this.menuShown && this.isMobile) this.menuShown = false
    const parts = location.hash.split('#!/')
    console.log(parts);
    this.#select(parts[1])
  }

  async #select(selected) {
    const elements = Array.from(this.#drawer.querySelectorAll(`[data-route]`))
    for (const element of elements) {
      if (element.dataset.route === selected) {
        this.#drawerNav.select(elements.indexOf(element))
        break
      }
    }
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
    
    mwc-drawer {
      width: 100%;
      z-index: 10000;
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
      background: #000000a1
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

    mwc-drawer mwc-icon-button {
      color: #555;
    }

    img {
      width: 100%;
      transition: opacity ease-in 120ms;
    }
  `

  render() {
    return html`
    <span class="backdrop" @click="${() => this.menuShown = false}"></span>
    
    <mwc-drawer type="" hasHeader>
    <span slot="title">
      <img alt="logo" loading="lazy" src="./assets/sciccors-dark.svg"></span>
      <span slot="subtitle" style="padding-bottom: 24px;"></span>
      
      <flex-container style="height: 100%; align-items: center; padding-bottom: 24px; box-sizing: border-box;">
        <darkmode-element></darkmode-element>
        
        <mwc-list activatable style="width: 100%;">
          <li divider role="separator"></li>
          <mwc-list-item data-route="home" @click="${() => location.hash = '#!/home'}" selected activated>home</mwc-list-item>
          <mwc-list-item data-route="shop" @click="${() => location.hash = '#!/shop'}">shop</mwc-list-item>
          <mwc-list-item data-route="services" @click="${() => location.hash = '#!/services'}">services</mwc-list-item>
          <mwc-list-item data-route="team" @click="${() => location.hash = '#!/team'}">team</mwc-list-item>
          </mwc-list>
        <flex-one></flex-one>
        
          
        
        <mwc-fab fab extended label="gratis advies" name="advies" class="fab" icon="contact_support"></mwc-fab>
      </flex-container>
     
      
      <main slot="appContent">
        <custom-pages attr-for-selected="data-route">
          <home-view data-route="home"></home-view>
          <shop-view data-route="shop"></shop-view>
          <services-view data-route="services"></services-view>
          <team-view data-route="team"></team-view>
        </custom-pages>
      </main>

      </mwc-drawer>
   
    

    
    `
    // <img src="./assets/banner.jpg">
  }
})