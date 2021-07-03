export declare class FetchResponse {
    readonly response: Response;
    private __responseHtml__;
    private __responseText__;
    private __responseJson__;
    constructor(response: Response);
    get succeeded(): boolean;
    get failed(): boolean;
    get clientError(): boolean;
    get serverError(): boolean;
    get redirected(): boolean;
    get location(): URL;
    get isHtml(): boolean;
    get statusCode(): number;
    get contentType(): string | null;
    get responseText(): Promise<string>;
    get responseHtml(): Promise<string>;
    get responseJson(): Promise<JSON>;
    get isJson(): boolean;
    getHeader(name: string): string | null;
}
//# sourceMappingURL=fetchResponse.d.ts.map