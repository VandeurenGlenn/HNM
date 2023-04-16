import {html, css, LitElement} from 'lit'
import {IconButton} from '@material/mwc-icon-button'
export default customElements.define('drawer-menu-button', class DrawerMenuButton extends IconButton {


  async connectedCallback() {
    super.connectedCallback();
    
    
    document.addEventListener('layout-change', this.#layoutChange.bind(this)) 
    this.icon = 'menu'
    this.onclick = () => document.dispatchEvent(new CustomEvent('drawer-menu-click'))
    if (!this.isMobile) this.hide()
  }

  get isMobile() {
    return document.querySelector('app-shell').isMobile
  }

  show() {
    this.style = 'opacity: 1; pointer-events: auto;'
  }

  hide() {
    this.style = 'opacity: 0; pointer-events: none;'
  }

  #layoutChange() {
    if (this.isMobile) this.show()
    else this.hide()
  }
});