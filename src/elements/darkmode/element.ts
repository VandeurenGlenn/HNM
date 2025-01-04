import { html, css, LiteElement, property, customElement } from '@vandeurenglenn/lite'
import '@material/mwc-switch'

@customElement('darkmode-element')
export class DarkmodeElement extends LiteElement {
  @property({ type: Boolean, provides: 'darkMode' }) accessor darkMode = false

  firstRender() {
    this.darkMode = localStorage.getItem('selected-theme') === 'dark' ? true : false
    console.log('selected', this.darkMode)

    this.#toggleElement.selected = this.darkMode
    this.#toggleElement.addEventListener('click', this.#click.bind(this))
  }

  get #toggleElement() {
    return this.shadowRoot.querySelector('mwc-switch')
  }

  #click() {
    globalThis.setTheme(this.#toggleElement.selected ? 'dark' : 'light')
    this.darkMode = this.#toggleElement.selected
    document.dispatchEvent(new CustomEvent('theme-change', { detail: this.#toggleElement.selected ? 'dark' : 'light' }))
  }

  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: row;
        width: 100%;
        pointer-events: auto;
        box-sizing: border-box;
      }
    `
  ]

  render() {
    return html`
      <span>darkmode</span>
      <flex-it></flex-it>
      <mwc-switch slot="meta"></mwc-switch>
    `
  }
}
