import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
// import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import Event from './containers/Event/Event';

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render () {
    let routes = (
      <Switch>
        <Route path="/event" component={Event} />
        <Route path="/auth" component={Auth} />
        {/* <Route path="/" exact component={BurgerBuilder} /> */}
        <Redirect to="/auth" />
      </Switch>
    );

    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/event" component={Event} />
          <Route path="/logout" component={Logout} />
          {/* <Route path="/" exact component={BurgerBuilder} /> */}
          <Redirect to="/event" />
        </Switch>
      );
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


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
