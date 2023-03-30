import 'custom-pages'
import { css, html, LitElement } from 'lit'
import { map } from 'lit/directives/map.js'

export default customElements.define('custom-carousel', class CustomCarousel extends LitElement {
  #next = 0;
  #current = 0;
  #timeout;
  #running = false;

  static get properties() {
    return {
      timeout: { type: Number },
      images: { type: Array },
    };
  }
  constructor() {
    super()
    this.timeout = 7000
  }

  set images(value) {
    if (value) {
      if (!this.#running) this.#run()  
    }
    this._images = value
    this.maxIndex = value.length - 1
  }

  get images() {
    return this._images
  }

  get #pages() {
    return this.renderRoot.querySelector('custom-pages')
  }


  async #run() {
    await this.updateComplete
    // await this.requestUpdate()
    this.#running = true
      if (!this.#pages.selected) this.#pages.select('0')
      else if (!this.#pages.selected.dataset && Number(this.#pages.selected )< this.maxIndex)  this.#pages.next()
      else if (String(this.maxIndex) === this.#pages.selected?.dataset.index) this.#pages.select('0')
      else this.#pages?.next()
    this.#timeout = setTimeout(() => {
      
      this.#run()
    }, this.timeout);
  }

  static get properties() {
    return {
      controls: { type: Boolean },
      images: { type: Array, render: false },
      timeout: { type: Number, render: false }
    };
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }

    img {
      object-fit: cover;
      max-width: 1200px;
      width: 100%;
    }

    custom-pages {
      height: 100%;
    width: 100%;
    display: contents;
    }

    .animate-up {
      transform: translateX(-120%);
    }

    .animate-down {
      transform: translateX(120%);
    }

    .custom-selected {
      transform: translateX(0)
    }

  `

  #controlsTemplate() {
    return html`
    <flex-row>
      <custom-svg-icon icon="chevron-left"></custom-svg-icon>
      <flex-one></flex-one>
      <custom-svg-icon icon="chevron-right"></custom-svg-icon>
    </flex-row>
    `
  }

  render() {
    const controlsTemplate = this.controls ? this.#controlsTemplate : ''
    return html`
    <custom-pages default-selected="0" attr-for-selected="data-index">
      ${this.images ? map(this.images, (img, i) => html`
        <img data-index=${i} src=${img}></img>
      `) : ''}
    </custom-pages>
    ${controlsTemplate}
    `
  }
})