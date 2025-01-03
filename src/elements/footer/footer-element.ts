import { html, css, LiteElement, customElement, property } from '@vandeurenglenn/lite'

@customElement('footer-element')
export class FooterElement extends LiteElement {
  @property({ type: Boolean, consumes: 'darkMode' }) accessor darkMode
  static styles = [
    css`
      :host {
        display: flex;
        justify-content: center;
        padding: 40px 20px;
        background-color: var(--color-primary);
        color: var(--color-on-primary);
        text-align: center;
      }
      .footer-content {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .logo {
        width: 150px;
        margin-bottom: 20px;
      }
      .links,
      .social,
      .info {
        margin: 20px 0;
      }
      .links a,
      .social a {
        color: var(--color-on-primary);
        text-decoration: none;
        margin: 0 10px;
        font-weight: bold;
      }
      .links a:hover,
      .social a:hover {
        text-decoration: underline;
      }
      .info p {
        margin: 5px 0;
      }
      .social p {
        margin-bottom: 10px;
      }
      .footer-bottom {
        margin-top: 20px;
        font-size: 0.9em;
        color: var(--color-on-primary-light);
      }
    `
  ]
  render() {
    return html`
      <div class="footer-content">
        <img
          src=${this.darkMode ? './assets/banner-dark.svg' : './assets/banner.svg'}
          alt="HNM Logo"
          class="logo" />
        <div class="links">
          <a href="/about">About Us</a> | <a href="/contact">Contact</a> |
          <a href="/privacy">Privacy Policy</a>
        </div>
        <div class="social">
          <p>Follow us on:</p>
          <a
            href="https://facebook.com"
            target="_blank"
            >Facebook</a
          >
          |
          <a
            href="https://twitter.com"
            target="_blank"
            >Twitter</a
          >
          |
          <a
            href="https://instagram.com"
            target="_blank"
            >Instagram</a
          >
        </div>
        <div class="info">
          <p>Ondernemingsnummer: BE 0802.208.410</p>
          <p>Volledige naam: Hello New Me</p>
          <p>Adres: Beringenbaan 43, 3290 Diest</p>
          <p>Oprichting: 30-05-2023</p>
          <p>Hoofdactiviteit: Haarverzorging</p>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 HNM. All rights reserved.</p>
        </div>
      </div>
    `
  }
}
