import {html, css, LitElement} from 'lit'
import {MdOutlinedTextField} from '@material/web/textfield/outlined-text-field.js'

export default customElements.define('search-input', class SearchInput extends MdOutlinedTextField {

  async connectedCallback() {
    super.connectedCallback();
    this.hasTrailingIcon = true
    this.innerHTML = `<md-icon slot="trailingicon">search</md-icon>`
    this.label = 'search'
    this.type = 'search'
    this.style.setProperty('--_container-shape', '28px')

    const elemStyleSheets = this.shadowRoot.adoptedStyleSheets;

    const sheet = new CSSStyleSheet()
    sheet.replaceSync(`
      :host {
        max-width: 320px;
        width: 100%;
      }
      ::slotted([slot="trailingicon"]) {
        cursor: pointer;
      }
    `)
    
    this.shadowRoot.adoptedStyleSheets = [...elemStyleSheets, sheet];
  }
});