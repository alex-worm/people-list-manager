import React, {useContext} from 'react';
import {useHttp} from '../hooks/http.hook';
import {PersonContext} from '../context/PersonContext';

export const Search = ({update}) => {
    const {request} = useHttp();

    const person = useContext(PersonContext);

    const clickHandler = async event => {
        try {
            if (Number.isNaN(person.age)) return;

            const data = await request('/api/person/create', 'POST', {name: person.name, age: person.age});
            person.setName('');
            person.setAge('');

            update();
            window.M.updateTextFields();
        } catch (e) {

        }
    };

    return (
        <div className="row container valign-wrapper">
            <div className="input-field col s8">
                <input className="validate"
                       id="name"
                       type="text"
                       value={person.name}
                       onChange={event => person.setName(event.target.value)}/>
                <label htmlFor="name">Enter name</label>
            </div>
            <div className="input-field col s2">
                <input className="validate"
                       id="age"
                       type="text"
                       value={person.age}
                       onChange={event => person.setAge(event.target.value)}/>
                <label htmlFor="age">Enter age</label>
            </div>
            <button className="waves-effect waves-light btn col s2" onClick={clickHandler}>add</button>
        </div>
    );
};
