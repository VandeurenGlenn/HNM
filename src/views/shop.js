import {LitElement, html, css} from 'lit'
import '@vandeurenglenn/flex-elements'


export default customElements.define('shop-view', class ShopView extends LitElement {
  static get properties() {
    return {
      condensed: {
        type: Boolean,
        reflect: true
      },
    };
  }

  constructor() {
    super()

    this.onscroll = this.#onscroll.bind(this)
  }

  #onscroll(event) {
    event.preventDefault()
    const {height} = this.renderRoot.querySelector('header.big').getBoundingClientRect()
    if (this.scrollTop > height - 54) this.condensed = true
    else this.condensed = false
  }

  static styles = css`
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
      margin-top: -34px;
    }

    image {
      will-change: padding;
    }

    header.small img {
      width: 54px;
      opacity: 0;
      transition: opacity ease-out 60ms;
    }

    header.big img {
      opacity: 1;
      max-height: 316px;
      transition: opacity ease-in 120ms;
    }

    :host([condensed]) header.small {
      top: 0;
      background: var(--main-background-color);
      position: sticky;
    }
    :host([condensed]) header.small img {
      opacity: 1;
      transition: opacity ease-in 60ms;
    }

    :host([condensed]) header.big img {
      opacity: 0;
      transition: opacity ease-out 16ms;
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
    <link rel="preload" as="image" href="./assets/example2.webp">
    <link rel="preload" as="image" href="./assets/example1.webp">

    ${localStorage.getItem('theme') === 'dark' ?
      html`<link rel="preload" as="image" href="./assets/banner-dark.svg">` :
      html`<link rel="preload" as="image" href="./assets/banner.svg">`
    }
      
      
      <header class="big">
        <img alt="banner" src="./assets/banner.svg">
      </header>

      <header class="small">
        <span style="display:contents;">
        <span class="filler"></span>
        <flex-one></flex-one>
        <img alt="logo" loading="lazy" src="./assets/sciccors.svg">
        <flex-one></flex-one>
        <!-- <md-filled-button label="SHOP"></md-filled-button>-->
        <button-element icon>
          <mwc-icon-button @click="${() => document.dispatchEvent(new CustomEvent('menu-click'))}" icon="menu"></mwc-icon-button>
        </button-element>
 
        </span>
      </header>
        <flex-wrap-between>
          <section class="examples">
          <img alt="example2" class="example2" loading="lazy" src="./assets/example2.webp">
          <img alt="example1" class="example1" loading="lazy" src="./assets/example1.webp">  
          </section>

          <section class="examples">
          <img alt="example1" class="example1" loading="lazy" src="./assets/example1.webp">  
          <img alt="example2" class="example2" loading="lazy" src="./assets/example2.webp">
          </section>

          <section class="examples">
          <img alt="example2" class="example2" loading="lazy" src="./assets/example2.webp">
          <img alt="example1" class="example1" loading="lazy" src="./assets/example1.webp">  
          </section>
  
          <section class="examples">
          <img alt="example1" class="example1" loading="lazy" src="./assets/example1.webp">  
          <img alt="example2" class="example2" loading="lazy" src="./assets/example2.webp">
          </section>

          <section class="examples">
          <img alt="example2" class="example2" loading="lazy" src="./assets/example2.webp">
          <img alt="example1" class="example1" loading="lazy" src="./assets/example1.webp">  
          </section>

          <section class="examples">
          <img alt="example1" class="example1" loading="lazy" src="./assets/example1.webp">  
          <img alt="example2" class="example2" loading="lazy" src="./assets/example2.webp">
          </section>
          
          <section class="examples">
          <img alt="example2" class="example2" loading="lazy" src="./assets/example2.webp">
          <img alt="example1" class="example1" loading="lazy" src="./assets/example1.webp">  
          </section>
  
          <section class="examples">
          <img alt="example1" class="example1" loading="lazy" src="./assets/example1.webp">  
          <img alt="example2" class="example2" loading="lazy" src="./assets/example2.webp">
          </section>
        </flex-wrap-between>
       
       
    `
    // <img alt="banner" loading="lazy" src="./assets/banner.webp">
  }
})