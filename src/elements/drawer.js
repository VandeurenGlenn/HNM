import {html, css, LitElement} from 'lit'
import './darkmode/element.js'

export default customElements.define('drawer-element', class DrawerElement extends LitElement {
  static properties = {
    shown: { type: Boolean, reflect: true }
  }

  #shown = false

  constructor() {
    super()
  }

  set shown(value) {
    if (this.#shown !== value) {
      this.#shown = value
      if (value) this.setAttribute('shown', '')
      else this.removeAttribute('shown')
      if (value !== undefined) document.dispatchEvent(new CustomEvent('menu-shown', { detail: value }))
    }
    
  }

  get shown() {
    return this.#shown
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      position: absolute;

      top: 0;
      bottom: 0;
      right: 0;

      box-sizing: border-box;
      z-index: 10001;
      padding: 24px;

      background: var(--main-background-color);
      color: var(--main-color);
      --svg-icon-color: var(--main-color);
      opacity: 0;
      border-top-left-radius: 24px;
      border-bottom-left-radius: 24px;

      width: 320px;
      pointer-events: none;
      transform: translateY(110%);
      transition: transform ease-out 160ms, opacity ease-out 160ms;
    }

    :host([shown]) {
      opacity: 1;
      pointer-events: auto;
      transition: transform ease-in 120ms, opacity ease-in 60ms;
      transform-origin: top;
      transform: translate(0, 0);
    }

    button-element, darkmode-element {
      pointer-events: auto;
    }

    h3 {
      margin: 0;
    }

    [center] {
      align-items: center;
    }

    [center-center] {
      align-items: center;
      justify-content: center;
    }
    .line {
      display: block;
      height: 1px;
      width: 100%;
      background: var(--main-color);
      margin-top: 12px;
      margin-bottom: 12px;
    }
    flex-container {
      direction: rtl;
      min-width: auto;
    }

    a {
      text-decoration: none;
      font-weight: 500;
      color: var(--main-color);
      padding: 6px 0;
      text-transform: uppercase;
    }
  `

  render(){
    return html`
      <md-elevation shadow></md-elevation>
      <flex-row center>
        <h3>menu</h3>
        <flex-one></flex-one>
        <button-element icon @click="${() => this.shown = false}">
          <custom-svg-icon icon="close" ></custom-svg-icon>
        </button-element>
      </flex-row>
      <span class="line"></span>
      <flex-container>
        <a @click="${() => this.shown = false}" href="#!/services">services</a>
        <a @click="${() => this.shown = false}" href="#!/team">team</a>
        <a @click="${() => this.shown = false}" href="#!/home">home</a>
      </flex-container>
      <flex-one></flex-one>
      <flex-row style="padding-bottom: 64px;">
        <darkmode-element></darkmode-element>
      </flex-row>
    `
  }
});