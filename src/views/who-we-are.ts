import { LiteElement, html, css, customElement, property } from '@vandeurenglenn/lite'
import '@vandeurenglenn/flex-elements/container.js'
import './../elements/header/small-header.js'

@customElement('who-we-are-view')
export class WhoWeAreView extends LiteElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      flex-container {
        overflow-y: auto;
      }
    `
  ]
  render() {
    return html`
      <small-header></small-header>
      <flex-container>
        <h3>Mijn verhaal</h3>

        <p>
          In 2008 kampte ik met beginnend haaruitval. ik keek vaak naar andere mannen met vollere haren en voelde dan de
          ontmoediging al opkomen. Na het proberen van verschillende producten tegen haaruitval en bepaalde poeders
          waardoor het haar voller lijkt, volgde de beslissing om een haartransplantatie te proberen. Een zeer pijnlijke
          ervaring met als eindresultaat, geen vollere haren. Doch werden de zones waar de meeste kaalheid zichtbaar
          was, gecamoufleerd. Maar nog steeds leek het haar niet vol. Doordat het proces van haaruitval blijft, werden
          na de haartransplantatie opnieuw kalere plekken opgemerkt. Met als resultaat opnieuw een issue en een lager
          zelfbeeld. Elke spiegel of glasreflectie vermeed ik spontaan. Na enkele maanden tot bijna een jaar aan
          opzoekingen kwam ik in contact met een Amerikaans bedrijf waar haarsystemen op maat gemaakt werden. De kale
          zone’s werden hierdoor gecamoufleerd en de gewenste haardikte alsook de lengte van het haar was bespreekbaar.
          De ontlading was er wel, alsook een spontane traan van geluk was zichtbaar. Er gingen enkele weken voorbij. Ik
          besefte dat hier toch wel wat wilskracht voor vereist was. Zo stelde ik mezelf in het begin zeer kritisch op.
          Er gingen heel veel vragen door mijn hoofd zoals “hoe gaan de mensen reageren als ze mij plots met vollere
          haren zien”? , “ga ik er anders uitzien”?.. Toch wel een serieuze drempel. Maar goed ik heb mezelf bij elkaar
          geraapt en er de volle 100% voor gegaan. Wij zijn Anno 2024 vandaag de dag, tegenwoordig kan alles toch? Het
          was doorslaggevend.
        </p>

        <p>Heeft u interesse of wilt u graag een vrijblijvend gesprek? Contacteer ons vrijblijvend.</p>
      </flex-container>
    `
  }
}
