import {
	AbstractThreeDSProvider,
	ThreeDSecureResultStatus,
	ThreeDSTransStatus,
} from "../types";
import type { ThreeDSecureResult } from "../types";

const DEFAULT_TIMEOUT_MS = 5 * 60 * 1000;
const TITLE_ID = "payconductor-3ds-sandbox-title";

export class SandboxThreeDSProvider extends AbstractThreeDSProvider {
	private timeoutId: ReturnType<typeof setTimeout> | null = null;

	async authenticate(): Promise<ThreeDSecureResult> {
		const { authToken } = this.data;

		if (!authToken) return this.fail("Missing authToken for 3DS challenge");

		const container = this.resolveContainer();

		return new Promise<ThreeDSecureResult>((resolve) => {
			this.timeoutId = setTimeout(() => {
				this.cleanup();
				resolve({ status: ThreeDSecureResultStatus.Timeout });
			}, this.options.timeoutMs ?? DEFAULT_TIMEOUT_MS);

			this.renderChallenge(container, {
				onConfirm: () => {
					this.cleanup();
					resolve({
						status: ThreeDSecureResultStatus.Success,
						transStatus: ThreeDSTransStatus.Authenticated,
						providerTransactionId: authToken,
					});
				},
				onCancel: () => {
					this.cleanup();
					resolve(this.fail("3DS challenge canceled by user", { challengeCanceled: true }));
				},
			});
		});
	}

	cleanup(): void {
		if (this.timeoutId) { clearTimeout(this.timeoutId); this.timeoutId = null; }
		this.closeModal();
	}

	private renderChallenge(
		container: HTMLElement,
		actions: { onConfirm: () => void; onCancel: () => void },
	): void {
		const panel = document.createElement("div");
		panel.setAttribute("role", "dialog");
		panel.setAttribute("aria-modal", "true");
		panel.setAttribute("aria-labelledby", TITLE_ID);
		panel.style.cssText =
			"min-height:inherit;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:32px;font-family:system-ui,-apple-system,sans-serif;text-align:center;color:#111827";

		const title = document.createElement("h2");
		title.id = TITLE_ID;
		title.textContent = "Autenticação 3DS (sandbox)";
		title.style.cssText = "margin:0;font-size:20px";

		const description = document.createElement("p");
		description.textContent =
			"Simulação do desafio do banco emissor. Confirme para aprovar a autenticação ou cancele para simular a desistência do comprador.";
		description.style.cssText = "margin:0 0 8px;max-width:360px;font-size:14px;line-height:1.5;color:#4b5563";

		const confirmButton = this.createButton(
			"Confirmar autenticação",
			"background:#111827;color:#fff;border-color:#111827",
			actions.onConfirm,
		);
		const cancelButton = this.createButton(
			"Cancelar",
			"background:#fff;color:#111827;border-color:#d1d5db",
			actions.onCancel,
		);

		panel.append(title, description, confirmButton, cancelButton);
		container.appendChild(panel);
		confirmButton.focus();
	}

	private createButton(label: string, colors: string, onClick: () => void): HTMLButtonElement {
		const button = document.createElement("button");
		button.type = "button";
		button.textContent = label;
		button.style.cssText = `width:100%;max-width:320px;padding:12px 16px;border:1px solid;border-radius:6px;font:inherit;font-size:14px;font-weight:600;cursor:pointer;${colors}`;
		button.addEventListener("click", onClick);
		return button;
	}
}
