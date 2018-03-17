import { XsdElement } from "./common";
export var ParseError;
(function (ParseError) {
    ParseError[ParseError["UNSUPPORTED_FEATURE"] = 0] = "UNSUPPORTED_FEATURE";
    ParseError[ParseError["PARSE_ARG"] = 1] = "PARSE_ARG";
    ParseError[ParseError["EXPECT_SCHEMA"] = 2] = "EXPECT_SCHEMA";
})(ParseError || (ParseError = {}));
export function parseDocument(docOrElem) {
    const elem = docOrElem.nodeType === 1 ? docOrElem :
        docOrElem.nodeType === 9 ? docOrElem.documentElement :
            null;
    if (!elem) {
        throw Object.assign(new TypeError("Expected argument to be a DOM Element or DOM Document"), { type: ParseError.PARSE_ARG });
    }
    return parseSchema(elem);
}
function parseSchema(elem) {
    if (elem.localName !== "schema" || elem.namespaceURI !== "http://www.w3.org/2001/XMLSchema") {
        throw Object.assign(new TypeError("Expects the element to be `{http://www.w3.org/2001/XMLSchema}schema` but found `{" + elem.namespaceURI + "}" + elem.localName + "`"), { type: ParseError.EXPECT_SCHEMA });
    }
    return { elements: [new XsdElement()] };
}
//# sourceMappingURL=parser.js.map