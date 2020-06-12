/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 * @interface CastOptions
 */
import { ClassType } from "../types/ClassType";

export interface CastOptions {
    fields: {
        name: {
            external: string;
            local: string;
        },
        class?: ClassType<unknown>,
        options: CastOptions;
    } [];
}
