/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @interface ClassCastInterface
 */
import { ClassType } from "./types/ClassType";
import { CastOptions } from "./options/CastOptions";

export interface ClassCastInterface {
    cast<E>(plain: Record<string, any>, cls: ClassType<E>, options: CastOptions): E|E[];
}
