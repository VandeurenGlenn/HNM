import {html, css, LitElement} from 'lit'
export default customElements.define('button-element', class ButtonElement extends LitElement {
  static properties = {
    label: { type: String },
    name: { type: String }
  }

  constructor() {
    super()
  }

  static styles = css`
  :host {
    display: inline-flex;
    position: relative;
    pointer-events: auto;
    box-sizing: border-box;
    cursor: pointer;
  }
  
  button {
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    display: flex;
    border: none;
    box-sizing: border-box;
    border-radius: 12px;
    background: var(--button-background, #364857);
    color: #eee;
    padding: 12px 24px;
    --md-elevation-level: 1;
    cursor: pointer;
  }

  :host([round]) {
    height: 44px;
    width: 44px;
    
  }

  :host([round]) button {
    padding: 6px 12px;
  }

  :host([fab]) {
    z-index: 10001;
    position: absolute;
    right: 24px;
    bottom: 24px;
  }

  :host([icon]) button {
    padding: 0;
    height: 32px;
    width: 32px;
    background: transparent;
    padding: 3px;
  }
  md-elevation, md-ripple {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    
    --md-elevation-level: 2;
  }
  `

  render(){
    return html`
    <button extended label="${this.label}" name="${this.name}">
      <md-elevation shadow></md-elevation>
      <md-ripple></md-ripple>
      <slot></slot>
    </button>
    `
  }
});