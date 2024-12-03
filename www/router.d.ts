export default class Router {
    #private;
    static routes: Map<string, string>;
    constructor(host: any);
    static bang(selected: any): void;
    static go(selected: any): void;
    select(selected: any): Promise<void>;
}
