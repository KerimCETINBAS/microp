/// <reference types="node" />
import { IncomingMessage } from "http";
export declare class MicropRequest {
    readonly originalRequest: IncomingMessage;
    constructor(req: IncomingMessage);
    json(): Record<string, unknown>;
    form(): FormData;
    text(): string;
    buffer(): Buffer;
}
