import { LiteElement } from '@vandeurenglenn/lite';
import '../darkmode/element.js';
export declare class DrawerContent extends LiteElement {
    accessor darkmode: any;
    changeLogo(darkmode: boolean): void;
    onChange(propertyKey: any, value: any): void;
    static styles: import("@lit/reactive-element/css-tag.js").CSSResult[];
    render(): import("lit-html").TemplateResult<1>;
}
