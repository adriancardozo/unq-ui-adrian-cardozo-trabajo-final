import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import Bienvenida from '../paginas/Bienvenida';
import NoEncontrado from '../paginas/NoEncontrado';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Bienvenida } />
        <Route path="*" component={ NoEncontrado } />
      </Switch>
  </BrowserRouter>
  );
}

export default App;
