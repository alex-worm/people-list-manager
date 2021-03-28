import React from 'react';
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';

const PeopleList = ({people, update}) => {
    const {request} = useHttp();
    const message = useMessage();

    const clickHandler = async id => {
        try {
            await request(`/api/person/delete${id}`, 'DELETE', {id: id});

            update();
        } catch (e) {
            message(e);
        }
    };

    if (!people.length) {
        return null;
    }

    return (
        <table className="striped container">
            <thead>
            <tr>
                <th style={{width: '10%'}}>#</th>
                <th style={{width: '50%'}}>Name</th>
                <th style={{width: '30%'}}>Age</th>
                <th style={{width: '10%'}}>Delete</th>
            </tr>
            </thead>

            <tbody>
            {people.map((person, index) => {
                return (
                    <tr key={person._id}>
                        <td>{index + 1}</td>
                        <td>{person.name}</td>
                        <td>{person.age}</td>
                        <td>
                            <button className="waves-effect waves-light btn"
                                    onClick={() => clickHandler(person._id)}>delete
                            </button>
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
};

export default PeopleList;
