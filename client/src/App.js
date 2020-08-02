import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles';
import QueryPage from './Pages/QueryPage'
import { theme } from './AppTheme';

function App() {
  return (
    <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/" component={QueryPage}/>
        </Switch>
    </ThemeProvider>
  )
}

export default App;
