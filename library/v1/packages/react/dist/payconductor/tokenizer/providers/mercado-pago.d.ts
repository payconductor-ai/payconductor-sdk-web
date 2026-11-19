import { AbstractTokenizerProvider, TokenizerFingerprints } from '../types';

export declare class MercadoPagoTokenizerProvider extends AbstractTokenizerProvider {
    scriptUrl: string;
    private deviceSessionId?;
    getFingerprints(): Promise<TokenizerFingerprints | undefined>;
    tokenize(): Promise<string>;
    /** Lê o `MP_DEVICE_SESSION_ID` sem derrubar a tokenização quando indisponível. */
    private resolveDeviceSessionId;
    /** O security.js grava o id de forma assíncrona; aguarda por um curto período. */
    private waitForDeviceSessionId;
    private describeMercadoPagoError;
}
