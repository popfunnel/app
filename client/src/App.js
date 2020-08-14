import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles';
import { QueryPage } from './pages/query/QueryPage'
import { AboutPage } from './pages/AboutPage'
import { LoginPage } from './pages/LoginPage'
import { NavBar } from './components/navigation/NavBar'
import { theme } from './AppTheme';

const NavContent = () => {
  return (
    <NavBar>
      <Route exact path="/" component={QueryPage}/>
    </NavBar>
  )
}

function App() {
  return (
    <ThemeProvider theme={theme}>
        <Switch>
                <Route exact path="/" component={NavContent}/>
                <Route path="/login" component={LoginPage}/>
        </Switch>
    </ThemeProvider>
  )
}

export default App;
