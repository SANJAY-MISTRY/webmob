import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from '../components/SignUp';
import UserList from '../components/UserList';

function Index(props) {
    return (
        <Router>
            <Switch>
                <Route path ='/' component={SignUp} exact/>                
                <Route path ='/user-list' component={UserList} exact/>                
            </Switch>
        </Router>
    );
}

export default Index;