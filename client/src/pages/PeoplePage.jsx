import React, {useCallback, useEffect, useState} from 'react';
import {Loader} from '../components/Loader';
import {useHttp} from '../hooks/http.hook';
import {PeopleList} from '../components/PeopleList';
import {Search} from '../components/Search';
import {PersonContext} from '../context/PersonContext';

export const PeoplePage = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [update, setUpdate] = useState(false);
    const [people, setPeople] = useState([]);
    const {loading, request} = useHttp();

    const fetchPeople = useCallback(async () => {
        try {
            const fetched = await request('/api/person');

            setPeople(fetched);
        } catch (e) {

        }
    }, [request]);

    useEffect(() => {
        fetchPeople();
    }, [fetchPeople, update]);

    if (loading) {
        return <Loader/>;
    }

    return (
        <PersonContext.Provider value={{name, age, setName, setAge}}>
            <Search update={() => setUpdate(prevState => !prevState)}/>
            {!loading && <PeopleList people={people} update={() => setUpdate(prevState => !prevState)}/>}
        </PersonContext.Provider>
    );
};
