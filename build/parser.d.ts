import { XsdElement } from "./common";
export interface IParserContext {
    elements: XsdElement[];
}
export declare enum ParseError {
    UNSUPPORTED_FEATURE = 0,
    PARSE_ARG = 1,
    EXPECT_SCHEMA = 2,
}
export declare function parseDocument(docOrElem: Document | Element): IParserContext;
