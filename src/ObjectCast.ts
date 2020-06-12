/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @class ObjectCast
 */
import { ObjectCastInterface } from "./ObjectCastInterface";
import { CastOptions } from "./options/CastOptions";
import { ObjectBuilder } from "./ObjectBuilder";

export class ObjectCast implements ObjectCastInterface {
    cast(entity: object, options: CastOptions): Record<string, any> {
        const obj = new ObjectBuilder();

        for(const field of options.fields) {
            if(!field.class) {
                obj.copyField(entity, field.name.external, field.name.local);
                continue;
            }

            if(Array.isArray(entity[field.name.local])) {
                const arr = entity[field.name.local].map(item => {
                    return this.cast(item, {
                        fields: field.options.fields,
                    });
                });
                obj.field(field.name.local, arr);
            } else {
                obj
                    .copyField(entity, field.name.external, field.name.local)
                    .setFieldPrototype(field.name.external, Object);
            }
        }

        return obj.build();
    }
}
