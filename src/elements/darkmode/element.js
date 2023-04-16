import {html, css, LitElement} from 'lit'
import '../custom/toggle.js'
import '@material/mwc-switch'
export default customElements.define('darkmode-element', class DarkmodeElement extends LitElement {
  static properties = {
  
  }

  constructor() {
    super()

    this.addEventListener('click', this.#click.bind(this))
  }

  async connectedCallback() {
    super.connectedCallback()
    await this.updateComplete
    this.selected = localStorage.getItem('selected-theme') === 'dark' ? true : false
    this.#toggleElement.selected = this.selected
    this.#toggleElement.addEventListener('click', this.#click.bind(this))
  }

  get #toggleElement() {
    return this.renderRoot.querySelector('mwc-switch')
  }
 
  #click() {
    globalThis.setTheme(this.#toggleElement.selected ? 'dark' : 'light')
  }

  static styles = css`
    :host {
      display: inline-flex;
      width: 100%;
      max-width: 320px;
      pointer-events: auto;
      box-sizing: border-box;
    }

    mwc-list-item {
      width: 100%;
      padding-right: 24px;
    }
  `

  render(){
    return html`
    <mwc-list-item hasMeta nonInteractive>
      <span>darkmode</span>
      <mwc-switch slot="meta"></mwc-switch>
    </mwc-list-item>
    `
  }
});