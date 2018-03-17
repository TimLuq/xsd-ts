
import { XsdAnyAttribute, XsdAttribute, XsdAttributeGroup } from "./attributes";
import { XsdCollection } from "./collections";
import { XsdComplexContent, XsdOtherContent, XsdSimpleContent } from "./contents";
import { mixOccurs, TQName, XsdAnnotable } from "./helpers";

export class XsdType extends XsdAnnotable {
}

export abstract class XsdSimpleType extends XsdType {
    /**
     * Disallow derriving types.
     */
    public final?: "#all" | Set<"list" | "union" | "restriction">;

    public content: XsdRestriction | XsdList | XsdUnion | XsdAnySimpleType;
}

export type TSType = "boolean" | "string" | "number" | "Date";

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

export interface IEffectiveFacets extends IBooleanFacets, IDateTimeFacets, IDateFacets, IDecimalFacets, IDoubleFacets, IDurationFacets, IFloatFacets, IStringFacets, ITimeFacets {}

export class XsdAnySimpleType extends XsdSimpleType {
    public constructor(public readonly tsType: TSType[] = ["string"], public readonly nativeName: string = "anySimpleType") {
        super();
        this.content = this;
    }

    public processValue(invalue: any, facets?: IEffectiveFacets): string {
        if ((this.tsType as string[]).indexOf(typeof invalue) === -1) {
            throw [new TypeError("Expects the value to be one of the types " + JSON.stringify(this.tsType) + " but value was " + typeof invalue)];
        }
        let value: string = invalue.toString();
        const errors: TypeError[] = [];

        switch (facets.whiteSpace || "preserve") {
            case "preserve": break;
            case "replace": value = value.replace(/[\t\n\r]/g, " "); break;
            case "collapse": value = value.trim().replace(/[\t\n\r ]+/g, " ");
            default: errors.push(new TypeError("Unexpected facets value for whiteSpace: " + JSON.stringify(facets.whiteSpace))); break;
        }

        if (facets.pattern) {
            const pattern: RegExp = typeof facets.pattern === "string" ? new RegExp("^" + facets.pattern + "$") : facets.pattern;
            if (!pattern.test(value)) {
                errors.push(new TypeError("Pattern " + pattern.toString() + " is not a match for value " + JSON.stringify(value)));
            }
        }

        if (errors.length !== 0) {
            throw errors;
        }
        return value;
    }

    public validate(value: any, facets?: IEffectiveFacets): null | string[] {
        try {
            this.processValue(value, facets);
            return null;
        } catch (err) {
            if (Array.isArray(err)) {
                return err.map((x) => x.toString());
            }
            throw err;
        }
    }
}

export class XsdComplexType extends XsdType {
    /**
     * Disallow usage of this type directly. Type is only used as a base in a derriving type.
     */
    public abstract?: boolean = false;
    /**
     * Not implemented for validation.
     */
    public block?: "#all" | Set<"extension" | "restriction">;
    /**
     * Disallow derriving types.
     */
    public final?: "#all" | Set<"extension" | "restriction">;
    /**
     * Allow CDATA and TextNode to be interspersed throughout this type.
     */
    public mixed?: boolean;

    public content: XsdSimpleContent | XsdComplexContent | XsdOtherContent;
}

export class XsdUnion extends XsdSimpleType {
    public memberTypes?: Set<TQName>;

    public content: XsdRestriction | XsdList | XsdUnion;
}

export class XsdRestriction extends XsdAnnotable {
    public id?: string;
    public baseString: TQName;
    public base: XsdAnySimpleType | XsdSimpleType | XsdComplexType;
    public attributes?: Array<XsdAttribute | XsdAttributeGroup>;
    public anyAttribute?: XsdAnyAttribute;
    public facets?: IEffectiveFacets;
    public content?: XsdSimpleType | XsdCollection;
}

export class XsdExtension extends XsdAnnotable {
    public id?: string;
    public baseString: TQName;
    public base: XsdAnySimpleType | XsdSimpleType | XsdComplexType;
    public attributes?: Array<XsdAttribute | XsdAttributeGroup>;
    public anyAttribute?: XsdAnyAttribute;
    public content?: XsdCollection;
}

export class XsdList extends XsdAnnotable {
    public id?: string;
    /**
     * When itemType is set content should be the resolved QName.
     */
    public itemType?: TQName;
    public content?: XsdSimpleType;
}

export class XsdElement extends XsdAnnotable {
    /**
     * The localName of the element.
     */
    public name: string;
}

export class XsdAny extends mixOccurs(XsdAnnotable) {
    /**
     * Namespaces for which elements are allowed. Default = "##any".
     */
    public namespace?: "##any" | "##other" | "##local" | "##targetNamespace" | Set<"##targetNamespace" | "##local" | string>;
    /**
     * How to handle validation of child items. Default = "strict".
     */
    public processContents?: "lax" | "skip" | "strict";
}
