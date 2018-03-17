import { XsdAnyAttribute, XsdAttribute, XsdAttributeGroup } from "./attributes";
import { XsdCollection } from "./collections";
import { XsdExtension, XsdRestriction } from "./common";
import { XsdAnnotable } from "./helpers";
export declare class XsdSimpleContent extends XsdAnnotable {
    id?: string;
    content: XsdRestriction | XsdExtension;
}
export declare class XsdComplexContent extends XsdAnnotable {
    id?: string;
    mixed?: boolean;
    content: XsdRestriction | XsdExtension;
}
export declare class XsdOtherContent {
    content?: XsdCollection;
    attributes?: Array<XsdAttribute | XsdAttributeGroup>;
    anyAttribute?: XsdAnyAttribute;
}
