import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

/**
 * Import all page components here
 */
import MapPage from './components/MapPage';
import HomePage from './components/HomePage'
import AddOccurrencePage from './components/AddOccurrencePage'

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default class Routes extends React.Component {
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path="/map">
                        <MapPage/>       
                    </Route>
                    <Route path="/add">
                        <AddOccurrencePage/>
                    </Route>
                    <Route>
                        <HomePage/>
                    </Route>
                </Switch>
            </BrowserRouter>
        )
    }
}