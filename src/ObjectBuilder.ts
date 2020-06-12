/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class ObjectBuilder
 */
import { ClassType } from "./types/ClassType";

export class ObjectBuilder<E> {

    private readonly object: never = {} as never;

    constructor(
        private readonly cls: ClassType<E>
    ) {
            Reflect.setPrototypeOf(this.object, this.cls.prototype);
    }

    public field(name: string, value: any) {
        Reflect.set(this.object, name, value);
    }

    public build() {
        return this.object;
    }
}
