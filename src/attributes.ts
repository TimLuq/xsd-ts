
import { XsdAnySimpleType, XsdSimpleType } from "./common";
import { TNCName, TQName, XsdAnnotable } from "./helpers";

export class XsdAttribute extends XsdAnnotable {
    public id?: string;
    public default?: string;
    public fixed?: string;
    public form?: "qualified" | "unqualified";
    public name?: TNCName;
    public ref?: TQName;
    public type?: TQName;
    public use?: "optional" | "prohibited" | "required";

    public content?: XsdAnySimpleType | XsdSimpleType;
}

export class XsdAttributeGroup extends XsdAnnotable {
    public id?: string;
    public name?: TNCName;
    public ref?: TQName;
    public attributes?: Array<XsdAttribute | XsdAttributeGroup>;
    public anyAttribute?: XsdAnyAttribute;
}

export class XsdAnyAttribute extends XsdAnnotable {
    public id?: string;
    public namespace?: "##any" | "##other" | "##local" | "##targetNamespace" | Set<"##targetNamespace" | "##local" | string>;
    public processContents?: "strict" | "lax" | "skip";
}
