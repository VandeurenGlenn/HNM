import {LitElement, html, css} from 'lit'
import '@vandeurenglenn/flex-elements'


export default customElements.define('shop-view', class ShopView extends LitElement {

  constructor() {
    super()
  }

  async connectedCallback() {
    super.connectedCallback()
    await this.updateComplete
    document.addEventListener('theme-change', this.#darkmode.bind(this))
    this.#darkmode({detail: localStorage.getItem('selected-theme') || 'light'})

  }

  #darkmode({detail}) {
    if (detail === 'dark') {
      this.renderRoot.querySelector(`img[alt="logo"]`).src = './assets/sciccors-dark.svg'
    } else {
      this.renderRoot.querySelector(`img[alt="logo"]`).src = './assets/sciccors.svg'
    }
  }

  static styles = css`
    :host {

      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: center;
      padding: 12px;
      box-sizing: border-box;
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

    main, header {
      box-sizing: border-box;
    }

    header, section, img {
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
      flex-direction: column;
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


    main, header {
      box-sizing: border-box;
    }

    header span, section, img {
      max-width: 960px;
      width: 100%;
    }
    header span {
      display: flex;
      align-items: flex-end;
    }

    header.small {
      position: sticky;
      padding: 12px;
      min-height: 76px;
      max-height: 76px;
      height: 100%;
      box-sizing: border-box;
      z-index: 100;
      will-change: margin;
    }

    image {
      will-change: padding;
    }

    header.small img {
      width: 54px;
      transition: opacity ease-out 60ms;
    }

    :host([condensed]) header.small {
      top: 0;
      background: var(--main-background-color);
      position: sticky;
    }


    .examples{
      box-sizing: border-box;
      max-width: calc(100% / 2 - 2px);
    }

    .example1 {
      max-height: 220px;
    }

    .example1, .example2 {
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
  `

  render() {
    return html`
    
    

      <header class="small">
      <drawer-menu-button></drawer-menu-button>
        
        <flex-one></flex-one>
        <img alt="logo" loading="lazy" src="./assets/sciccors.svg">
        <flex-one></flex-one>
        <!-- <md-filled-button label="SHOP"></md-filled-button>-->
        
        <span class="filler"></span>
        </span>
      </header>
        <flex-wrap-between>

        
        </flex-wrap-between>
       
       
    `
    // <img alt="banner" loading="lazy" src="./assets/banner.webp">
  }
})