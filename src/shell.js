import {LitElement, html, css} from 'lit'
import 'custom-svg-iconset'
import 'custom-svg-icon'
import 'custom-pages'
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

  async connectedCallback() {
    super.connectedCallback();
    document.addEventListener('menu-click', () => (this.menuShown = !this.menuShown));
    if (!location.hash) location.hash = '#!/home'
    this.#hashchange()
  }



  get #pages() {
    return this.renderRoot.querySelector('custom-pages')
  }

  async #hashchange() {
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
    }


    md-fab {
      position: absolute;
      bottom: 12px;
      right: 12px;
      z-index: 10001;

      --svg-icon-color: #555;
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

    aside {
      display: flex;
      flex-direction: column;
      z-index: 10001;
      box-sizing: border-box;
      padding: 12px 24px;
      border-radius: 12px;
      background: rgb(187 185 190);
      position: absolute;
      opacity: 0;
      top: 12px;
      
      bottom: 12px;
      right: 12px;
      width: 256px;
      pointer-events: none;
    }

    md-elevation, md-ripple {
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      --md-elevation-level: 4;
    }
    a {
      text-decoration: none;
      user-select: none;
      outline: none;
    }

    aside a {
      height: 44px;
      box-sizing: border-box;
      font-weight: 500;
      color: #555;
      padding: 6px 12px;
    }

    :host([menuShown]) aside {
      opacity: 1;
      pointer-events: auto;
    }

    :host([menuShown]) md-fab {
      opacity: 0;
    }

  `

  render() {
    return html`

    
    <aside dir="rtl">
      <md-elevation shadow>
      </md-elevation>
      <a href="#!/services">services</a>
      <a href="#!/team">team</a>
      <a href="#!/home">home</a>
    </aside>

    <main>
      <custom-pages attr-for-selected="data-route">
        <home-view data-route="home"></home-view>
      </custom-pages>
    </main>
    `
    // <img src="./assets/banner.jpg">
  }
})