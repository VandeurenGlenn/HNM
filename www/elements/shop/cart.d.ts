import { LiteElement } from '@vandeurenglenn/lite';
export declare class ShopCart extends LiteElement {
    accessor items: {};
    accessor open: boolean;
    addItem(item: any): void;
    removeItem(sku: any): void;
    onChange(propertyKey: string, value: any): void;
    static styles: import("@lit/reactive-element/css-tag.js").CSSResult[];
    render(): import("lit-html").TemplateResult<1>;
}
