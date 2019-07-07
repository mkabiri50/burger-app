import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems'
import Logo from '../../Logo/Logo'
import classes from './SideDrawer.css';
import Bachdrop from './../../Ui/Backdrop/Backdrop';
const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer , classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer , classes.Open]
    }

    return (
        <React.Fragment>
            <Bachdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}
            onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems
                    isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </React.Fragment>

    )
}
export default sideDrawer;
