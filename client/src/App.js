import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { QueryPage } from './pages/query/QueryPage';
import { ConnectedDashboardPage } from './pages/dashboard/DashboardPage';
// import { AboutPage } from './pages/AboutPage';
import { LoginPage } from './pages/LoginPage';
import { LogoutPage } from './pages/LogoutPage';
import { RegisterPage } from './pages/RegisterPage';
import { InfoPage } from './pages/InfoPage';

import { ConnectedNavBar } from './components/navigation/NavBar';
import { ConnectedCustomSnackbar } from './components/snackbar/CustomSnackbar';
import { theme } from './AppTheme';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

const PrivateRoute = ({component: Component, ...rest}) => {
  // Reference: https://medium.com/lightrail/getting-token-authentication-right-in-a-stateless-single-page-application-57d0c6474e3
  const [isAuthenticated, setIsAuthenticated] = React.useState(true);

  React.useEffect(() => {
    let jwtHeaderPayload = Cookies.get('jwtHeaderPayload');
    if (!jwtHeaderPayload) {
      setIsAuthenticated(false);
    } else {
      let decodedJwtPayload = jwt_decode(jwtHeaderPayload);
      let {expires} = decodedJwtPayload;
      
      if (expires < new Date().getTime()) {
        setIsAuthenticated(false)
      } else {
        setIsAuthenticated(true);
      }
    };

  }, []);

  return (
    <Route {...rest} render={props => 
      isAuthenticated ?
      <Component {...props}/> :
      <Redirect to='/login'/>}
    />
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
        <Switch>
            <Route path='/login' component={LoginPage}/>
            <Route path='/register' component={RegisterPage}/>
            <Route path='/logout' component={LogoutPage}/>
            <ConnectedNavBar>
                <PrivateRoute exact path='/' component={QueryPage}/>
                <PrivateRoute path='/queryTool' component={QueryPage}/>
                <PrivateRoute path='/dashboard' component={ConnectedDashboardPage}/>
                <PrivateRoute path='/info' component={InfoPage}/>
                {/* <PrivateRoute path='/about' component={AboutPage}/> */}
            </ConnectedNavBar>
        </Switch>
        <ConnectedCustomSnackbar/>
    </ThemeProvider>
  )
}

export default App;
