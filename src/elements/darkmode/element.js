import { html, css, LitElement } from 'lit'
import '../custom/toggle.js'
import '@material/mwc-switch'
export default customElements.define(
  'darkmode-element',
  class DarkmodeElement extends LitElement {
    static properties = {}

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
      document.dispatchEvent(
        new CustomEvent('theme-change', { detail: this.#toggleElement.selected ? 'dark' : 'light' })
      )
    }

    static styles = css`
      :host {
        display: flex;
        flex-direction: row;
        width: 100%;
        pointer-events: auto;
        box-sizing: border-box;
      }
    `

    render() {
      return html`
        <span>darkmode</span>
        <flex-it></flex-it>
        <mwc-switch slot="meta"></mwc-switch>
      `
    }
  }
)
