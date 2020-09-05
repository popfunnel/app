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
import { connect } from 'react-redux'


// const PrivateRoute = ({component: Component, ...rest}) => {
//   const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  // const checkUserAuthentication = async () => {
  //   console.log("enter method, isauthenticated", isAuthenticated)
  //   await fetch('/isauthenticated')
  //   .then(response => {
  //     if (response.status == 200) {
  //       setIsAuthenticated(true)
  //     } else {
  //       setIsAuthenticated(false)
  //     }
  //   })
  // }

  // React.useEffect(() => {
  //   checkUserAuthentication()
  // }, [])

//   return (
//     <Route {...rest} render={props => 
//       isAuthenticated ?
//       <Component {...props}/> :
//       <Redirect to='/login'/>}
//     />
//   );
// };

// TODO: check if we should use render or component
function App() {
  return (
    <ThemeProvider theme={theme}>
        <Switch>
            <Route path='/login' component={LoginPage}/>
            <Route path='/register' component={RegisterPage}/>
            <ConnectedNavBar>
                <Route exact path='/' component={QueryPage}/>
                <Route path='/queryTool' component={QueryPage}/>
                <Route path='/about' component={AboutPage}/>
                <Route path='/dashboard' component={DashboardPage}/>
            </ConnectedNavBar>
        </Switch>
    </ThemeProvider>
  )
}

export default App;
