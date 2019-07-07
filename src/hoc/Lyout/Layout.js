import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
class Layout extends Component {
    state = {
        showSD: false
    }
    sdCloseHandler = () => {
        this.setState({ showSD: false });
    }
    sdToggleHandler = () => {
        this.setState((prevState) => {
            return { showSD: !prevState.showSD };
        }
        );
    }

    render() {
        return (
            <React.Fragment>
                <Toolbar
                    drawerToggleclicked={this.sdToggleHandler}
                    isAuth={this.props.isAuthenticated} />
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSD}
                    closed={this.sdCloseHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);