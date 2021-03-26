import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {PeoplePage} from './pages/PeoplePage';

export const useRoutes = () => {
    return (
        <Switch>
            <Route path="/" exact>
                <PeoplePage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    );
};
