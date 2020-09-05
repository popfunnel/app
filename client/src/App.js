import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { QueryPage } from './pages/query/QueryPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { AboutPage } from './pages/AboutPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ConnectedNavBar } from './components/navigation/NavBar';
import { theme } from './AppTheme';
// import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

const PrivateRoute = ({component: Component, ...rest}) => {
  // TODO: create user reducer holding this info
  const [isAuthenticated, setIsAuthenticated] = React.useState(true);
  React.useEffect(() => {
    let jwtHeaderPayload = Cookies.get('jwtHeaderPayload');
    if (!jwtHeaderPayload) {
      setIsAuthenticated(false);
    } else {
      let decodedJwtPayload = jwt_decode(jwtHeaderPayload);
      setIsAuthenticated(true);
      // TODO: check expiration here
    }
  }, [])

  return (
    <Route {...rest} render={props => 
      isAuthenticated ?
      <Component {...props}/> :
      <Redirect to='/login'/>}
    />
  );
};

// TODO: check if we should use render or component
function App() {
  return (
    <ThemeProvider theme={theme}>
        <Switch>
            <Route path='/login' component={LoginPage}/>
            <Route path='/register' component={RegisterPage}/>
            <ConnectedNavBar>
                <PrivateRoute exact path='/' component={QueryPage}/>
                <PrivateRoute path='/queryTool' component={QueryPage}/>
                <PrivateRoute path='/about' component={AboutPage}/>
                <PrivateRoute path='/dashboard' component={DashboardPage}/>
            </ConnectedNavBar>
        </Switch>
    </ThemeProvider>
  )
}

export default App;
