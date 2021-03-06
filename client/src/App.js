import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import 'materialize-css';
import {useRoutes} from './routes';

function App() {
    const routes = useRoutes();

    return (
        <Router>
            <div className="container center">
                {routes}
            </div>
        </Router>
    );
}

export default App;
