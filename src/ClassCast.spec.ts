/**
 * @package
 * @author Artem Ilinykh devsinglesly@gmail.com
 */
import { ClassCast } from "./ClassCast";

describe("Test test", () => {

    describe("class cast test", () => {
        const obj = {
            test: "hello",
            array: [1,2,3],
            date: "2019-04-04",
            dateObj: new Date(),
            sub: {
                hey: "world"
            },
            children: [
                {title: "child 1"},
                {title: "child 2"}
            ]
        };

        class Child {
            title: string;
        }

        class Sub {
            hey: string;
        }

        class Obj {
            test: string;
            array: number[];
            date: Date;
            sub?: Sub;
            children: Child[];
        }

        const classCast = new ClassCast();


        it("should be instanceof class", () => {
            const entity = classCast.cast(obj, Obj, {
                fields: []
            });

            expect(entity).toBeInstanceOf(Obj)
        })

        it("should be undefined field on unspecified fields", () => {

            const entity = classCast.cast(obj, Obj, {
                fields: []
            }) as Obj;

            expect(entity.test).toBeUndefined();
            expect(entity.array).toBeUndefined();
            expect(entity.date).toBeUndefined();
            expect(entity.sub).toBeUndefined();
        });

        it("should be fill specified fields", () => {
            const entity = classCast.cast(obj, Obj, {
                fields: [
                    {
                        name: {
                            external: "test",
                            local: "test"
                        },
                        options: {
                            fields: []
                        }
                    },
                    {
                        name: {
                            external: "array",
                            local: "array"
                        },
                        options: {
                            fields: []
                        },
                    },
                    {
                        name: {
                            external: "dateObj",
                            local: "date"
                        },
                        options: {
                            fields: []
                        }
                    },
                    {
                        name: {
                            external: "sub",
                            local: "sub"
                        },
                        options: {
                            fields: [],
                        },
                    }
                ]
            }) as Obj;

            expect(entity.test).toBe(obj.test);
            expect(entity.array).toBe(obj.array);
            expect(entity.date).toBe(obj.dateObj);
            expect(entity.sub).toBe(obj.sub);
        });

        it("sub types should be instance of specify type", () => {
            const entity = classCast.cast(obj, Obj, {
                fields: [
                    {
                        name: {
                            external: "sub",
                            local: "sub"
                        },
                        class: Sub,
                        options: {
                            fields: [],
                        }
                    }
                ]
            }) as Obj;

            expect(entity.sub).toBeInstanceOf(Sub);
        });

        it("sub types should be instance of specify type", () => {
            const entity = classCast.cast(obj, Obj, {
                fields: [
                    {
                        name: {
                            external: "sub",
                            local: "sub"
                        },
                        class: Sub,
                        options: {
                            fields: [
                                {
                                    name: {
                                        local: "hey",
                                        external: "hey"
                                    },
                                    options: {
                                        fields: []
                                    }
                                }
                            ],
                        }
                    }
                ]
            }) as Obj;

            expect(entity.sub).toBeInstanceOf(Sub);
            expect(entity.sub.hey).toBe(obj.sub.hey);
        });

        it("should be children instanceof specify child class", () => {
            const entity = classCast.cast(obj, Obj, {
                fields: [
                    {
                        name: {
                            external: "children",
                            local: "children"
                        },
                        class: Child,
                        options: {
                            fields: [
                                {
                                    name: {
                                        local: "title",
                                        external: "title"
                                    },
                                    options: {
                                        fields: []
                                    },
                                }
                            ],
                        }
                    }
                ]
            }) as Obj;

            expect(entity.children[0]).toBeInstanceOf(Child);
            expect(entity.children[1]).toBeInstanceOf(Child);
        })
    });


});
