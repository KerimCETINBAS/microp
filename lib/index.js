"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPError = exports.Methods = exports.Microp = void 0;
const Microp_1 = require("./lib/Microp");
Object.defineProperty(exports, "Microp", { enumerable: true, get: function () { return Microp_1.CreateService; } });
Object.defineProperty(exports, "Methods", { enumerable: true, get: function () { return Microp_1.Methods; } });
Object.defineProperty(exports, "HTTPError", { enumerable: true, get: function () { return Microp_1.HTTPError; } });
module.exports = {
    Microp: Microp_1.CreateService, Methods: Microp_1.Methods, HTTPError: Microp_1.HTTPError
};
