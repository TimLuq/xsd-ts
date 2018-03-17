import { ParseError, IParserContext } from "./parser";

export { XsdAnyAttribute, XsdAttribute, XsdAttributeGroup } from "./attributes";
export { XsdAll, XsdChoice, XsdCollection, XsdGroup, XsdSequence } from "./collections";
export {
    IBooleanFacets, IDateTimeFacets, IDateFacets, IDecimalFacets, IDoubleFacets, IDurationFacets, IEffectiveFacets, IFloatFacets, IStringFacets, ITimeFacets,
    XsdAny, XsdAnySimpleType, XsdComplexType, XsdElement, XsdExtension, XsdList, XsdRestriction, XsdSimpleType, XsdType, XsdUnion,
} from "./common";
export { XsdComplexContent, XsdOtherContent, XsdSimpleContent } from "./contents";
export { XsdAppinfo, XsdAnnotable, XsdDocumentation } from "./helpers";
export {
    XsdAnyURI, XsdBase64Binary, XsdBoolean, XsdByte, XsdDate, XsdDateTime, XsdDayTimeDuration, XsdDecimal, XsdDouble, XsdDuration, XsdENTITY, XsdENTITIES, XsdFloat, XsdGDay, XsdGMonth, XsdGMonthDay, XsdGYear, XsdHexBinary, XsdID, XsdIDREF, XsdIDREFS, XsdInt, XsdInteger, XsdLanguage, XsdLong,
    XsdNativeDataType, XsdNMTOKEN, XsdNMTOKENS, XsdName, XsdNCName, XsdNegativeInteger, XsdNonNegativeInteger, XsdNonPositiveInteger, XsdNormalizedString, XsdNOTATION,
    XsdPositiveInteger, XsdQName, XsdShort, XsdString, XsdTime, XsdToken, XsdUnsignedInt, XsdUnsignedLong, XsdUnsignedShort, XsdYearMonthDuration,
} from "./types";

export function parseDocument(docOrElem: Document | Element) {
    return import("./parser").then((parser) => parser.parseDocument(docOrElem));
}

export function ParserErrors() {
    return import("./parser").then((parser) => parser.ParseError);
}
