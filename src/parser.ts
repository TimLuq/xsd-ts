import { XsdElement } from "./common";

export interface IParserContext {
    elements: XsdElement[];
}

export enum ParseError {
    UNSUPPORTED_FEATURE,
    PARSE_ARG,
    EXPECT_SCHEMA,
}

export function parseDocument(docOrElem: Document | Element) {
    const elem =
        docOrElem.nodeType ===  1 ? docOrElem as Element :
        docOrElem.nodeType ===  9 ? (docOrElem as Document).documentElement :
        null as Element;
    if (!elem) {
        throw Object.assign(new TypeError("Expected argument to be a DOM Element or DOM Document"), { type: ParseError.PARSE_ARG });
    }

    return parseSchema(elem);
}

function parseSchema(elem: Element) {
    if (elem.localName !== "schema" || elem.namespaceURI !== "http://www.w3.org/2001/XMLSchema") {
        throw Object.assign(new TypeError("Expects the element to be `{http://www.w3.org/2001/XMLSchema}schema` but found `{" + elem.namespaceURI + "}" + elem.localName + "`"), { type: ParseError.EXPECT_SCHEMA });
    }

    return { elements: [new XsdElement()] } as IParserContext;
}
