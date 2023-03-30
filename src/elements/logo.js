import { css, html, LitElement } from "lit";

export default customElements.define('app-logo', class AppLogo extends LitElement {
  constructor() {
    super()
  }

  static get properties() {
    return {
      logo: { type: String },
    };
  }

  static styles = css`
    :host {
      display: flex;
    }
  `

  render() {
    return html`
      <img src=${this.logo}></img>
    `;
  }
})