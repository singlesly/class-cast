/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class ObjectBuilder
 */
import { ClassType } from "./types/ClassType";

export class ObjectBuilder<E> {

    private readonly object: never = {} as never;

    constructor(
        private readonly cls?: ClassType<E>
    ) {
        if(cls) {
            Reflect.setPrototypeOf(this.object, this.cls.prototype);
        }
    }

    public field(name: string, value: any): this {
        Reflect.set(this.object, name, value);
        return this;
    }

    public copyField(target: object, source: string, dist: string): this {
        const value = Reflect.get(target, source);
        this.field(dist, value);
        return this;
    }

    public setFieldPrototype(field: string, cls: ClassType<unknown>): this {
        Reflect.setPrototypeOf(this.object[field], cls.prototype);
        return this;
    }

    public build() {
        return this.object;
    }
}
