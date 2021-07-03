import { AjaxEvent } from '../types';
interface CableReady {
    perform: (json: JSON) => void;
}
interface CableCarConfig {
    mimeType?: string;
}
interface ExtendedElement extends HTMLElement {
    observer?: MutationObserver;
}
export declare class CableCar {
    observer: MutationObserver;
    elements: ExtendedElement[];
    cableReady: CableReady;
    mimeType: string;
    boundPerform: EventListener;
    boundScanner: MutationCallback & EventListener;
    constructor(cableReady: CableReady, { mimeType }?: CableCarConfig);
    get name(): string;
    connect(): void;
    disconnect(): void;
    scanner(): void;
    integrity(mutations: MutationRecord[]): void;
    perform(event: AjaxEvent): void;
    get isPreview(): boolean;
}
export {};
//# sourceMappingURL=cableCar.d.ts.map