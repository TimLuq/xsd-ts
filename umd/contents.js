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
    class XsdSimpleContent extends helpers_1.XsdAnnotable {
    }
    exports.XsdSimpleContent = XsdSimpleContent;
    class XsdComplexContent extends helpers_1.XsdAnnotable {
    }
    exports.XsdComplexContent = XsdComplexContent;
    class XsdOtherContent {
    }
    exports.XsdOtherContent = XsdOtherContent;
});
//# sourceMappingURL=contents.js.map