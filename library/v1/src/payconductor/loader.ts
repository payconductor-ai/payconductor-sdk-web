const loaded = new Map<string, Promise<void>>();

export function loadScript(url: string): Promise<void> {
	const existing = loaded.get(url);
	if (existing) return existing;

	const promise = new Promise<void>((resolve, reject) => {
		if (document.querySelector(`script[src="${url}"]`)) {
			resolve();
			return;
		}

		const script = document.createElement("script");
		script.src = url;
		script.async = true;
		script.onload = () => resolve();
		script.onerror = () => {
			loaded.delete(url);
			reject(new Error(`Failed to load script: ${url}`));
		};
		(document.head || document.body).appendChild(script);
	});

	loaded.set(url, promise);
	return promise;
}
