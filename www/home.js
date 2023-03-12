import { s, i, y } from './flex-container-1a520fd9.js';

var home = customElements.define('home-view', class HomeView extends s {
  static get properties() {
    return {
      condensed: {
        type: Boolean,
        reflect: true
      },
    };
  }

  constructor() {
    super();

    this.onscroll = this.#onscroll.bind(this);
  }

  #onscroll(event) {
    event.preventDefault();
console.log(this.scrollTop);
    if (this.scrollTop > 290) this.condensed = true;
    else this.condensed = false;
  }

  static styles = i`
    :host {
      overflow-y: auto;
      position: relative;
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
    }


    header {
      // position: absolute;
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
    }

    main {      
      // top: 345px;
      // position: absolute;
      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: center;
      padding: 6px 12px;
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

    header.big {

      background: #bdb9c1;
    }

    header.big span {
      top: 0;
      position: absolute;

    }

    header.small {
      height: 54px;
      box-sieing: border-box;
      z-index: 100;
      margin-top: -54px;
    }

    header.small img {
      width: 54px;
      opacity: 0;
      transition: opacity ease-out 60ms;
    }

    header.big img {
      opacity: 1;

      transition: opacity ease-in 120ms;
    }

    :host([condensed]) header.small {
      top: 0;
      position: sticky;
      background: #bdb9c1;
    }
    :host([condensed]) header.small img {
      opacity: 1;

      transition: opacity ease-in 60ms;
    }

    :host([condensed]) header.big img {
      opacity: 0;

      transition: opacity ease-out 16ms;
    }
    .filler {
      display: flex;
      width: 32px;
    }
  `

  render() {
    return y`
      <header class="big">
        <img src="./assets/banner.jpg">
        <span>
        <!-- <h1>HNM</h1> -->
        <flex-one></flex-one>
        
        </span>
      </header>

      <header class="small">
        <span>
        <span class="filler"></span>
        <flex-one></flex-one>
        <img src="./assets/logo.jpeg">
        <flex-one></flex-one>
        <custom-svg-icon icon="menu" style="margin-top: 3px;margin-right: 3px;"></custom-svg-icon>
        </span>
      </header>
        <main>
        <section class="examples">
        <span class="left">
          <img src="./assets/example2.jpg">
          <img src="./assets/example1.jpg">  
        </span>

        <span class="right">
          <img src="./assets/example1.jpg">  
          <img src="./assets/example2.jpg">
        </span>
      </section>

      <section class="examples">
        <span class="left">
          <img src="./assets/example2.jpg">
          <img src="./assets/example1.jpg">  
        </span>

        <span class="right">
          <img src="./assets/example1.jpg">  
          <img src="./assets/example2.jpg">
        </span>
      </section>
      
      <section class="examples">
        <span class="left">
          <img src="./assets/example2.jpg">
          <img src="./assets/example1.jpg">  
        </span>

        <span class="right">
          <img src="./assets/example1.jpg">  
          <img src="./assets/example2.jpg">
        </span>
      </section>

      <section class="examples">
        <span class="left">
          <img src="./assets/example2.jpg">
          <img src="./assets/example1.jpg">  
        </span>

        <span class="right">
          <img src="./assets/example1.jpg">  
          <img src="./assets/example2.jpg">
        </span>
      </section>
    </main>
    
    `
    // <img src="./assets/banner.jpg">
  }
});

export { home as default };
