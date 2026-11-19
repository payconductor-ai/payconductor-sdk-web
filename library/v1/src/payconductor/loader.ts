const loaded = new Map<string, Promise<void>>();

type LoadScriptOptions = {
    /** Atributos aplicados à tag antes da inserção (ex: { view: "checkout" }). */
    attributes?: Record<string, string>;
    /** Sobrescreve o `async` padrão. */
    async?: boolean;
    /** Onde inserir a tag (padrão: document.head). */
    parent?: HTMLElement;
};

export function loadScript(
    url: string,
    { attributes, async = true, parent }: LoadScriptOptions = {},
): Promise<void> {
    const existing = loaded.get(url);
    if (existing) return existing;

    const promise = new Promise<void>((resolve, reject) => {
        if (document.querySelector(`script[src="${url}"]`)) {
            resolve();
            return;
        }

        const script = document.createElement("script");
        script.src = url;
        script.async = async;

        // Antes do append: alguns scripts leem os atributos na execução.
        for (const [name, value] of Object.entries(attributes ?? {})) {
            script.setAttribute(name, value);
        }

        script.onload = () => resolve();
        script.onerror = () => {
            loaded.delete(url);
            reject(new Error(`Failed to load script: ${url}`));
        };
        (parent ?? document.head).appendChild(script);
    });

    loaded.set(url, promise);
    return promise;
}
