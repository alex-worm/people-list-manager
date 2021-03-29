import React, {useContext} from 'react';
import {useHttp} from '../hooks/http.hook';
import {PersonContext} from '../context/PersonContext';
import {useMessage} from '../hooks/message.hook';

export const Search = ({count, update}) => {
    const {request} = useHttp();
    const message = useMessage();

    const person = useContext(PersonContext);

    const clickHandler = async () => {
        try {
            if (!person.name || !Number(person.age) || Number(person.name)) {
                message('Incorrect input');
                return;
            }
            await request('/api/person/create', 'POST', {name: person.name, age: person.age});
            person.setName('');
            person.setAge('');

            update();
            window.M.updateTextFields();
        } catch (e) {
            message(e);
        }
    };

    return (
        <div className="container">
            <div className="row valign-wrapper">
                <div className="input-field col s6 m8">
                    <input className="validate"
                           id="name"
                           type="text"
                           value={person.name}
                           onChange={event => person.setName(event.target.value)}/>
                    <label htmlFor="name">Enter name</label>
                </div>
                <div className="input-field col s4 m2">
                    <input className="validate"
                           id="age"
                           type="text"
                           value={person.age}
                           onChange={event => person.setAge(event.target.value)}/>
                    <label htmlFor="age">Enter age</label>
                </div>
                <div className="col s3 m2">
                    <button className="waves-effect waves-light btn col s12" onClick={clickHandler}>add</button>
                </div>
            </div>
            <div className="row left-align flow-text">Found {count} records</div>
        </div>
    );
};
