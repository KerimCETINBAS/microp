/// <reference types="node" />
import { IncomingMessage } from "http";
import { IMicropRequest } from "../core";
declare type Input = {
    filename?: string;
    name?: string;
    type: string;
    data: Buffer;
};
export declare function getBoundary(header: string): string;
export declare class MicropForm {
    private fields;
    get(name: string): Input | undefined;
    append(name: string, value: Input): this;
}
export declare class MicropRequest implements IMicropRequest {
    readonly originalRequest: IncomingMessage;
    readonly headers: Record<string, string>;
    readonly cookies: Record<string, string>;
    readonly method?: string;
    readonly url?: string;
    readonly params: Record<string, string>;
    locals: Record<string, unknown>;
    constructor(req: IncomingMessage);
    formData(): Promise<MicropForm>;
    blob(): Promise<Blob>;
    json(): Promise<Record<string, unknown>>;
    text(): Promise<string>;
    buffer(): Buffer;
}
export {};
