/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class ArraySeth
 */
export class ArraySeth extends Array {

    public static isOneOf(target: unknown, values: unknown[]): boolean {
        return values.some(value => value === target);
    }

}
