/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @interface ObjectCastInterface
 */
import { ClassType } from "./types/ClassType";
import { CastOptions } from "./options/CastOptions";

export interface ObjectCastInterface<T = Record<string, any>> {
    cast(entity: ClassType<unknown>, options: CastOptions): T;
}
