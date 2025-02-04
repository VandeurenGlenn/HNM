import { css, html, LiteElement, customElement, property } from '@vandeurenglenn/lite'

@customElement('zooming-image')
export class ZoomingImage extends LiteElement {
  @property({ type: String }) accessor src
  @property({ type: String }) accessor alt

  static styles = [
    css`
      :host {
        display: block;
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
      }
      img {
        width: 100%;
        height: 100%;

        transition: transform 0.5s ease-in-out;
        animation: zoomMove 20s infinite;
      }
      @keyframes zoomMove {
        0% {
          transform: scale(1) translateX(0);
        }
        33% {
          transform: scale(2) translateX(-25%);
        }
        66% {
          transform: scale(2) translateX(25%);
        }
        100% {
          transform: scale(1) translateX(0);
        }
      }
    `
  ]
  render() {
    return html`
      <img
        alt=${this.alt}
        loading="lazy"
        src=${this.src} />
    `
  }
}
