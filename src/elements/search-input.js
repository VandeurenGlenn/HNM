import {html, css, LitElement} from 'lit'
import {TextField} from '@material/mwc-textfield'
export default customElements.define('search-input', class SearchInput extends TextField {


  async connectedCallback() {
    super.connectedCallback();
    this.outlined = true
    this.iconTrailing = 'search'
    this.label = 'search'
    this.type = 'search'
    this.style.setProperty('--mdc-shape-small', '28px')

    const elemStyleSheets = this.shadowRoot.adoptedStyleSheets;

    const sheet = new CSSStyleSheet()
    sheet.replaceSync(`
      :host {
        max-width: 320px;
        width: 100%;
      }

      .mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__icon--trailing {
        color: var(--main-color);
      }
    `)
    
    this.shadowRoot.adoptedStyleSheets = [...elemStyleSheets, sheet];

    
  }
});