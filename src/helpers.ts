export type TQName = string;
export type TNCName = string;

export type Cons<T = any> = new(...arg: any[]) => any;
export const mixSourcable = <T extends Cons = Cons>(superclass: T) => class extends superclass {
    public source?: string;
};
export const mixNodeContents = <T extends Cons = Cons>(superclass: T) => class extends superclass {
    public content: Node[];
};
export const mixOccurs = <T extends Cons = Cons>(superclass: T) => class extends superclass {
    /**
     * Max occurances. NaN for unbounded. Default = 1.
     */
    public maxOccurs?: number;
    /**
     * Min iccurances. 0 for optional. Default = 1.
     */
    public minOccurs?: number;
};

export class XsdAnnotable {
    public annotation?: Array<XsdDocumentation | XsdAppinfo>;
}

export class XsdDocumentation extends mixNodeContents(mixSourcable(Object)) {
    public lang?: string;
}

export class XsdAppinfo extends mixNodeContents(mixSourcable(Object)) {

}
