/// <reference types="@types/node" />
/// <reference types="@types/node" />
import { IncomingMessage } from "http";
declare type Input = {
    filename?: string;
    name?: string;
    type: string;
    data: Buffer;
};
export declare function getBoundary(header: string): string;
export declare class MicropForm {
    private fields;
    get(name: string): Input | undefined | string;
    getAll(name: string): (Input | string)[] | undefined;
    append(name: string, value: Input): this;
}
export declare class MicropBody {
    readonly originalRequest: IncomingMessage;
    constructor(req: IncomingMessage);
    formData(): Promise<MicropForm>;
    blob(): Promise<Blob>;
    json(): Promise<Record<string, unknown>>;
    text(): Promise<string>;
    buffer(): Buffer;
}
export {};
//# sourceMappingURL=body.d.ts.map