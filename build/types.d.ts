import { IDecimalFacets, IDoubleFacets, IDurationFacets, IEnumerableFacets, IStringFacets, TSType, XsdAnySimpleType } from "./common";
export declare class XsdString extends XsdAnySimpleType {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IStringFacets): string;
}
export declare class XsdNormalizedString extends XsdString {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IStringFacets): string;
}
export declare class XsdToken extends XsdNormalizedString {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IStringFacets): string;
}
export declare class XsdLanguage extends XsdToken {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IStringFacets): string;
}
export declare class XsdNMTOKEN extends XsdToken {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IStringFacets): string;
}
export declare class XsdNMTOKENS extends XsdToken {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IStringFacets): string;
}
export declare class XsdName extends XsdToken {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IStringFacets): string;
}
export declare class XsdNCName extends XsdName {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IStringFacets): string;
}
export declare class XsdID extends XsdNCName {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
}
export declare class XsdIDREF extends XsdNCName {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
}
export declare class XsdIDREFS extends XsdIDREF {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IStringFacets): string;
}
export declare class XsdENTITY extends XsdNCName {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
}
export declare class XsdENTITIES extends XsdIDREF {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IStringFacets): string;
}
export declare class XsdDecimal extends XsdAnySimpleType {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IDecimalFacets): string;
}
export declare class XsdInteger extends XsdDecimal {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IDecimalFacets): string;
}
export declare class XsdNonPositiveInteger extends XsdDecimal {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IDecimalFacets): string;
}
export declare class XsdNegativeInteger extends XsdNonPositiveInteger {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IDecimalFacets): string;
}
export declare class XsdLong extends XsdDecimal {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IDecimalFacets): string;
}
export declare class XsdInt extends XsdLong {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IDecimalFacets): string;
}
export declare class XsdShort extends XsdInt {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IDecimalFacets): string;
}
export declare class XsdByte extends XsdShort {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IDecimalFacets): string;
}
export declare class XsdNonNegativeInteger extends XsdDecimal {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IDecimalFacets): string;
}
export declare class XsdPositiveInteger extends XsdNonNegativeInteger {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IDecimalFacets): string;
}
export declare class XsdUnsignedLong extends XsdNonNegativeInteger {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IDecimalFacets): string;
}
export declare class XsdUnsignedInt extends XsdUnsignedLong {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IDecimalFacets): string;
}
export declare class XsdUnsignedShort extends XsdUnsignedInt {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IDecimalFacets): string;
}
export declare class XsdUnsignedByte extends XsdUnsignedShort {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IDecimalFacets): string;
}
export declare class XsdFloat extends XsdAnySimpleType {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IDoubleFacets): string;
}
export declare class XsdDouble extends XsdAnySimpleType {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IDoubleFacets): string;
}
export declare class XsdNOTATION extends XsdAnySimpleType {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IEnumerableFacets): string;
}
export declare class XsdQName extends XsdAnySimpleType {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IEnumerableFacets): string;
}
export declare class XsdBoolean extends XsdAnySimpleType {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IEnumerableFacets): string;
}
export declare class XsdBase64Binary extends XsdAnySimpleType {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IEnumerableFacets): string;
}
export declare class XsdHexBinary extends XsdAnySimpleType {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IEnumerableFacets): string;
}
export declare class XsdAnyURI extends XsdAnySimpleType {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IEnumerableFacets): string;
}
export declare class XsdDate extends XsdAnySimpleType {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IEnumerableFacets): string;
}
export declare class XsdTime extends XsdAnySimpleType {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IEnumerableFacets): string;
}
export declare class XsdDateTime extends XsdAnySimpleType {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IEnumerableFacets): string;
}
export declare class XsdGYear extends XsdAnySimpleType {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IEnumerableFacets): string;
}
export declare class XsdGYearMonth extends XsdAnySimpleType {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IEnumerableFacets): string;
}
export declare class XsdGMonth extends XsdAnySimpleType {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IEnumerableFacets): string;
}
export declare class XsdGMonthDay extends XsdAnySimpleType {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IEnumerableFacets): string;
}
export declare class XsdGDay extends XsdAnySimpleType {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IEnumerableFacets): string;
}
export declare class XsdDuration extends XsdAnySimpleType {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IDurationFacets): string;
}
export declare class XsdDayTimeDuration extends XsdDuration {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IDurationFacets): string;
}
export declare class XsdYearMonthDuration extends XsdDuration {
    constructor(tsType?: TSType[] | null, nativeName?: string | null);
    processValue(value: any, facets?: IDurationFacets): string;
}
export declare namespace XsdNativeDataType {
    const anySimpleType: XsdAnySimpleType;
    const string: XsdString;
    const normalizedString: XsdNormalizedString;
    const token: XsdToken;
    const language: XsdLanguage;
    const NMTOKEN: XsdNMTOKEN;
    const NMTOKENS: XsdNMTOKENS;
    const name: XsdName;
    const NCName: XsdNCName;
    const ID: XsdID;
    const IDREF: XsdIDREF;
    const IDREFS: XsdIDREFS;
    const ENTITY: XsdENTITY;
    const decimal: XsdDecimal;
    const integer: XsdInteger;
    const nonPositiveInteger: XsdNonPositiveInteger;
    const negativeInteger: XsdNegativeInteger;
    const long: XsdLong;
    const int: XsdInt;
    const short: XsdShort;
    const byte: XsdByte;
    const nonNegativeInteger: XsdNonNegativeInteger;
    const positiveInteger: XsdPositiveInteger;
    const unsignedLong: XsdUnsignedLong;
    const unsignedInt: XsdUnsignedInt;
    const unsignedShort: XsdUnsignedShort;
    const unsignedByte: XsdUnsignedByte;
    const float: XsdFloat;
    const double: XsdDouble;
    const NOTATION: XsdNOTATION;
    const QName: XsdQName;
    const boolean: XsdBoolean;
    const base64Binary: XsdBase64Binary;
    const hexBinary: XsdHexBinary;
    const anyURI: XsdAnyURI;
    const date: XsdDate;
    const time: XsdTime;
    const dateTime: XsdDateTime;
    const gYear: XsdGYear;
    const gYearMonth: XsdGYearMonth;
    const gMonth: XsdGMonth;
    const gMonthDay: XsdGMonthDay;
    const gDay: XsdGDay;
    const duration: XsdDuration;
    const dayTimeDuration: XsdDayTimeDuration;
    const yearMonthDuration: XsdYearMonthDuration;
}
