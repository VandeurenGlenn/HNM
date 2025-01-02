import { LiteElement, html, css, customElement, property } from '@vandeurenglenn/lite'

@customElement('small-header')
export class SmallHeader extends LiteElement {
  @property({ type: Boolean, consumes: 'darkMode' }) accessor darkMode

  static styles = [
    css`
      :host {
        position: sticky;
        padding: 12px;
        min-height: 76px;
        max-height: 76px;
        height: 100%;
        box-sizing: border-box;

        will-change: margin;

        display: flex;
        justify-content: center;
        align-items: center;
      }

      img {
        width: 54px;
      }
    `
  ]

  onChange(propertyKey: string, value: any): void {
    if (propertyKey === 'darkMode') {
      console.log('darkMode changed', value)
    }
  }
  render() {
    return html`
      <img
        alt="logo"
        loading="lazy"
        src=${this.darkMode ? './assets/sciccors-dark.svg' : './assets/sciccors.svg'} />
    `
  }
}
