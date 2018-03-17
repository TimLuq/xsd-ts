
import { XsdAnyAttribute, XsdAttribute, XsdAttributeGroup } from "./attributes";
import { XsdCollection } from "./collections";
import { XsdExtension, XsdRestriction } from "./common";
import { TNCName, TQName, XsdAnnotable } from "./helpers";

export class XsdSimpleContent extends XsdAnnotable {
    public id?: string;
    public content: XsdRestriction | XsdExtension;
}

export class XsdComplexContent extends XsdAnnotable {
    public id?: string;
    public mixed?: boolean;
    public content: XsdRestriction | XsdExtension;
}

export class XsdOtherContent {
    public content?: XsdCollection;
    public attributes?: Array<XsdAttribute | XsdAttributeGroup>;
    public anyAttribute?: XsdAnyAttribute;
}
