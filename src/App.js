import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import MainPage from './components/MainPage/MainPage';
import DatabasePage from './components/DatabasePage/DatabasePage';
import PageNotFound from './components/PageNotFound';

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={MainPage} />
                <Route path="/database" component={DatabasePage} />
                <Route component={PageNotFound} />
            </Switch>
        </Router>
    )
}