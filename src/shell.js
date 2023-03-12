import {LitElement, html, css} from 'lit'
import 'custom-svg-iconset'
import 'custom-svg-icon'
import '@vandeurenglenn/flex-elements'
import 'custom-pages'
export default customElements.define('app-shell', class AppShell extends LitElement {

  constructor() {
    super()

    globalThis.onhashchange = this.#hashchange.bind(this)
  }

  connectedCallback() {
    super.connectedCallback();
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
    !customElements.get(`${selected}-view`) && await import(`./${selected}.js`)
    this.#pages.select(selected)
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
      flex-direction: column;
      font-family: system-ui, "Noto Sans", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
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

    

  `

  render() {
    return html`

   
    <main>
      <custom-pages attr-for-selected="data-route">
        <home-view data-route="home"></home-view>
      </custom-pages>
    </main>
    
    `
    // <img src="./assets/banner.jpg">
  }
})