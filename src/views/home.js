import {LitElement, html, css} from 'lit'
import 'custom-svg-iconset'
import 'custom-svg-icon'
import '@vandeurenglenn/flex-elements'
export default customElements.define('home-view', class HomeView extends LitElement {
  constructor() {
    super()
  }

  static styles = css`
    :host {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      font-family: system-ui, "Noto Sans", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }

    header {
      position: absolute;
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center; 
      padding: 6px 12px;
      // background: #beb9c0;
    }

    main {      
      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: center;
      padding: 6px 12px;
    }

    main, header {
      box-sizing: border-box;
    }

    header span, section, img {
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
      flex-direction: row;
    }

    .examples .left, .examples .right {
      width: calc(100% / 2);
    }

    .left {
      padding-right: 3px;
    }

    .right {
      padding-left: 3px;
    }
    
    .left img, .right img {
      padding-top: 3px;
    }
  `

  render() {
    return html`
    <main>
      <section>
          
      </section>
      
      <section class="examples">
        <span class="left">
          <img src="./assets/example2.jpg">
          <img src="./assets/example1.jpg">  
        </span>

        <span class="right">
          <img src="./assets/example1.jpg">  
          <img src="./assets/example2.jpg">
        </span>
      </section>

      <section class="examples">
        <span class="left">
          <img src="./assets/example2.jpg">
          <img src="./assets/example1.jpg">  
        </span>

        <span class="right">
          <img src="./assets/example1.jpg">  
          <img src="./assets/example2.jpg">
        </span>
      </section>
    </main>
    
    `
    // <img src="./assets/banner.jpg">
  }
})