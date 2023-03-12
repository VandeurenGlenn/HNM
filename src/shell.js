import {LitElement, html, css} from 'lit'
import 'custom-svg-iconset'
import 'custom-svg-icon'
import '@vandeurenglenn/flex-elements'
import 'custom-pages'
export default customElements.define('app-shell', class AppShell extends LitElement {
  static get properties() {
    return {
      condensed: {
        type: Boolean,
        reflect: true
      }
    }
  }
  constructor() {
    super()

    globalThis.onhashchange = this.#hashchange.bind(this)
  }

  connectedCallback() {
    super.connectedCallback();
    this.onscroll = this.#onscroll.bind(this)
    if (!location.hash) location.hash = '#!/home'
    this.#hashchange()
  }

  #onscroll(event) {
    event.preventDefault()
    const max = 348

    // if (this.scrollTop > max) return
    const value = max - this.scrollTop

    if (this.scrollTop > 264) {
      this.condensed = true
    } else {
      this.condensed = false
    }
    // if (value < 250) return
    console.log(this.scrollTop);
    const scale = ((100 - (this.scrollTop / 4) - this.lastScroll / 100) / 100)
    console.log(scale)

    const img = this.renderRoot.querySelector('header.big img')
    const header = this.renderRoot.querySelector('header.big')
   
    if (scale < 0) {
      return img.style = `transform: scale(0) translateY(0) translateX(0);`
    }
    if (scale > 1) return
    

    // header.style = `transform: translateY(-${110 - (scale * 100)}%);`
    img.style = `transform: scale(${scale}) translateY(${(100 - (scale * 100))*2}px) translateX(-${(100 - (scale * 100)) * 2.5}px);`
    this.lastScroll = this.scrollTop / 4
    // console.log(img.style);
    // console.log(this.scrollTop);
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
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      font-family: system-ui, "Noto Sans", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }

    header {
      position: absolute;
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center; 
      // background: #beb9c0;
    }

    main {
      position: absolute;
      top: 345px;
      display: flex;
      flex-direction: column;
      width: 100%;
      // align-items: center;
      height: 100%;
    }

    main, header {
      box-sizing: border-box;
    }

    header span, section, img {
      max-width: 960px;
      width: 100%;
    }
    header span {
      display: flex;
      align-items: center;
    }

    h1 {
      margin: 0;
      font-size: 24px;
    }

    .examples {
      display: flex;
      flex-direction: row;
    }

    .examples .left, .examples .right {
      width: calc(100% / 2);
    }

    .left {
      padding-right: 3px;
    }

    .right {
      padding-left: 3px;
    }
    
    .left img, .right img {
      padding-top: 3px;
    }

    header.big {

      background: #bdb9c1;
    }

    header.big span {
      top: 0;
      position: absolute;

    }

    header.small {
      height: 86px;
      padding: 12px 24px;
      opacity: 0;
      position: fixed;
      z-index: 1000;
      background: #bdb9c1;
    }

    header.small img{
      max-width: 86px
    }
    :host([condensed]) header.small {
      opacity: 1;
    }

    :host([condensed]) header.big {
      opacity: 0;
    }
  `

  render() {
    return html`
    <header class="small">
      <span>
      <img src="./assets/logo.jpeg">
      <flex-one></flex-one>
      <custom-svg-icon icon="menu" style="margin-top: 3px;margin-right: 3px;"></custom-svg-icon>
      </span>
    </header>

    <header class="big">
      <img src="./assets/banner.jpg">
      <span>
      <!-- <h1>HNM</h1> -->
      <flex-one></flex-one>
      <custom-svg-icon icon="menu" style="margin-top: 3px;margin-right: 3px;"></custom-svg-icon>
      </span>
    </header>
    <main>
      <custom-pages attr-for-selected="data-route">
        <home-view data-route="home"></home-view>
      </custom-pages>
    </main>
    
    `
    // <img src="./assets/banner.jpg">
  }
})