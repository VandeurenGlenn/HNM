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
import './elements/promo-hero.js'
import './elements/darkmode/element.js'
import '@material/web/fab/branded-fab.js'
import { query, LiteElement, property } from '@vandeurenglenn/lite'
import icons from './icons.js'
import './elements/shop/cart.js'
import { CustomNotification } from '@vandeurenglenn/lite-elements/notification.js'
import firebase, { get, set } from './firebase.js'
import { setupTranslations, translate } from '@lit-shop/translate'

export default customElements.define(
  'app-shell',
  class AppShell extends LiteElement {
    @query('custom-drawer-layout')
    accessor #drawerLayout

    @query('custom-pages')
    accessor #pages

    @query('custom-selector')
    accessor #selector

    @property({ reflect: true, type: Boolean, consumes: 'darkMode', attribute: 'dark-mode' }) accessor darkMode

    @property({ type: Object, provides: true }) accessor user

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
          this.shadowRoot.querySelector('custom-button[label="login"]').label = 'logout'
          this.user = user
          console.log('User is signed in')

          const snap = await get(`users/${user.uid}`)
          if (!snap || !snap.exists) {
            await set(`users/${user.uid}`, {
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL
            })

            console.log('User added to database')
            location.hash = '#!/account'
          } else if (location.hash === '#!/login') location.hash = '#!/home'
        } else {
          this.user = undefined
          this.shadowRoot.querySelector('custom-button[label="logout"]').label = 'login'
          console.log('User is signed out')
        }
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
      const parts = location.hash.split('#!/')
      this.#select(parts[1])
    }

    async #select(selected) {
      requestAnimationFrame(async () => {
        !customElements.get(`${selected}-view`) && (await import(`./${selected}.js`))
        this.#pages.select(selected)
        this.#selector.select(selected)
      })
    }

    async select(selected) {
      location.hash = `#!/${selected}`
    }

    static styles = [style]

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
            <custom-button label="login"></custom-button>
            <shop-cart></shop-cart>
          </flex-row>

          <flex-container slot="drawer-content">
            <span style="display:block;">
              <img
                alt="logo"
                loading="lazy"
                src=${this.darkMode ? './assets/sciccors-dark.svg' : './assets/sciccors.svg'}
            /></span>

            <custom-selector
              attr-for-selected="data-route"
              @selected=${({ detail }) => this.select(detail)}>
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
              <giftcards-view data-route="giftcards"></giftcards-view>
              <who-we-are-view data-route="who-we-are"></who-we-are-view>
              <account-view data-route="account"></account-view>
            </custom-pages>
          </main>
        </custom-drawer-layout>

        <promo-hero></promo-hero>
      `
      // <img src="./assets/banner.jpg">
    }
  }
)
