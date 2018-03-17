import { mixOccurs, XsdAnnotable } from "./helpers";
export class XsdType extends XsdAnnotable {
}
export class XsdSimpleType extends XsdType {
}
export class XsdAnySimpleType extends XsdSimpleType {
    constructor(tsType = ["string"], nativeName = "anySimpleType") {
        super();
        this.tsType = tsType;
        this.nativeName = nativeName;
        this.content = this;
    }
    processValue(invalue, facets) {
        if (this.tsType.indexOf(typeof invalue) === -1) {
            throw [new TypeError("Expects the value to be one of the types " + JSON.stringify(this.tsType) + " but value was " + typeof invalue)];
        }
        let value = invalue.toString();
        const errors = [];
        switch (facets.whiteSpace || "preserve") {
            case "preserve": break;
            case "replace":
                value = value.replace(/[\t\n\r]/g, " ");
                break;
            case "collapse": value = value.trim().replace(/[\t\n\r ]+/g, " ");
            default:
                errors.push(new TypeError("Unexpected facets value for whiteSpace: " + JSON.stringify(facets.whiteSpace)));
                break;
        }
        if (facets.pattern) {
            const pattern = typeof facets.pattern === "string" ? new RegExp("^" + facets.pattern + "$") : facets.pattern;
            if (!pattern.test(value)) {
                errors.push(new TypeError("Pattern " + pattern.toString() + " is not a match for value " + JSON.stringify(value)));
            }
        }
        if (errors.length !== 0) {
            throw errors;
        }
        return value;
    }
    validate(value, facets) {
        try {
            this.processValue(value, facets);
            return null;
        }
        catch (err) {
            if (Array.isArray(err)) {
                return err.map((x) => x.toString());
            }
            throw err;
        }
    }
}
export class XsdComplexType extends XsdType {
    constructor() {
        super(...arguments);
        /**
         * Disallow usage of this type directly. Type is only used as a base in a derriving type.
         */
        this.abstract = false;
    }
}
export class XsdUnion extends XsdSimpleType {
}
export class XsdRestriction extends XsdAnnotable {
}
export class XsdExtension extends XsdAnnotable {
}
export class XsdList extends XsdAnnotable {
}
export class XsdElement extends XsdAnnotable {
}
export class XsdAny extends mixOccurs(XsdAnnotable) {
}
//# sourceMappingURL=common.js.map