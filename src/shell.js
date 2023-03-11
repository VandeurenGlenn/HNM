import {LitElement, html, css} from 'lit'
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
    }

    header {
      display: flex;
      width: 100%;
      background: #beb9c0;
    }

    img {
      height: 172px;
    }
  `

  render() {
    return html`
    <header>
    <img src="./assets/banner.jpg">
    </header>
    `
  }
})