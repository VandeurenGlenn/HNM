export default class Router {
  selected
  previousSelected

  static routes = new Map([
    ['home', 'home'],
    ['shop', 'shop'],
    ['giftcards', 'giftcards'],
    ['checkout', 'checkout'],
    ['login', 'login'],
    ['account', 'account'],
    ['who-we-are', 'who-we-are']
  ])

  constructor(host) {
    this.host = host
    this.currentRoute = ''
    this.currentElement = null
  }

  static bang(selected) {
    this.go(selected)
  }

  static go(selected) {
    if (this.routes.has(selected)) {
    } else {
      console.error(`Route ${selected} not found`)
    }
  }

  async #hashchange() {
    if (this.menuShown && this.isMobile) this.menuShown = false
    const parts = location.hash.split('#!/')

    await this.#select(parts[1])
    this.host.routeChanged(location.hash)
  }

  async #select(selected) {
    this.previousSelected = this.selected
    this.selected = selected
    !customElements.get(`${selected}-view`) && (await import(`./${selected}.js`))

    requestAnimationFrame(async () => {
      this.#pages.select(selected)
      this.#selector.select(selected)
    })
  }

  async select(selected) {
    location.hash = `#!/${selected}`
  }
}
