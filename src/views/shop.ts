import { LiteElement, html, css, property } from '@vandeurenglenn/lite';
import { map } from 'lit/directives/map.js';
import '../elements/search-input.js';
import '../elements/shop-item.js';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/icon/icon.js';

import '@vandeurenglenn/flex-elements/it.js';
import '@vandeurenglenn/flex-elements/wrap-evenly.js';

export default customElements.define(
  'shop-view',
  class ShopView extends LiteElement {
    @property({ type: Array })
    accessor items;

    async connectedCallback() {
      document.addEventListener('theme-change', this.#darkmode.bind(this));
      this.#darkmode({
        detail: localStorage.getItem('selected-theme') || 'light',
      });
      this.items = [
        {
          name: 'some shop item name',
          image: './assets/example2.webp',
          price: '100 eur',
        },
        {
          name: 'some shop item name',
          image: './assets/example2.webp',
          price: '100 eur',
        },
        {
          name: 'some shop item name',
          image: './assets/example2.webp',
          price: '100 eur',
        },
        {
          name: 'some shop item name',
          image: './assets/example2.webp',
          price: '100 eur',
        },
        {
          name: 'some shop item name',
          image: './assets/example2.webp',
          price: '100 eur',
        },
        {
          name: 'some shop item name',
          image: './assets/example2.webp',
          price: '100 eur',
        },
        {
          name: 'some shop item name',
          image: './assets/example2.webp',
          price: '100 eur',
        },
        {
          name: 'some shop item name',
          image: './assets/example2.webp',
          price: '100 eur',
        },
        {
          name: 'some shop item name',
          image: './assets/example2.webp',
          price: '100 eur',
        },
      ];
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
      `,
    ];

    render() {
      return html`
    
    

      <header class="small">        
        <flex-it></flex-it>
        <!-- <md-filled-button label="SHOP"></md-filled-button>-->
        <md-icon-button>
          <md-icon>shopping_cart</md-icon>
        </md-icon-button>
        </span>
      </header>
        <flex-wrap-evenly>
          ${map(
            this.items,
            (item) => html`
              <shop-item
                .image=${item.image}
                .name=${item.name}
                .price=${item.price}
              >
              </shop-item>
            `
          )}
          
        
        </flex-wrap-evenly>
       
        <search-input></search-input>
       
    `;
      // <img alt="banner" loading="lazy" src="./assets/banner.webp">
    }
  }
);
