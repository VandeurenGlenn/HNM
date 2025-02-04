import { LiteElement, html, css, property } from '@vandeurenglenn/lite'
import { map } from 'lit/directives/map.js'
import '../elements/search-input.js'
import '../elements/shop/shop-item.js'
import '@material/web/iconbutton/icon-button.js'
import '@material/web/icon/icon.js'

import '@vandeurenglenn/flex-elements/it.js'
import '@vandeurenglenn/flex-elements/wrap-evenly.js'
import { scrollbar } from '../mixins/styles.js'
import { ShopItem } from '../elements/shop/shop-item.js'
import { ShopCart } from '../elements/shop/cart.js'
import './../elements/footer/footer-element.js'
import './../elements/shop/product.js'
import '@vandeurenglenn/flex-elements/container.js'

export default customElements.define(
  'shop-view',
  class ShopView extends LiteElement {
    @property({ type: Object, consumes: true }) accessor products

    @property({ type: String, consumes: 'product' }) accessor selectedProduct

    @property({ type: Boolean, consumes: true, attribute: 'is-mobile' }) accessor isMobile

    async connectedCallback() {
      document.addEventListener('theme-change', this.#darkmode.bind(this))
      this.#darkmode({
        detail: localStorage.getItem('selected-theme') || 'light'
      })
      this.shadowRoot.addEventListener('click', (event: Event) => {
        const target = event.target as ShopItem
        const button = event.composedPath()[0] as HTMLElement
        console.log(button.dataset?.dataAction)

        if (target.tagName === 'SHOP-ITEM' && button.dataset?.action === 'add-to-cart') {
          event.stopImmediatePropagation()
          event.preventDefault()
          event.stopPropagation()
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

          overflow-y: auto;
          box-sizing: border-box;
        }
        flex-wrap-evenly {
          gap: 12px;
          max-width: 960px;
          width: 100%;
          box-sizing: border-box;

          padding: 12px;
        }

        shop-item {
          margin-bottom: 12px;
        }

        :host([is-mobile]) flex-wrap-evenly {
          padding: 0;
          gap: 2px;
        }

        ${scrollbar}
      `
    ]

    render() {
      if (!this.products || Object.keys(this.products).length === 0) {
        return html` <h1>Loading...</h1> `
      }
      if (this.selectedProduct) {
        return html`
          <shop-product
            .product=${this.products[this.selectedProduct]}
            .key=${this.selectedProduct}>
          </shop-product>
        `
      }
      return html`
        <flex-wrap-evenly>
          ${this.products
            ? map(
                Object.entries(this.products),
                ([key, item]) =>
                  html`
                    <shop-item
                      .product=${item}
                      .key=${key}>
                    </shop-item>
                  `
              )
            : 'Loading...'}
        </flex-wrap-evenly>
        <footer-element></footer-element>
      `
    }
  }
)
