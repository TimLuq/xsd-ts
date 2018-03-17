export declare type TQName = string;
export declare type TNCName = string;
export declare type Cons<T = any> = new (...arg: any[]) => any;
export declare const mixSourcable: <T extends Cons<any> = Cons<any>>(superclass: T) => {
    new (...arg: any[]): {
        [x: string]: any;
        source?: string;
    };
} & T;
export declare const mixNodeContents: <T extends Cons<any> = Cons<any>>(superclass: T) => {
    new (...arg: any[]): {
        [x: string]: any;
        content: Node[];
    };
} & T;
export declare const mixOccurs: <T extends Cons<any> = Cons<any>>(superclass: T) => {
    new (...arg: any[]): {
        [x: string]: any;
        maxOccurs?: number;
        minOccurs?: number;
    };
} & T;
export declare class XsdAnnotable {
    annotation?: Array<XsdDocumentation | XsdAppinfo>;
}
declare const XsdDocumentation_base: {
    new (...arg: any[]): {
        [x: string]: any;
        content: Node[];
    };
} & {
    new (...arg: any[]): {
        [x: string]: any;
        source?: string;
    };
} & ObjectConstructor;
export declare class XsdDocumentation extends XsdDocumentation_base {
    lang?: string;
}
declare const XsdAppinfo_base: {
    new (...arg: any[]): {
        [x: string]: any;
        content: Node[];
    };
} & {
    new (...arg: any[]): {
        [x: string]: any;
        source?: string;
    };
} & ObjectConstructor;
export declare class XsdAppinfo extends XsdAppinfo_base {
}
