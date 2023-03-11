import {LitElement, html, css} from 'lit'
import 'custom-svg-iconset'
import 'custom-svg-icon'
import '@vandeurenglenn/flex-elements'
export default customElements.define('app-shell', class AppShell extends LitElement {
  constructor() {
    super()
  }

  static styles = css`
    :host {
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
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center; 
      padding: 6px 12px;
      // background: #beb9c0;
    }

    main, footer {
      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: center;
      padding: 6px 12px;
    }

    main, header, footer {
      box-sizing: border-box;
    }

    header span, section, img, footer flex-container {
      max-width: 960px;
      width: 100%;
    }
    header span {
      display: flex;
      align-items: center;
    }

    h1, h2, h3, h4 {
      margin: 0;
    }

    h1 {
      font-size: 24px;
    }

    .examples {
      padding-top: 3px;
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

    footer {
      padding
    }

    .branding {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      display: flex;
      padding: 24px 0;
      box-sizing: border-box;
      background: #bcb9c0;
    }

    .branding img {
      max-width: 640px;
    }
  `

  render() {
    return html`
    <header>
      <span>
      <h1>HNM</h1>
      <flex-one></flex-one>
      <custom-svg-icon icon="menu"></custom-svg-icon>
      </span>
    </header>
    <main>
      <section class="branding">
        <h4>HELLO NEW ME</h4>
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
      
      <section class="branding">
        <h4>LIFE ISN'T PERFECT</h4>
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
      
      
      <section class="branding">
        <h4>BUT HAIR CAN BE</h4>
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
    
    <footer>
      <flex-container>
        <a href="mail:info@hellonewme.be">info@hellonewme.be</a>
      </flex-container>
    </footer>
    `
    // <img src="./assets/banner.jpg">
  }
})