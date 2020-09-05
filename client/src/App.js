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
  // Reference: https://medium.com/lightrail/getting-token-authentication-right-in-a-stateless-single-page-application-57d0c6474e3
  const [isAuthenticated, setIsAuthenticated] = React.useState(true);

  React.useEffect(() => {
    let jwtHeaderPayload = Cookies.get('jwtHeaderPayload');
    if (!jwtHeaderPayload) {
      setIsAuthenticated(false);
    } else {
      let decodedJwtPayload = jwt_decode(jwtHeaderPayload);
      let {
        username,
        expires
      } = decodedJwtPayload;

      if(expires < new Date().getTime()/1000){
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
