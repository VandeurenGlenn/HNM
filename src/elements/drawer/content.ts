import { html, css, LiteElement, property, customElement } from '@vandeurenglenn/lite'
import '../darkmode/element.js'

@customElement('drawer-content')
export class DrawerContent extends LiteElement {
  @property({ type: Boolean }) accessor darkmode

  changeLogo(darkmode: boolean) {
    const logoElement = this.shadowRoot.querySelector(`img[alt="logo"]`) as HTMLImageElement
    if (darkmode) {
      logoElement.src = './assets/sciccors-dark.svg'
    } else {
      logoElement.src = './assets/sciccors.svg'
    }
  }

  onChange(propertyKey, value) {
    if (propertyKey === 'darkmode') {
      this.changeLogo(value)
    }
  }

  static styles = [
    css`
      :host {
        display: contents;
      }

      .drawer-constent {
        padding: 20px;
        box-sizing: border-box;
      }

      span.logo {
        width: 100%;
        transition: opacity 120ms ease-in;
        margin-bottom: 16px;
      }
    `
  ]

  render() {
    return html`
      <flex-container class="drawer-content">
        <span class="logo">
          <img
            alt="logo"
            loading="lazy"
            src="./assets/sciccors-dark.svg" />
        </span>

        <custom-selector
          attr-for-selected="data-route"
          @selected=${({ detail }) => `#!/${detail}`}>
          <custom-drawer-item data-route="home">
            home
            <flex-it></flex-it>
            <custom-icon icon="home"></custom-icon>
          </custom-drawer-item>

          <custom-drawer-item data-route="shop">
            shop
            <flex-it></flex-it>
            <custom-icon icon="shopping_basket"></custom-icon>
          </custom-drawer-item>

          <custom-drawer-item data-route="services">
            services
            <flex-it></flex-it>
            <custom-icon icon="linked_services"></custom-icon>
          </custom-drawer-item>

          <custom-drawer-item data-route="team">
            team
            <flex-it></flex-it>
            <custom-icon icon="groups"></custom-icon>
          </custom-drawer-item>
        </custom-selector>

        <flex-it></flex-it>
        <darkmode-element slot="drawer-footer"></darkmode-element>
      </flex-container>
    `
  }
}
