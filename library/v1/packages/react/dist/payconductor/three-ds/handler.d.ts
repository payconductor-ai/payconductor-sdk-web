import { ThreeDSecureInit, ThreeDSecureOptions, ThreeDSecureResult } from './types';

export declare class PayConductor3DSSDK {
    private data;
    private provider;
    private api;
    constructor(threeDSecure: ThreeDSecureInit);
    get needsChallenge(): boolean;
    get acquirer(): string | undefined;
    /** Indica se o pedido precisa de autenticação 3DS. */
    static requiresChallenge(order: {
        statusDetail?: string | null;
        threeDSecure?: {
            status?: string;
        } | null;
        creditCard?: {
            threeDSecure?: {
                status?: string;
            };
        } | null;
    }): boolean;
    /**
     * Executa o fluxo completo de 3DS: carrega os dados, resolve o provedor,
     * conduz o desafio, envia o `complete` (só no modo `Manual`) e faz o polling
     * do pedido. O integrador não precisa ramificar por modo.
     */
    authenticate(options?: Omit<ThreeDSecureOptions, "threeDSecure">): Promise<ThreeDSecureResult>;
    destroy(): void;
    /** Mensagem amigável da falha do desafio (pt-BR). */
    private deriveFailureReason;
    /**
     * Payload do `complete`. `failureReason` só vai quando é falha técnica
     * (sem `transStatus` do emissor nem cancelamento) — string vazia quebra o backend.
     */
    private buildCompletionPayload;
    private finish;
    private toError;
}
