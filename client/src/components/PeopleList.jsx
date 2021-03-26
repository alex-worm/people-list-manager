import React, {useContext} from 'react';
import {PersonContext} from '../context/PersonContext';
import {useHttp} from '../hooks/http.hook';

export const PeopleList = ({people, update}) => {
    const person = useContext(PersonContext);
    const name = person.name.toLowerCase();
    const age = person.age.toLowerCase();
    const {request} = useHttp();

    const clickHandler = async id => {
        try {
            const data = await request(`/api/person/delete${id}`, 'DELETE', {id: id});

            update();
        } catch (e) {

        }
    };

    if (!people.length) {
        return <p className="center">No people yet</p>;
    }

    return (
        <table className="striped container">
            <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Age</th>
                <th className="right">Delete</th>
            </tr>
            </thead>

            <tbody>
            {people.map((person, index) => {
                if ((!name && !age)
                    || (name && !age && person.name.toLowerCase().startsWith(name))
                    || (!name && age && person.age == age)
                    || (name && age && person.name.toLowerCase().startsWith(name) && person.age == age)) {
                    return (
                        <tr key={person._id}>
                            <td>{index + 1}</td>
                            <td>{person.name}</td>
                            <td>{person.age}</td>
                            <td className="right">
                                <button className="waves-effect waves-light btn col s2"
                                        onClick={() => clickHandler(person._id)}>delete
                                </button>
                            </td>
                        </tr>
                    );
                }
            })}
            </tbody>
        </table>
    );
};
