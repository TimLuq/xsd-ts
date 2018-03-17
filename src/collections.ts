
import { XsdAny, XsdElement } from "./common";
import { mixOccurs, XsdAnnotable } from "./helpers";

export type XsdCollection = XsdGroup | XsdAll | XsdChoice | XsdSequence;

export class XsdGroup extends mixOccurs(XsdAnnotable) {
    public content: XsdAll | XsdChoice | XsdSequence;
}

export class XsdAll extends XsdAnnotable {
    public maxOccurs?: 1;
    /**
     * Default = 1
     */
    public minOccurs?: 0 | 1;

    public content: XsdElement[];
}

export class XsdChoice extends mixOccurs(XsdAnnotable) {
    public content: Array<XsdElement | XsdGroup | XsdChoice | XsdSequence | XsdAny>;
}

export class XsdSequence extends mixOccurs(XsdAnnotable) {
    public content: Array<XsdElement | XsdGroup | XsdChoice | XsdSequence | XsdAny>;
}
