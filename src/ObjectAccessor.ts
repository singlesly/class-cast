/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class ObjectAccessor
 */
export class ObjectAccessor {
    constructor(
        private readonly obj: never
    ) {}

    public getValue(field: string) {
        return Reflect.get(this.obj, field);
    }
}
