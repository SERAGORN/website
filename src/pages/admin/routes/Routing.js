import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


// import Home from '../pages/Home'
// import Header from '../components/Header'
// import Login from '../pages/login/LoginComponent'
import Admin from '../AdminComponent'
import Groups from '../Groups'


class TabRouting extends Component {
    render () {
        return (
            <Fragment>
                {/* <Route path={"/website/login"} component={Login}/> */}
                <Route exact path={"/website/admin"} component={Admin}/>
                <Route path={"/website/admin/groups"} component={Groups}/>
            </Fragment>
        )
    }

}
export default TabRouting