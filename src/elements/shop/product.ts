import { LiteElement, html, css, customElement, property, query } from '@vandeurenglenn/lite'
import './shop-item-bar.js'
import { translate } from '@lit-shop/translate'
import '@material/web/select/outlined-select.js'
import '@material/web/select/select-option.js'
import { MdOutlinedSelect } from '@material/web/select/outlined-select.js'

export type UnitOfMeasurement = 'kg' | 'g' | 'mg' | 'l' | 'ml' | 'cl' | 'dl' | 'pc' | 'pcs'

export type SKU = {
  EAN: string
  amount: number
  unit: UnitOfMeasurement
  price: number
  stock: number
  sku: string
}

@customElement('shop-product')
export class ShopProduct extends LiteElement {
  @property({ type: Object }) accessor product
  @property({ type: String }) accessor key
  @property({ type: String }) accessor placeholder = './assets/sciccors.svg'
  @property({ type: Boolean, consumes: true }) accessor darkMode
  @property({ type: Array }) accessor SKUs: SKU[]

  @query('md-outlined-select') accessor selectElement: MdOutlinedSelect

  currentEAN: string
  currentPrice: Number

  async onChange(propertyKey: string, value: any): Promise<void> {
    if (propertyKey === 'darkMode') {
      if (value) {
        this.placeholder = './assets/sciccors-dark.svg'
      } else {
        this.placeholder = './assets/sciccors.svg'
      }
    }
    console.log('propertyKey', propertyKey, 'value', value)

    if ((propertyKey === 'product' && value.SKUs) || (propertyKey === 'SKUs' && this.product)) {
      console.log('product', this.product)
      console.log('SKUs', this.SKUs)

      await this.selectElement.updateComplete
      this.currentEAN = value.SKUs[0].EAN
      this.currentPrice = value.SKUs[0].price
      this.selectElement.select(this.currentEAN)
      this.key = this.product.key
      this.requestRender()
    }
  }

  get amount() {
    return this.shadowRoot.querySelector('shop-item-bar').amount
  }

  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        align-items: center;
        overflow: hidden;
        color: var(--md-sys-color-color-on-surface);
      }

      img {
        box-sizing: border-box;
        padding: 0px 24px 12px 24px;
        height: 400px;
      }

      h3 {
        width: 100%;
        box-sizing: border-box;
        margin: 0;
      }
      flex-row {
        width: 100%;
        padding: 24px 0;
        box-sizing: border-box;
        align-items: center;
      }

      flex-container {
        height: 100%;
        width: 100%;
        align-items: center;
      }
    `
  ]

  render() {
    if (!this.product) return html`<p>Loading</p>`
    return html`
      <flex-container>
        <img src=${this.product?.image ? this.product.image : this.placeholder} />

        ${this.product.SKUs
          ? html`
              <flex-row>
                <md-outlined-select>
                  ${this.product.SKUs.map(
                    (SKU) => html`<md-select-option value="${SKU.EAN}">${SKU.amount} ${SKU.unit}</md-select-option>`
                  )}
                </md-outlined-select>
                <flex-it></flex-it>
                <strong
                  >${Number(this.currentPrice).toLocaleString('nl-BE', {
                    style: 'currency',
                    currency: 'EUR'
                  })}</strong
                >
              </flex-row>
            `
          : ''}
        <h3>${translate(this.product.name)}</h3>
        <p>${translate(this.product.description)}</p>

        <flex-it></flex-it>
        <shop-item-bar
          .key=${this.key}
          .EAN=${this.product['SKUs'][0]['EAN']}></shop-item-bar>
      </flex-container>
    `
  }
}
