import React from 'react';
import {useHttp} from '../hooks/http.hook';

const PeopleList = ({people, update}) => {
    const {request} = useHttp();

    const clickHandler = async id => {
        try {
            await request(`/api/person/delete${id}`, 'DELETE', {id: id});

            update();
        } catch (e) {

        }
    };

    if (!people.length) {
        return <p className="center col s12">No people yet</p>;
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
            })}
            </tbody>
        </table>
    );
};

export default PeopleList;
