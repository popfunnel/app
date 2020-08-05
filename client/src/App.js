import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles';
import { QueryPage } from './pages/query/QueryPage'
import { TestPage } from './pages/TestPage'
import { NavBar } from './components/navigation/NavBar'
import { theme } from './AppTheme';

function App() {
    const data = {
        test: 'hi!'
    };

    fetch('/executeQuery', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('data', data)
    })


  return (
    <ThemeProvider theme={theme}>
        <NavBar>
            <Switch>
                <Route exact path="/" component={QueryPage}/>
                <Route path="/othertest" component={TestPage}/>
            </Switch>
        </NavBar>
    </ThemeProvider>
  )
}

export default App;
