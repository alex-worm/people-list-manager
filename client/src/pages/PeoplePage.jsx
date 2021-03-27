import React, {useCallback, useEffect, useState} from 'react';
import {Loader} from '../components/Loader';
import {useHttp} from '../hooks/http.hook';
import PeopleList from '../components/PeopleList';
import {Search} from '../components/Search';
import {PersonContext} from '../context/PersonContext';
import {useMessage} from '../hooks/message.hook';

export const PeoplePage = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [update, setUpdate] = useState(false);
    const [people, setPeople] = useState([]);

    const {loading, request} = useHttp();
    const message = useMessage();

    const fetchPeople = useCallback(async () => {
        try {
            const fetched = await request('/api/person');

            setPeople(fetched);
        } catch (e) {
            message(e);
        }
    }, [request]);

    useEffect(() => {
        fetchPeople();
    }, [fetchPeople, update]);

    return (
        <PersonContext.Provider value={{name, age, setName, setAge}}>
            <Search update={() => setUpdate(prevState => !prevState)}/>
            {loading ? <Loader/> : <PeopleList people={people} update={() => setUpdate(prevState => !prevState)}/>}
        </PersonContext.Provider>
    );
};
