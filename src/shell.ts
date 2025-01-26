import { LitElement, html, css } from 'lit'
import style from './shell.css.js'
import '@vandeurenglenn/lite-elements/drawer-layout.js'
import '@vandeurenglenn/lite-elements/pages.js'
import '@vandeurenglenn/lite-elements/theme.js'
import '@vandeurenglenn/lite-elements/selector.js'
import '@vandeurenglenn/flex-elements/row.js'
import '@vandeurenglenn/flex-elements/it.js'
import '@vandeurenglenn/lite-elements/banner.js'
import '@vandeurenglenn/lite-elements/notification.js'
import '@vandeurenglenn/lite-elements/divider.js'
import './elements/promo-hero.js'
import './elements/darkmode/element.js'
import '@material/web/fab/branded-fab.js'
import { query, LiteElement, property } from '@vandeurenglenn/lite'
import icons from './icons.js'
import './elements/shop/cart.js'
import { CustomNotification } from '@vandeurenglenn/lite-elements/notification.js'
import firebase, { get, off, set } from './firebase.js'
import { setupTranslations, translate } from '@lit-shop/translate'
import { PromoHero } from './elements/promo-hero.js'
import { ref } from 'firebase/database'
import { ShopCart } from './elements/shop/cart.js'
import Router from './router.js'

export default customElements.define(
  'app-shell',
  class AppShell extends LiteElement {
    #propertyProviders = []
    checkingOut = false

    @query('custom-drawer-layout')
    accessor #drawerLayout

    @query('custom-pages')
    accessor #pages

    @query('custom-selector')
    accessor #selector

    @property({ reflect: true, type: Boolean, consumes: 'darkMode', attribute: 'dark-mode' }) accessor darkMode

    @property({ type: Object, provides: true }) accessor user

    @property({ type: Object, provides: true }) accessor userInfo

    @property({ type: Object, provides: true }) accessor orders
    @property({ type: Object, provides: true }) accessor products
    @property({ type: Object, provides: true, batchDelay: 200 }) accessor product

    @property({ type: Object, provides: true }) accessor cartItems

    @property({ reflect: true, attribute: 'menu-shown', type: Boolean })
    accessor menuShown

    @property({ reflect: true, attribute: 'is-mobile', provides: true, type: Boolean })
    accessor isMobile

    @property({ type: Boolean }) accessor bannerShown = true

    async firstRender() {
      if (navigator.language !== 'en') {
        try {
          await setupTranslations(navigator.language)
        } catch (error) {
          console.warn('Could not load translations', error)
        }
      }

      firebase.auth.onAuthStateChanged(async (user) => {
        if (user) {
          this.user = user
          console.log('User is signed in')

          const snap = await get(`users/${user.uid}`)
          console.log('snap', snap)

          if (!snap) {
            location.hash = '#!/account'
            return
          } else if (location.hash === '#!/login') {
            if (this.checkingOut) {
              this.checkingOut = false
              location.hash = '#!/checkout'
            } else location.hash = '#!/shop'
          }
          this.propertyProviders['userInfo'] = [{ name: 'userInfo', type: 'object', ref: `users/${user.uid}` }]
          this.propertyProviders['cartItems'] = [{ name: 'cartItems', type: 'object', ref: `carts/${user.uid}` }]
          this.handlePropertyProvider(`userInfo`)
          this.handlePropertyProvider(`cartItems`)
        } else {
          this.user = undefined
          this.userInfo = undefined
          this.cartItems = undefined

          this.removePropertyProvider('userInfo')
          const hero = document.createElement('promo-hero') as PromoHero
          document.body.appendChild(hero)
          requestAnimationFrame(() => (hero.open = true))

          console.log('User is signed out')
        }

        document.addEventListener('add-to-cart', (event) => {
          const cart = document.querySelector('app-shell').shadowRoot.querySelector('shop-cart') as ShopCart
          console.log('add to cart', event.detail)

          cart.addItem(event.detail)
        })
      })

      globalThis.onhashchange = this.#hashchange.bind(this)
      let media = matchMedia('(min-width: 1200px)')
      const onMedia = ({ matches }) => {
        this.isMobile = !matches
      }

      if (!location.hash) location.hash = '#!/home'

      media.addEventListener('change', onMedia)
      onMedia(media)

      document.addEventListener('drawer-menu-click', () => (this.menuShown = !this.menuShown))
      this.#hashchange()
      this.shadowRoot.addEventListener('click', (event) => {
        const target = event.target as HTMLElement
        if (target.tagName === 'CUSTOM-BUTTON' && target.label === 'logout') {
          firebase.auth.signOut()
          if (this.#selector.selected === 'account') location.hash = '#!/login'
        } else if (target.tagName === 'CUSTOM-BUTTON' && target.label === 'login') {
          if (this.#pages.selected === 'checkout') this.checkingOut = true
          location.hash = '#!/login'
        }
      })
    }

    notifyServiceWorkerUpdate() {
      // if ('serviceWorker' in navigator) {
      //   navigator.serviceWorker.controller?.postMessage({ type: 'SKIP_WAITING' })
      // }
      const notification = document.createElement('custom-notification') as CustomNotification
      notification.title = 'New version available'
      notification.message = 'click to refresh'
      notification.onclick = () => location.reload()
      document.body.appendChild(notification)
      console.log('New version available, click to refresh')
    }

    async #hashchange() {
      if (this.menuShown && this.isMobile) this.menuShown = false
      const parts = location.hash.split('?')

      this.#select(parts[0].split('#!/')[1], parts[1])
    }

    async #select(selected, query?) {
      !customElements.get(`${selected}-view`) && (await import(`./${selected}.js`))
      const params = new URLSearchParams(query).keys()

      this.handlePropertyProvider(`products`)
      if (selected === 'shop') {
        this.product = undefined
        for (const param of params) {
          const value = new URLSearchParams(query).get(param)
          this[param] = value
        }
      }

      if (selected === 'orders' && this.user) {
        this.propertyProviders['orders'] = [{ name: 'orders', type: 'object', ref: `orders/${this.user.uid}` }]
        this.handlePropertyProvider(`orders`)
      }
      requestAnimationFrame(async () => {
        this.#pages.select(selected)
        this.#selector.select(selected)
      })
    }

    async select(selected) {
      location.hash = `#!/${selected}`
    }

    static styles = [style]

    propertyProviders = {
      products: [{ name: 'products', type: 'object' }]
    }

    removePropertyProvider(propertyProvider) {
      if (this.#propertyProviders.includes(propertyProvider)) {
        this.#propertyProviders = this.#propertyProviders.filter((provider) => provider !== propertyProvider)
        off(propertyProvider, (e) => console.log('off', e))
        delete this[propertyProvider]
      }
    }

    setupPropertyProvider(
      propertyProvider,
      type = 'array',
      options: {
        events?: { onChildChanged?: (val) => {}; onChildRemoved?: (val) => {}; onChildAdded?: (val) => {} }
        ref?: string
      } = {}
    ) {
      return new Promise(async (resolve, reject) => {
        const { events } = options
        const ref = options.ref || propertyProvider

        this.#propertyProviders.push(propertyProvider)

        if (!this[propertyProvider]) this[propertyProvider] = type === 'object' ? {} : []

        const deleteOrReplace = async (propertyProvider, snap, task = 'replace') => {
          const val = await snap.val()
          if (type === 'array') {
            if (typeof val === 'object' && !Array.isArray(val)) val.key = snap.key
            let i = -1

            for (const item of this[propertyProvider]) {
              i += 1
              if (item.key === snap.key) break
            }

            if (task === 'replace') this[propertyProvider].splice(i, 1, val)
            else this[propertyProvider].splice(i, 1)
            this[propertyProvider] = [...this[propertyProvider]]
          } else if (type === 'object') {
            if (task === 'replace') this[propertyProvider][snap.key] = val
            else delete this[propertyProvider][snap.key]
            this[propertyProvider] = { ...this[propertyProvider] }
          }

          if (task === 'replace') events?.onChildChanged?.(val)
          else events?.onChildRemoved?.(val)
        }

        firebase.onChildAdded(ref, async (snap) => {
          const val = await snap.val()

          if (type === 'array') {
            if (typeof val === 'object' && !Array.isArray(val)) val.key = snap.key
            if (!this[propertyProvider]) {
              this[propertyProvider] = [val]
            } else if (!this[propertyProvider].includes(val)) {
              this[propertyProvider].push(val)
            }
            this[propertyProvider] = [...this[propertyProvider]]
          } else if (type === 'object') {
            if (!this[propertyProvider]) this[propertyProvider] = {}
            this[propertyProvider][snap.key] = val
            this[propertyProvider] = { ...this[propertyProvider] }
          }
          events?.onChildAdded?.(val)
          resolve(this[propertyProvider])
        })

        setTimeout(async () => {
          resolve(true)
        }, 1000)

        firebase.onChildChanged(ref, (snap) => deleteOrReplace(propertyProvider, snap, 'replace'))
        firebase.onChildRemoved(ref, (snap) => deleteOrReplace(propertyProvider, snap, 'delete'))
      })
    }

    handlePropertyProvider(propertyProvider) {
      if (this.propertyProviders[propertyProvider]) {
        for (const input of this.propertyProviders[propertyProvider]) {
          let propertyKey
          if (typeof input === 'object') propertyKey = input.name
          else propertyKey = input

          if (!this.#propertyProviders.includes(propertyKey))
            return this.setupPropertyProvider(propertyKey, input?.type, { events: input?.events, ref: input?.ref })
        }
      }
    }

    render() {
      return html`
        <link
          rel="preload"
          href="./assets/banner-dark.svg"
          as="image" />

        ${icons}

        <custom-theme
          load-symbols="false"
          load-font="false"></custom-theme>

        <span
          class="backdrop"
          @click="${() => (this.#drawerLayout.drawerOpen = false)}"></span>

        <custom-banner ?shown=${this.bannerShown === true}
          >${translate(
            'We are still under construction, feel free to look around but no orders will be accepted yet. Thank you for your understanding, we will let you know when we are ready!'
          )}

          <custom-icon-button
            icon="close"
            slot="actions"
            @click=${() => (this.bannerShown = false)}></custom-icon-button>
        </custom-banner>

        <custom-drawer-layout .drawer-open=${this.menuShown}>
          <flex-row slot="top-app-bar-end">
            <custom-button .label=${this.user ? 'logout' : 'login'}></custom-button>
            <shop-cart></shop-cart>
          </flex-row>

          <flex-container slot="drawer-content">
            ${this.user
              ? html`
                  <flex-column
                    class="user-info"
                    center>
                    ${this.user?.photoURL
                      ? html`<img
                          src=${this.user.photoURL}
                          class="avatar" />`
                      : ''}
                    <h3>Hello New ${this.userInfo?.firstName}</h3>
                  </flex-column>
                `
              : html` <span style="display:block;">
                  <img
                    alt="logo"
                    loading="lazy"
                    src=${this.darkMode ? './assets/sciccors-dark.svg' : './assets/sciccors.svg'}
                /></span>`}

            <custom-selector
              attr-for-selected="data-route"
              @selected=${({ detail }) => this.select(detail)}>
              ${this.user
                ? html`
                    <custom-drawer-item data-route="orders">
                      ${translate('my orders')}
                      <flex-it></flex-it>
                      <custom-icon icon="orders"></custom-icon>
                    </custom-drawer-item>
                    <custom-drawer-item data-route="account">
                      ${translate('profile')}
                      <flex-it></flex-it>
                      <custom-icon icon="account_circle"></custom-icon>
                    </custom-drawer-item>

                    <custom-divider></custom-divider>
                  `
                : ''}
              <custom-drawer-item data-route="home">
                ${translate('home')}
                <flex-it></flex-it>
                <custom-icon icon="home"></custom-icon>
              </custom-drawer-item>

              <custom-drawer-item data-route="shop">
                ${translate('shop')}
                <flex-it></flex-it>
                <custom-icon icon="shopping_basket"></custom-icon>
              </custom-drawer-item>

              <custom-drawer-item data-route="giftcards">
                ${translate('giftcards')}
                <flex-it></flex-it>
                <custom-icon icon="redeem"></custom-icon>
              </custom-drawer-item>

              <custom-drawer-item data-route="who-we-are">
                ${translate('who we are')}
                <flex-it></flex-it>
                <custom-icon icon="groups"></custom-icon>
              </custom-drawer-item>
            </custom-selector>
          </flex-container>

          <darkmode-element slot="drawer-footer"></darkmode-element>

          <md-branded-fab
            branded-fab
            extended
            label="gratis advies"
            name="advies"
            class="fab">
            <md-icon slot="icon">contact_support</md-icon>
          </md-branded-fab>
          <main slot="content">
            <custom-pages attr-for-selected="data-route">
              <login-view data-route="login"></login-view>
              <home-view data-route="home"></home-view>
              <shop-view data-route="shop"></shop-view>
              <before-checkout-view data-route="before-checkout"></before-checkout-view>
              <checkout-view data-route="checkout"></checkout-view>
              <giftcards-view data-route="giftcards"></giftcards-view>
              <who-we-are-view data-route="who-we-are"></who-we-are-view>
              <account-view data-route="account"></account-view>
              <orders-view data-route="orders"></orders-view>
            </custom-pages>
          </main>
        </custom-drawer-layout>
      `
      // <img src="./assets/banner.jpg">
    }
  }
)
