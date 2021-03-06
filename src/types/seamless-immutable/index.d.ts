/** Declaration file generated by dts-gen */

export = seamless_immutable;

declare function seamless_immutable(obj: any, options: any, stackRemaining: any): any;

declare namespace seamless_immutable {
    class ImmutableError {
        constructor(message: any);

    }

    // Circular reference from seamless_immutable
    const from: any;

    function asMutable(...args: any[]): any;

    function asObject(...args: any[]): any;

    function flatMap(...args: any[]): any;

    function getIn(...args: any[]): any;

    function isImmutable(target: any): any;

    function merge(...args: any[]): any;

    function replace(...args: any[]): any;

    function set(...args: any[]): any;

    function setIn(...args: any[]): any;

    function update(...args: any[]): any;

    function updateIn(...args: any[]): any;

    function without(...args: any[]): any;

}

