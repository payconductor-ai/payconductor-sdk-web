import { AbstractThreeDSProvider, ThreeDSecureData, ThreeDSecureOptions } from '../types';
import { IntegrationProvider } from '../../iframe/types';

type ThreeDSProviderConstructor = new (data: ThreeDSecureData, options: ThreeDSecureOptions) => AbstractThreeDSProvider;
export declare const threeDSProviders: Partial<Record<IntegrationProvider | "PayConductor", ThreeDSProviderConstructor>>;
export {};
