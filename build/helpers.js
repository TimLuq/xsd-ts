export const mixSourcable = (superclass) => class extends superclass {
};
export const mixNodeContents = (superclass) => class extends superclass {
};
export const mixOccurs = (superclass) => class extends superclass {
};
export class XsdAnnotable {
}
export class XsdDocumentation extends mixNodeContents(mixSourcable(Object)) {
}
export class XsdAppinfo extends mixNodeContents(mixSourcable(Object)) {
}
//# sourceMappingURL=helpers.js.map