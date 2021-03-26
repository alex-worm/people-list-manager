import {createContext} from 'react';

function foo() {
}

export const PersonContext = createContext({
    name: null,
    age: null,
    setName: foo,
    setAge: foo
});
