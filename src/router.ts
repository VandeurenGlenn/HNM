export default class Router {
  static routes = new Map([
    ['home', 'home'],
    ['shop', 'shop']
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
    requestAnimationFrame(async () => {
      !customElements.get(`${selected}-view`) && (await import(`./${selected}.js`))
      this.#pages.select(selected)
      this.#selector.select(selected)
    })
  }

  async select(selected) {
    location.hash = `#!/${selected}`
  }
}