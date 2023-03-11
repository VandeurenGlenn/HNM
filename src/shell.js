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
      padding: 6px 24px;
      // background: #beb9c0;
    }

    main {      
      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: center;
      padding: 12px 24px;
    }

    main, header {
      box-sizing: border-box;
    }

    header span, section {
      max-width: 640px;
      width: 100%;
    }
    header span {
      display: flex;
      align-items: center;
    }

    img {
      max-width: 640px;
      width: 100%;
    }

    h1 {
      margin: 0;
      font-size: 24px;
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
    <img src="./assets/banner.jpg">
    </main>
    
    `
    // <img src="./assets/banner.jpg">
  }
})