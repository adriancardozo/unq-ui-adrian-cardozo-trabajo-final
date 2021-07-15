import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Bienvenida from '../paginas/Bienvenida';
import Jugar from '../paginas/Jugar';
import NoEncontrado from '../paginas/NoEncontrado';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Bienvenida } />
        <Route exact path="/jugar/:nombre" component={ Jugar } />
        <Route path="*" component={ NoEncontrado } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
