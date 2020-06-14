/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 */
import { ObjectCast } from "./ObjectCast";

describe("ObjectCast test", () => {
    class Obj {
        name: string;
        age: number;
        date: Date;
        sub?: Sub;
        children: Child[];
    }

    class Sub {
        title: string;
    }

    class Child {
        value: number;
    }

    const entity = new Obj();
    entity.children = [
        new Child(),
        new Child(),
    ];
    entity.children[0].value = 1;
    entity.children[1].value = 10;
    entity.name = "string";
    entity.age = 18;
    entity.sub = new Sub();
    entity.sub.title = "test.sub";
    entity.date = new Date();

    const objectCast = new ObjectCast();

    it("should be cast to object", () => {
        const obj = objectCast.cast(entity, {
            fields: []
        });

        expect(obj).toBeInstanceOf(Object);
        expect(obj).not.toBeInstanceOf(Obj);
    });

    it("should be fill specified fields", () => {
        const obj = objectCast.cast(entity, {
            fields: [
                {
                    name: { external: "name", local: "name" },
                    options: {
                        fields: []
                    }
                },
                {
                    name: { external: "age", local: "age" },
                    options: {
                        fields: []
                    }
                },
                {
                    name: { external: "date", local: "date" },
                    options: {
                        fields: []
                    }
                }
            ]
        });

        expect(obj.name).toBe(entity.name);
        expect(obj.age).toBe(entity.age);
        expect(obj.date).toBe(entity.date);
    });

    it("should be drop prototypes of sub types",  () => {
        const obj = objectCast.cast(entity, {
            fields: [
                {
                    name: { external: "sub", local: "sub" },
                    class: Sub,
                    options: {
                        fields: []
                    }
                }
            ]
        });

        expect(obj.sub).not.toBeInstanceOf(Sub);
        expect(obj.sub).toBeInstanceOf(Object);
    });

    it("should be drop prototypes of sub types in array",  () => {
        const obj = objectCast.cast(entity, {
            fields: [
                {
                    name: { external: "children", local: "children" },
                    class: Child,
                    options: {
                        fields: []
                    }
                }
            ]
        });

        expect(obj.children[0]).not.toBeInstanceOf(Child);
        expect(obj.children[0]).toBeInstanceOf(Object);

        expect(obj.children[1]).not.toBeInstanceOf(Child);
        expect(obj.children[1]).toBeInstanceOf(Object);
    });
});
