# Class Cast

Library for cast class to plain objects.

### Interface

```typescript

const obj = {
    string: "string",
    number: 10,
    date: new Date(),
    boolean: false,
    array: [ 1,2,3 ],
}

class Obj {
    string: string;
    number: number;
    date: Date;
    boolean: boolean;
    array: number[]
}

const classCast = new ClassCast();
const entity = classCast.cast(obj, Obj);
const plain = classCast.plain(entity);

```
