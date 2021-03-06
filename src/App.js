import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import Layout from './hoc/Lyout/Layout';
import BurgerBuilder from './containers/BurgerBulder/BurgerBuilder';
import CheckOut from './containers/CheckOut/CheckOut';
import Orders from './containers/CheckOut/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
class App extends Component {
  componentDidMount() {
    this.props.onAutoAuth();
  }
 
 
  render() {
    let routes = null;
    if (this.props.isAuthenticated) {
      routes=(
        <Switch>
        <Route path="/checkout" component={CheckOut} />
        <Route path="/orders" component={Orders} />
        <Route path="/auth" component={Auth} />
        <Route path="/logpot" component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
      )
    } else {
      routes=(
        <Switch>
        <Route path="/checkout" component={CheckOut} />
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
      )
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = state=>{
  return{
    isAuthenticated: state.auth.token !==null
  }
}
const mapDispatchToProps = dispatch=>{
  return{
    onAutoAuth :()=> dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
