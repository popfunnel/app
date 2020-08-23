import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { QueryPage } from './pages/query/QueryPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { AboutPage } from './pages/AboutPage';
import { LoginPage } from './pages/LoginPage';
import { ConnectedNavBar } from './components/navigation/NavBar';
import { theme } from './AppTheme';


function App() {
  return (
    <ThemeProvider theme={theme}>
        <Switch>
            <Route path='/login' component={LoginPage}/>
            <ConnectedNavBar>
                <Route exact path='/' component={QueryPage}/>
                <Route path='/about' component={AboutPage}/>
                <Route path='/dashboard' component={DashboardPage}/>
            </ConnectedNavBar>
        </Switch>
    </ThemeProvider>
  )
}

export default App;
