import { XsdAnySimpleType, XsdSimpleType } from "./common";
import { TNCName, TQName, XsdAnnotable } from "./helpers";
export declare class XsdAttribute extends XsdAnnotable {
    id?: string;
    default?: string;
    fixed?: string;
    form?: "qualified" | "unqualified";
    name?: TNCName;
    ref?: TQName;
    type?: TQName;
    use?: "optional" | "prohibited" | "required";
    content?: XsdAnySimpleType | XsdSimpleType;
}
export declare class XsdAttributeGroup extends XsdAnnotable {
    id?: string;
    name?: TNCName;
    ref?: TQName;
    attributes?: Array<XsdAttribute | XsdAttributeGroup>;
    anyAttribute?: XsdAnyAttribute;
}
export declare class XsdAnyAttribute extends XsdAnnotable {
    id?: string;
    namespace?: "##any" | "##other" | "##local" | "##targetNamespace" | Set<"##targetNamespace" | "##local" | string>;
    processContents?: "strict" | "lax" | "skip";
}
