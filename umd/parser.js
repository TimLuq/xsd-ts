(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./common"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const common_1 = require("./common");
    var ParseError;
    (function (ParseError) {
        ParseError[ParseError["UNSUPPORTED_FEATURE"] = 0] = "UNSUPPORTED_FEATURE";
        ParseError[ParseError["PARSE_ARG"] = 1] = "PARSE_ARG";
        ParseError[ParseError["EXPECT_SCHEMA"] = 2] = "EXPECT_SCHEMA";
    })(ParseError = exports.ParseError || (exports.ParseError = {}));
    function parseDocument(docOrElem) {
        const elem = docOrElem.nodeType === 1 ? docOrElem :
            docOrElem.nodeType === 9 ? docOrElem.documentElement :
                null;
        if (!elem) {
            throw Object.assign(new TypeError("Expected argument to be a DOM Element or DOM Document"), { type: ParseError.PARSE_ARG });
        }
        return parseSchema(elem);
    }
    exports.parseDocument = parseDocument;
    function parseSchema(elem) {
        if (elem.localName !== "schema" || elem.namespaceURI !== "http://www.w3.org/2001/XMLSchema") {
            throw Object.assign(new TypeError("Expects the element to be `{http://www.w3.org/2001/XMLSchema}schema` but found `{" + elem.namespaceURI + "}" + elem.localName + "`"), { type: ParseError.EXPECT_SCHEMA });
        }
        return { elements: [new common_1.XsdElement()] };
    }
});
//# sourceMappingURL=parser.js.map