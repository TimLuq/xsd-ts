(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./helpers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const helpers_1 = require("./helpers");
    class XsdGroup extends helpers_1.mixOccurs(helpers_1.XsdAnnotable) {
    }
    exports.XsdGroup = XsdGroup;
    class XsdAll extends helpers_1.XsdAnnotable {
    }
    exports.XsdAll = XsdAll;
    class XsdChoice extends helpers_1.mixOccurs(helpers_1.XsdAnnotable) {
    }
    exports.XsdChoice = XsdChoice;
    class XsdSequence extends helpers_1.mixOccurs(helpers_1.XsdAnnotable) {
    }
    exports.XsdSequence = XsdSequence;
});
//# sourceMappingURL=collections.js.map