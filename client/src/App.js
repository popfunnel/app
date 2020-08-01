import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles';
import ExampleComponent from './ExampleComponent'
import { theme } from './AppTheme';

function App() {
  return (
    <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/" component={ExampleComponent}/>
        </Switch>
    </ThemeProvider>
  )
}

export default App;
