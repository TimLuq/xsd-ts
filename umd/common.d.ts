import { XsdAnyAttribute, XsdAttribute, XsdAttributeGroup } from "./attributes";
import { XsdCollection } from "./collections";
import { XsdComplexContent, XsdOtherContent, XsdSimpleContent } from "./contents";
import { TQName, XsdAnnotable } from "./helpers";
export declare class XsdType extends XsdAnnotable {
}
export declare abstract class XsdSimpleType extends XsdType {
    /**
     * Disallow derriving types.
     */
    final?: "#all" | Set<"list" | "union" | "restriction">;
    content: XsdRestriction | XsdList | XsdUnion | XsdAnySimpleType;
}
export declare type TSType = "boolean" | "string" | "number" | "Date";
export interface IStringFacets {
    length?: number;
    pattern?: string | RegExp;
    maxLength?: number;
    minLength?: number;
    enumeration?: string[];
    whiteSpace?: "preserve" | "replace" | "collapse";
}
export interface IBooleanFacets {
    pattern?: string | RegExp;
    whiteSpace?: "preserve" | "replace" | "collapse";
}
export interface IEnumerableFacets {
    pattern?: string | RegExp;
    enumeration?: string[];
    whiteSpace?: "preserve" | "replace" | "collapse";
}
export interface IDecimalFacets {
    enumeration?: string[];
    pattern?: string | RegExp;
    totalDigits?: number;
    fractionDigits?: number;
    minInclusive?: number;
    minExclusive?: number;
    maxInclusive?: number;
    maxExclusive?: number;
    whiteSpace?: "preserve" | "replace" | "collapse";
}
export interface IFloatFacets {
    enumeration?: string[];
    pattern?: string | RegExp;
    minExclusive?: number;
    minInclusive?: number;
    maxInclusive?: number;
    maxExclusive?: number;
    whiteSpace?: "preserve" | "replace" | "collapse";
}
export interface IDoubleFacets {
    enumeration?: string[];
    pattern?: string | RegExp;
    minExclusive?: number;
    minInclusive?: number;
    maxInclusive?: number;
    maxExclusive?: number;
    whiteSpace?: "preserve" | "replace" | "collapse";
}
export interface IDurationFacets {
    enumeration?: string[];
    pattern?: string | RegExp;
    minExclusive?: number;
    minInclusive?: number;
    maxInclusive?: number;
    maxExclusive?: number;
    whiteSpace?: "preserve" | "replace" | "collapse";
}
export interface IDateTimeFacets {
    enumeration?: string[];
    pattern?: string | RegExp;
    minExclusive?: number;
    minInclusive?: number;
    maxInclusive?: number;
    maxExclusive?: number;
    whiteSpace?: "preserve" | "replace" | "collapse";
}
export interface ITimeFacets {
    enumeration?: string[];
    pattern?: string | RegExp;
    minExclusive?: number;
    minInclusive?: number;
    maxInclusive?: number;
    maxExclusive?: number;
    whiteSpace?: "preserve" | "replace" | "collapse";
}
export interface IDateFacets {
    enumeration?: string[];
    pattern?: string | RegExp;
    minExclusive?: number;
    minInclusive?: number;
    maxInclusive?: number;
    maxExclusive?: number;
    whiteSpace?: "preserve" | "replace" | "collapse";
}
export interface IEffectiveFacets extends IBooleanFacets, IDateTimeFacets, IDateFacets, IDecimalFacets, IDoubleFacets, IDurationFacets, IFloatFacets, IStringFacets, ITimeFacets {
}
export declare class XsdAnySimpleType extends XsdSimpleType {
    readonly tsType: TSType[];
    readonly nativeName: string;
    constructor(tsType?: TSType[], nativeName?: string);
    processValue(invalue: any, facets?: IEffectiveFacets): string;
    validate(value: any, facets?: IEffectiveFacets): null | string[];
}
export declare class XsdComplexType extends XsdType {
    /**
     * Disallow usage of this type directly. Type is only used as a base in a derriving type.
     */
    abstract?: boolean;
    /**
     * Not implemented for validation.
     */
    block?: "#all" | Set<"extension" | "restriction">;
    /**
     * Disallow derriving types.
     */
    final?: "#all" | Set<"extension" | "restriction">;
    /**
     * Allow CDATA and TextNode to be interspersed throughout this type.
     */
    mixed?: boolean;
    content: XsdSimpleContent | XsdComplexContent | XsdOtherContent;
}
export declare class XsdUnion extends XsdSimpleType {
    memberTypes?: Set<TQName>;
    content: XsdRestriction | XsdList | XsdUnion;
}
export declare class XsdRestriction extends XsdAnnotable {
    id?: string;
    baseString: TQName;
    base: XsdAnySimpleType | XsdSimpleType | XsdComplexType;
    attributes?: Array<XsdAttribute | XsdAttributeGroup>;
    anyAttribute?: XsdAnyAttribute;
    facets?: IEffectiveFacets;
    content?: XsdSimpleType | XsdCollection;
}
export declare class XsdExtension extends XsdAnnotable {
    id?: string;
    baseString: TQName;
    base: XsdAnySimpleType | XsdSimpleType | XsdComplexType;
    attributes?: Array<XsdAttribute | XsdAttributeGroup>;
    anyAttribute?: XsdAnyAttribute;
    content?: XsdCollection;
}
export declare class XsdList extends XsdAnnotable {
    id?: string;
    /**
     * When itemType is set content should be the resolved QName.
     */
    itemType?: TQName;
    content?: XsdSimpleType;
}
export declare class XsdElement extends XsdAnnotable {
    /**
     * The localName of the element.
     */
    name: string;
}
declare const XsdAny_base: {
    new (...arg: any[]): {
        [x: string]: any;
        maxOccurs?: number;
        minOccurs?: number;
    };
} & typeof XsdAnnotable;
export declare class XsdAny extends XsdAny_base {
    /**
     * Namespaces for which elements are allowed. Default = "##any".
     */
    namespace?: "##any" | "##other" | "##local" | "##targetNamespace" | Set<"##targetNamespace" | "##local" | string>;
    /**
     * How to handle validation of child items. Default = "strict".
     */
    processContents?: "lax" | "skip" | "strict";
}
