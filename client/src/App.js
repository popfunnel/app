import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles';
import { QueryPage } from './pages/query/QueryPage'
import { AboutPage } from './pages/AboutPage'
import { NavBar } from './components/navigation/NavBar'
import { theme } from './AppTheme';

function App() {
  return (
    <ThemeProvider theme={theme}>
        <NavBar>
            <Switch>
                <Route exact path="/" component={QueryPage}/>
                <Route path="/about" component={AboutPage}/>
            </Switch>
        </NavBar>
    </ThemeProvider>
  )
}

export default App;
