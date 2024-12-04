import { LiteElement, html, css, property } from '@vandeurenglenn/lite'
import { map } from 'lit/directives/map.js'
import '../elements/search-input.js'
import '../elements/shop-item.js'
import '@material/web/iconbutton/icon-button.js'
import '@material/web/icon/icon.js'

import '@vandeurenglenn/flex-elements/it.js'
import '@vandeurenglenn/flex-elements/wrap-evenly.js'
import { scrollbar } from '../mixins/styles.js'
import { ShopItem } from '../elements/shop-item.js'
import { ShopCart } from '../elements/shop/cart.js'

export default customElements.define(
  'shop-view',
  class ShopView extends LiteElement {
    @property({ type: Array })
    accessor items

    async connectedCallback() {
      document.addEventListener('theme-change', this.#darkmode.bind(this))
      this.#darkmode({
        detail: localStorage.getItem('selected-theme') || 'light'
      })
      this.shadowRoot.addEventListener('click', (event: Event) => {
        const target = event.target as ShopItem
        console.log()
        const button = event.composedPath()[0] as HTMLElement
        console.log(button.dataset?.dataAction)

        if (target.tagName === 'SHOP-ITEM' && button.dataset?.action === 'add-to-cart') {
          console.log('add to cart')

          const cart = document.querySelector('app-shell').shadowRoot.querySelector('shop-cart') as ShopCart

          cart.addItem({
            sku: target.sku,
            name: target.name,
            price: target.price,
            amount: target.amount
          })
        }
      })
      this.items = [
        {
          sku: '1',
          name: 'some shop item name',
          image: './assets/example2.webp',
          price: '100 eur'
        },
        {
          sku: '2',
          name: 'some shop item name',
          image: './assets/example2.webp',
          price: '100 eur'
        },
        {
          sku: '3',
          name: 'some shop item name',
          image: './assets/example2.webp',
          price: '100 eur'
        },
        {
          sku: '4',
          name: 'some shop item name',
          image: './assets/example2.webp',
          price: '100 eur'
        },
        {
          sku: '5',
          name: 'some shop item name',
          image: './assets/example2.webp',
          price: '100 eur'
        },
        {
          sku: '6',
          name: 'some shop item name',
          image: './assets/example2.webp',
          price: '100 eur'
        },
        {
          sku: '7',
          name: 'some shop item name',
          image: './assets/example2.webp',
          price: '100 eur'
        },
        {
          sku: '8',
          name: 'some shop item name',
          image: './assets/example2.webp',
          price: '100 eur'
        },
        {
          sku: '9',
          name: 'some shop item name',
          image: './assets/example2.webp',
          price: '100 eur'
        }
      ]
    }

    #darkmode({ detail }) {
      // if (detail === 'dark') {
      //   this.renderRoot.querySelector(`img[alt="logo"]`).src = './assets/sciccors-dark.svg'
      // } else {
      //   this.renderRoot.querySelector(`img[alt="logo"]`).src = './assets/sciccors.svg'
      // }
    }

    static styles = [
      css`
        * {
          pointer-events: scroll;
        }
        :host {
          display: flex;
          flex-direction: column;
          width: 100%;
          align-items: center;
          padding: 12px;
          box-sizing: border-box;
        }

        header {
          display: flex;
          width: 100%;
          justify-content: center;
          align-items: center;
          padding: 12px;
          box-sizing: border-box;
        }

        main {
          display: flex;
          flex-direction: column;
          width: 100%;
          align-items: center;
          padding: 6px 12px;
        }

        main,
        header {
          box-sizing: border-box;
        }

        header,
        section,
        img {
          max-width: 960px;
          width: 100%;
        }
        header span {
          display: flex;
          align-items: center;
        }

        h1 {
          margin: 0;
          font-size: 24px;
        }

        .examples {
          display: flex;
          flex-direction: column;
        }

        .examples .left,
        .examples .right {
          width: calc(100% / 2);
        }

        .left {
          padding-right: 3px;
        }

        .right {
          padding-left: 3px;
        }

        .left img,
        .right img {
          padding-top: 3px;
        }

        main,
        header {
          box-sizing: border-box;
        }

        header span,
        section,
        img {
          max-width: 960px;
          width: 100%;
        }
        header span {
          display: flex;
          align-items: flex-end;
        }

        header.small {
          position: sticky;
          padding: 12px;
          min-height: 76px;
          max-height: 76px;
          height: 100%;
          box-sizing: border-box;
          z-index: 100;
          will-change: margin;
        }

        image {
          will-change: padding;
        }

        header.small img {
          width: 54px;
          transition: opacity ease-out 60ms;
        }

        :host([condensed]) header.small {
          top: 0;
          background: var(--main-background-color);
          position: sticky;
        }

        .examples {
          box-sizing: border-box;
          max-width: calc(100% / 2 - 2px);
        }

        .example1 {
          max-height: 220px;
        }

        .example1,
        .example2 {
          will-change: padding;
          padding-top: 4px;
        }

        .filler {
          display: flex;
          width: 32px;
        }

        flex-wrap-evenly {
          gap: 12px;
          max-width: 960px;
          width: 100%;
          overflow-y: auto;
        }

        shop-item {
          width: 300px;
          height: 300px;

          margin-bottom: 12px;
        }

        ${scrollbar}
      `
    ]

    render() {
      return html`
        <header class="small">
          <search-input></search-input>
        </header>
        <flex-wrap-evenly>
          ${map(
            this.items,
            (item) => html`
              <shop-item
                .sku=${item.sku}
                .image=${item.image}
                .name=${item.name}
                .price=${item.price}>
              </shop-item>
            `
          )}
        </flex-wrap-evenly>
      `
      // <img alt="banner" loading="lazy" src="./assets/banner.webp">
    }
  }
)
