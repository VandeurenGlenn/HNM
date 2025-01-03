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
        background-color: var(--md-sys-color-tertiary);
        color: var(--md-sys-color-on-tertiary);
        text-align: center;
        width: 100%;
        box-sizing: border-box;
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
      a {
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
          src="./assets/banner-tertiary.svg"
          alt="HNM Logo"
          class="logo" />

        <h1>Hello New Me</h1>
        <div class="social">
          <p>Follow us on:</p>
          <!--<a
            href="https://facebook.com"
            target="_blank"
            >Facebook</a
          >
          |-->
          <a
            href="https://instagram.com"
            target="_blank"
            >Instagram</a
          >
        </div>
        <div class="info">
          <p>BE 0802.208.410</p>
          <p>Beringenbaan 43, 3290 Diest</p>
          <a href="email:info@hellonewme.be">info@hellonewme.be</a>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 HNM. All rights reserved.</p>
        </div>
      </div>
    `
  }
}
