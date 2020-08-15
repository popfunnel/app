import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles';
import { ConnectedQueryPage } from './pages/query/QueryPage'
import { AboutPage } from './pages/AboutPage'
import { LoginPage } from './pages/LoginPage'
import { NavBar } from './components/navigation/NavBar'
import { theme } from './AppTheme';

function App() {
  return (
    <ThemeProvider theme={theme}>
        <Switch>
            <Route path="/login" component={LoginPage}/>
            <NavBar>
                <Route exact path="/" component={ConnectedQueryPage}/>
                <Route path="/about" component={AboutPage}/>
            </NavBar>
        </Switch>
    </ThemeProvider>
  )
}

export default App;
