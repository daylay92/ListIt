import React, { Component } from 'react';
import WithClass from '../../hocs/WithClass';
import classes from './Dashboard.module.css';

class Dashboard extends Component {
    render(){
        return (
            <WithClass class={classes.dashboardWrapper}>
            </WithClass>
        );
    }
}

export default Dashboard;