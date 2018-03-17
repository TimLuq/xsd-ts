(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./helpers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const helpers_1 = require("./helpers");
    class XsdType extends helpers_1.XsdAnnotable {
    }
    exports.XsdType = XsdType;
    class XsdSimpleType extends XsdType {
    }
    exports.XsdSimpleType = XsdSimpleType;
    class XsdAnySimpleType extends XsdSimpleType {
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
    exports.XsdAnySimpleType = XsdAnySimpleType;
    class XsdComplexType extends XsdType {
        constructor() {
            super(...arguments);
            /**
             * Disallow usage of this type directly. Type is only used as a base in a derriving type.
             */
            this.abstract = false;
        }
    }
    exports.XsdComplexType = XsdComplexType;
    class XsdUnion extends XsdSimpleType {
    }
    exports.XsdUnion = XsdUnion;
    class XsdRestriction extends helpers_1.XsdAnnotable {
    }
    exports.XsdRestriction = XsdRestriction;
    class XsdExtension extends helpers_1.XsdAnnotable {
    }
    exports.XsdExtension = XsdExtension;
    class XsdList extends helpers_1.XsdAnnotable {
    }
    exports.XsdList = XsdList;
    class XsdElement extends helpers_1.XsdAnnotable {
    }
    exports.XsdElement = XsdElement;
    class XsdAny extends helpers_1.mixOccurs(helpers_1.XsdAnnotable) {
    }
    exports.XsdAny = XsdAny;
});
//# sourceMappingURL=common.js.map