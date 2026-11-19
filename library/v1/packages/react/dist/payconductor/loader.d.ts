type LoadScriptOptions = {
    /** Atributos aplicados à tag antes da inserção (ex: { view: "checkout" }). */
    attributes?: Record<string, string>;
    /** Sobrescreve o `async` padrão. */
    async?: boolean;
    /** Onde inserir a tag (padrão: document.head). */
    parent?: HTMLElement;
};
export declare function loadScript(url: string, { attributes, async, parent }?: LoadScriptOptions): Promise<void>;
export {};
