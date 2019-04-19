import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from '../pages/Home'
import Header from '../components/Header'
import Login from '../pages/login/LoginComponent'
import Admin from '../pages/admin/AdminComponent'
import Dashboard from '../pages/admin/dashboard/Dashboard'

import './MainRouter.css'

class MainRouter extends Component {

    state = {
        header: true
    }

    componentDidMount () {
        if (window.location.pathname.indexOf('/admin') !== -1) {
            this.setState({
                header: false
            })
        }
    }

    staterFunc = (obj) => {
        console.log('lel')
        return this.setState(obj)
    }

    render() {
        return (
            <div>
                {this.state.header && (<Fragment><Header/>
                <div className="MainRouter-container">
                    <div className="MainRouter-main">
                        <Route exact path={"/website"} component={Home} />
                    </div>
                </div>
                <Route path={"/website/login"} component={Login}/>
                </Fragment>)
                }
                
                <Route path={"/website/admin"} component={() => <Dashboard parentStater = {this.staterFunc}/>}/>
            </div>
        );
    }
}

export default MainRouter;
