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
    const [sortedPeople, setSortedPeople] = useState([]);

    const [elCount, setElCount] = useState(20);
    const [scrollY, setScrollY] = useState(0);

    const {loading, request} = useHttp();
    const message = useMessage();

    const fetchPeople = useCallback(async () => {
        try {
            const fetched = await request('/api/person');

            setPeople(fetched);
        } catch (e) {
            message(e);
        }
    }, [request, message]);

    const logIt = () => {
        setScrollY(window.pageYOffset);
    };

    const getScrollPercent = () => {
        const h = document.documentElement,
            b = document.body,
            st = 'scrollTop',
            sh = 'scrollHeight';

        return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
    };

    useEffect(() => {
        fetchPeople();
    }, [fetchPeople, update]);

    useEffect(() => {
        setElCount(20);

        setSortedPeople(people.filter(person => {
            return (!name.toLowerCase() && (isNaN(age) || age === ''))
                || (name.toLowerCase() && (isNaN(age) || age === '') && person.name.toLowerCase().startsWith(name.toLowerCase()))
                || (!name.toLowerCase() && !isNaN(age) && person.age === Number(age))
                || (name.toLowerCase() && !isNaN(age) && person.name.toLowerCase().startsWith(name.toLowerCase()) && person.age === Number(age));
        }));
    }, [people, name, age]);

    useEffect(() => {
        window.addEventListener('scroll', logIt);

        if (getScrollPercent() >= 90) {
            setElCount(prevState => prevState + 10);
        }

        return () => {
            window.removeEventListener('scroll', logIt);
        };
    }, [scrollY]);

    if (loading) {
        return <Loader/>;
    }

    return (
        <PersonContext.Provider value={{name, age, setName, setAge}}>
            <Search count={sortedPeople.length} update={() => setUpdate(prevState => !prevState)}/>
            <PeopleList people={sortedPeople.slice(0, elCount)} update={() => setUpdate(prevState => !prevState)}/>
        </PersonContext.Provider>
    );
};
