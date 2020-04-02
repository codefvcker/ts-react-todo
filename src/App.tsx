import React from 'react';
import { Main, About } from './pages';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';


function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
