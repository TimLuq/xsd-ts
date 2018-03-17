import { XsdAny, XsdElement } from "./common";
import { XsdAnnotable } from "./helpers";
export declare type XsdCollection = XsdGroup | XsdAll | XsdChoice | XsdSequence;
declare const XsdGroup_base: {
    new (...arg: any[]): {
        [x: string]: any;
        maxOccurs?: number;
        minOccurs?: number;
    };
} & typeof XsdAnnotable;
export declare class XsdGroup extends XsdGroup_base {
    content: XsdAll | XsdChoice | XsdSequence;
}
export declare class XsdAll extends XsdAnnotable {
    maxOccurs?: 1;
    /**
     * Default = 1
     */
    minOccurs?: 0 | 1;
    content: XsdElement[];
}
declare const XsdChoice_base: {
    new (...arg: any[]): {
        [x: string]: any;
        maxOccurs?: number;
        minOccurs?: number;
    };
} & typeof XsdAnnotable;
export declare class XsdChoice extends XsdChoice_base {
    content: Array<XsdElement | XsdGroup | XsdChoice | XsdSequence | XsdAny>;
}
declare const XsdSequence_base: {
    new (...arg: any[]): {
        [x: string]: any;
        maxOccurs?: number;
        minOccurs?: number;
    };
} & typeof XsdAnnotable;
export declare class XsdSequence extends XsdSequence_base {
    content: Array<XsdElement | XsdGroup | XsdChoice | XsdSequence | XsdAny>;
}
