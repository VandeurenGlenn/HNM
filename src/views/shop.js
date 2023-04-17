import {LitElement, html, css} from 'lit'
import { map } from 'lit/directives/map.js'
import '@vandeurenglenn/flex-elements'
import './../elements/search-input.js'
import './../elements/shop-item.js'

export default customElements.define('shop-view', class ShopView extends LitElement {
  static get properties() {
    return {
      items: { type: Array },
    };
  }

  constructor() {
    super()
  }

  async connectedCallback() {
    super.connectedCallback()
    await this.updateComplete
    document.addEventListener('theme-change', this.#darkmode.bind(this))
    this.#darkmode({detail: localStorage.getItem('selected-theme') || 'light'})
    this.items = [
      {
        image: './assets/example2.webp'
      }, {
        image: './assets/example2.webp'
      }, {
        image: './assets/example2.webp'
      }, {
        image: './assets/example2.webp'
      }, {
        image: './assets/example2.webp'
      }, {
        image: './assets/example2.webp'
      }, {
        image: './assets/example2.webp'
      }, {
        image: './assets/example2.webp'
      }, {
        image: './assets/example2.webp'
      }
    ]
  }

  #darkmode({detail}) {
    // if (detail === 'dark') {
    //   this.renderRoot.querySelector(`img[alt="logo"]`).src = './assets/sciccors-dark.svg'
    // } else {
    //   this.renderRoot.querySelector(`img[alt="logo"]`).src = './assets/sciccors.svg'
    // }
  }

  static styles = css`
    * {
      pointer-events: scroll;
    }
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

    flex-wrap-evenly {
      margin: 24px 0;
      max-width: 960px;
      width: 100%;
      overflow-y: auto;
    }

    shop-item {
      width: 300px;
      height: 300px;

      margin-bottom: 12px;
    }
  `

  render() {
    return html`
    
    

      <header class="small">
      <drawer-menu-button></drawer-menu-button>
        
        <flex-one></flex-one>
        <!-- <md-filled-button label="SHOP"></md-filled-button>-->
        
        <mwc-icon-button icon="shopping_cart"></mwc-icon-button>
        </span>
      </header>
        <flex-wrap-evenly>
          ${map(this.items, item => html`
            <shop-item image="${item.image}">
          `)}
          
          </shop-item>
        
        </flex-wrap-evenly>
       
        <search-input></search-input>
       
    `
    // <img alt="banner" loading="lazy" src="./assets/banner.webp">
  }
})