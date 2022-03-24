"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPError = exports.CreateService = exports.Methods = void 0;
const events_1 = __importDefault(require("events"));
const http_1 = require("http");
var Methods;
(function (Methods) {
    Methods["Get"] = "GET";
    Methods["Post"] = "POST";
    Methods["Put"] = "PUT";
    Methods["Patch"] = "PATCH";
    Methods["Delete"] = "DELETE";
})(Methods = exports.Methods || (exports.Methods = {}));
class HTTPError extends Error {
    constructor({ status, message }) {
        super(message);
        this.status = status;
    }
}
exports.HTTPError = HTTPError;
class CreateRequest extends events_1.default {
    constructor(req, res, middlewares) {
        super();
        this.isDestroyed = false;
        this.locals = {};
        this.params = {};
        this._originalRequest = req;
        let next = true;
        let local = {};
        if (!!(middlewares === null || middlewares === void 0 ? void 0 : middlewares.length)) {
            for (const middleware of middlewares) {
                next = false;
                const locals = middleware(this._originalRequest, res, err => {
                    next = true;
                });
                Object.assign(this.locals, locals);
            }
            if (!next) {
                res.end();
            }
        }
        this._originalRequest.on("data", chunk => this.rawBody = chunk);
        this._originalRequest.once("end", () => {
            this.body = this._originalRequest.body;
            this.emit("end", this);
        });
    }
}
class CreateService {
    constructor() {
        this.server = (0, http_1.createServer)();
        this.middlewares = [];
        this.endpoints = [];
        this.server.on("request", (req, res) => {
            const url = new URL(req.url || "/", `http://${req.headers.host}`);
            const endpoint = this.endpoints.find(ep => { var _a; return ((_a = ep.regexp) === null || _a === void 0 ? void 0 : _a.test(url.pathname)) && ep.method == req.method; });
            if (!endpoint) {
                res.setHeader("content-type", "text/html");
                res.end(`   <!DOCTYPE html>
                            <html lang="en">
                            <head>
                            <meta charset="utf-8">
                            <title>Error</title>
                            </head>
                            <body>
                            <pre>Cannot ${req.method} ${url.pathname}</pre>
                            </body>
                            </html> `);
                return;
            }
            const request = new CreateRequest(req, res, this.middlewares);
            // get params
            const segments = url.pathname.split("/").filter(p => p !== "");
            Object.entries(endpoint.params).forEach(param => {
                Object.assign(request.params, { [param[0]]: segments[param[1]] });
            });
            request.on("end", (request) => {
                const endPointRequest = {
                    body: request.body,
                    headers: request.headers,
                    locals: request.locals,
                    cookies: request.cookies,
                    queryParams: request.queeryParams,
                    params: request.params
                };
                let hookResult = {};
                if (endpoint.hooks) {
                    try {
                        endpoint.hooks.forEach(hook => {
                            Object.assign(hookResult, hook(endPointRequest));
                        });
                    }
                    catch (error) {
                        return res.end(String(error));
                    }
                }
                Object.assign(endPointRequest, hookResult);
                const response = endpoint.handler(Object.assign({}, endPointRequest));
                response.status ?
                    res.statusCode = response.status :
                    response.status = 404;
                if (response.headers) {
                    Object.entries(response.headers).forEach(header => {
                        res.setHeader(header[0], header[1]);
                    });
                }
                if (response.body) {
                    switch (typeof response.body) {
                        case "object":
                            res.write(JSON.stringify(response.body));
                            break;
                        default:
                            res.write(response.body);
                    }
                }
                res.end();
            });
        });
    }
    use(middleware) {
        var _a;
        (_a = this.middlewares) === null || _a === void 0 ? void 0 : _a.push(middleware);
        return this;
    }
    addEndpoint(endpoint) {
        const regexp = new RegExp("^" + endpoint.path.replace(/:\w+/g, "\\w+") + "\/?$");
        const segments = endpoint.path.trim().split("/").filter(t => t != "");
        const params = segments.map((segment, index) => {
            const isRegexp = /^:\w+$/.test(segment);
            return {
                isRegexp,
                index,
                param: segment.replace(":", "")
            };
        }).filter(s => s.isRegexp).reduce((a, v) => {
            a[v.param] = v.index;
            return a;
        }, {});
        this.endpoints.push(Object.assign(Object.assign({}, endpoint), { params,
            regexp }));
        return this;
    }
    listen(port, callback) {
        this.server.listen(port);
        if (callback)
            callback();
        return this;
    }
}
exports.CreateService = CreateService;
