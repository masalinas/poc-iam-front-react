import React, { Component, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import GuardedRoute from './components/GuardedRoute';

const loading = (
  <div>Loading...</div>
)

// Landing views
const Login = React.lazy(() => import('./views/landing/login/LoginView'))

// App views
const Products = React.lazy(() => import('./views/products/ProductsView'))

class App extends Component {
  render() {
    return (
      <Router>
        <Suspense fallback={loading}>
          <Switch>
            <Route exact path="/login" name="Login Page" render={(props) => <Login {...props} />} />            
            <GuardedRoute path="/" name="Products" component={Products} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

export default App;
