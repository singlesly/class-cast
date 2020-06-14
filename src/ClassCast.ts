/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class ClassCast
 */
import { ClassCastInterface } from "./ClassCastInterface";
import { ClassType } from "./types/ClassType";
import { CastOptions } from "./options/CastOptions";
import { ObjectBuilder } from "./ObjectBuilder";

export class ClassCast implements ClassCastInterface {
    cast<E>(plain: Record<string, any>|Record<string, any>[], cls: ClassType<E>, options: CastOptions): E|E[] {

        if(Array.isArray(plain)) {
            return plain.map(item => this.cast(item, cls, options)) as E[];
        }

        const objectBuilder = new ObjectBuilder(cls as ClassType<E>);

        for(const field of options.fields) {
            if(field.class) {
                objectBuilder.field(field.name.local, this.cast(plain[field.name.external], field.class, field.options));
            } else {
                objectBuilder.field(field.name.local, plain[field.name.external]);
            }
        }

        return objectBuilder.build();
    }
}
