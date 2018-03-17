(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.mixSourcable = (superclass) => class extends superclass {
    };
    exports.mixNodeContents = (superclass) => class extends superclass {
    };
    exports.mixOccurs = (superclass) => class extends superclass {
    };
    class XsdAnnotable {
    }
    exports.XsdAnnotable = XsdAnnotable;
    class XsdDocumentation extends exports.mixNodeContents(exports.mixSourcable(Object)) {
    }
    exports.XsdDocumentation = XsdDocumentation;
    class XsdAppinfo extends exports.mixNodeContents(exports.mixSourcable(Object)) {
    }
    exports.XsdAppinfo = XsdAppinfo;
});
//# sourceMappingURL=helpers.js.map