import { PayConductorContextValue } from "./types";
import { PayConductor3DSSDK } from "./three-ds";
import { PayConductorTokenizeSDK } from "./tokenizer";

export interface PayConductor3DSElement {
	container: () => HTMLElement | null;
	show: () => void;
	hide: () => void;
}

export interface PayConductorWindow {
	PayConductor: PayConductorContextValue | null;
	PayConductor3DS?: PayConductor3DSElement | null;
}

interface MercadoPagoInstance {
	createCardToken(data: {
		cardNumber: string;
		cardholderName: string;
		cardExpirationMonth: string;
		cardExpirationYear: string;
		securityCode: string;
		identificationType: string;
		identificationNumber: string;
	}): Promise<{
		id: string;
		first_six_digits: string;
		last_four_digits: string;
	}>;
}

interface MercadoPagoConstructor {
	new (publicKey: string, options?: { locale?: string }): MercadoPagoInstance;
}

interface PagSeguroAuthRequest {
	data: {
		customer?: {
			name: string;
			email: string;
			phones?: Array<{ country: string; area: string; number: string; type: string }>;
		};
		paymentMethod: {
			type: string;
			installments: number;
			card: {
				number: string;
				expMonth: string;
				expYear: string;
				holder: { name: string };
			};
		};
		amount: { value: number; currency: string };
		billingAddress?: {
			street: string;
			number: string;
			complement?: string;
			regionCode: string;
			country: string;
			city: string;
			postalCode: string;
		};
		dataOnly?: boolean;
	};
}

interface PagSeguroSDK {
	setUp(config: { session: string; env: string }): void;
	authenticate3DS(request: PagSeguroAuthRequest): Promise<{ status: string; id?: string }>;
	PagSeguroError: new (...args: unknown[]) => Error;
}

interface TDSInitOptions {
	token: string;
	tds_method_container_element: HTMLElement;
	challenge_container_element: HTMLElement;
	use_default_challenge_iframe_style?: boolean;

	// '01' 250x400px  Mobile portrait
	// '02' 390x400px  Mobile landscape
	// '03' 500x600px  Desktop
	// '04' 600x400px  Desktop wide
	// '05' Fullscreen
	challenge_window_size?: "01" | "02" | "03" | "04" | "05";
}

interface TDSResponse {
	tds_server_trans_id: string;

	// Y  Autenticada               Emissor
	// A  Tentativa de autenticacao  Lojista ou Emissor
	// N  Nao autenticada           Lojista
	// C  Solicitacao de desafio    Lojista ou Emissor
	// U  Indisponivel              Lojista
	// R  Negada pelo emissor       Lojista
	// I  Apenas informacao         Lojista
	trans_status: "Y" | "A" | "N" | "C" | "U" | "R" | "I";

	authenticated_card: string;
	challenge_canceled: boolean;
}

interface TDSSDK {
	init(options: TDSInitOptions, orderData: Record<string, unknown>): Promise<TDSResponse[]>;
}

interface KrAuthenticateInstance {
	authenticate(
		operationUrl: string,
		callback?: (data: { status: string; [key: string]: unknown }) => void,
	): void;
}

interface KrAuthenticateConstructor {
	new (publicKey: string, options?: { element?: HTMLElement }): KrAuthenticateInstance;
}

declare global {
	type PagSeguroAuthRequestGlobal = PagSeguroAuthRequest;

	interface Window extends PayConductorWindow {
		MercadoPago?: MercadoPagoConstructor;
		PagSeguro?: PagSeguroSDK;
		TDS?: TDSSDK;
		KrAuthenticate?: KrAuthenticateConstructor;
		PayConductor3DSSDK?: typeof PayConductor3DSSDK;
		PayConductorTokenizeSDK?: typeof PayConductorTokenizeSDK;
	}
}
