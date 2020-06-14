# Class Cast

Library for cast class to plain objects.

### Interface Class To Plain Object

#### Native fields

```typescript
import { ObjectCast } from "class-cast"
class User {
    createdAt: Date = new Date();
    age: number = 10;
    name: string = "string";
    billing: object = {
        card: "1827-2018-1092-8389"
    };
    addresses: object[] = [
        { st: "Park", zip: 89999 },
        { st: "Palace", zip: 999999 }
    ];
}

const user = new User();

const classCast = new ObjectCast();
const obj = classCast.cast(user, {
    fields: [
        { 
            name: { external: "timestamp", local: "createdAt" },
            options: {
                fields: []
            }   
        },
    ]   
});
```

obj now present 
```typescript
{
    timestamp: Date("2020-06-14T04:50:25.300Z")
}
```

describe another fields to full cast


#### Options reference

* `fields` array for describe rules to cast field

#### Fields reference
* `name.external` plain object field name
* `name.local` field name in class 
* `class` class type to cast. Not specified mean a native type
* `options` child options for describe sub field in class 

```typescript
interface CastOptions {
    fields: {
        name: {
            external: string;
            local: string;
        },
        class?: ClassType<unknown>,
        options: CastOptions;
    } [];
}
```
