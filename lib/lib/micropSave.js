"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateService = exports.Methods = void 0;
const http_1 = require("http");
var Methods;
(function (Methods) {
    Methods["Get"] = "GET";
    Methods["Post"] = "POST";
    Methods["Put"] = "PUT";
    Methods["Patch"] = "PATCH";
    Methods["Delete"] = "DELETE";
})(Methods = exports.Methods || (exports.Methods = {}));
class CreateRequest {
    constructor(req) {
        this._originalRequest = req;
    }
}
class CreateService {
    constructor(options) {
        this.middleWareStack = [];
        this.endpoints = [];
        this.server = (0, http_1.createServer)((req, res) => __awaiter(this, void 0, void 0, function* () {
            var e_1, _a;
            const r = new CreateRequest(req);
            let _next = false;
            const url = new URL(req.url || "/", `http://${req.headers.host}`);
            const params = {};
            let _body = {};
            const endpoint = this.endpoints.find(ep => { var _a; return ((_a = ep.regexp) === null || _a === void 0 ? void 0 : _a.test(url.pathname)) && ep.method == req.method; });
            if (!endpoint) {
                res.statusCode = 404;
                res.end();
                return;
            }
            const segments = url.pathname.split("/").filter(p => p !== "");
            Object.entries(endpoint.params).forEach(param => {
                Object.assign(params, { [param[0]]: segments[param[1]] });
            });
            try {
                for (var _b = __asyncValues(this.middleWareStack), _c; _c = yield _b.next(), !_c.done;) {
                    const middleware = _c.value;
                    _next = false;
                    function next(error) {
                        if (error)
                            req.error = error;
                        req.emit("next");
                    }
                    middleware(req, res, next);
                    req.on("next", () => {
                        _next = true;
                    });
                    if (_next)
                        continue;
                    else {
                        console.log("no call");
                        return res.end();
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            req.once("end", () => {
                console.log("body :", req.body);
                const { body, status, headers } = endpoint.handler({
                    body: _body,
                    headers: req.headers,
                    params: params,
                    queryParams: url.searchParams
                });
                status ? res.statusCode = status : res.statusCode = 200;
                if (headers)
                    Object.entries(headers).forEach(header => res.setHeader(header[0], header[1]));
                if (body) {
                    switch (typeof body) {
                        case "object":
                            console.log(res.destroyed);
                            res.end(JSON.stringify(body));
                            break;
                        default:
                            res.end(body);
                            break;
                    }
                }
            });
        }));
    }
    useMiddleware(middleware) {
        this.middleWareStack.push(middleware);
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
        console.log(this.endpoints);
        return this;
    }
    listen(port, callback) {
        this.server.listen(port, () => callback());
        return this;
    }
}
exports.CreateService = CreateService;
