import React from 'react';
import { Switch, Route } from 'react-router';
import ProductsList from './pages/ProductsList';
import Product from './pages/Product';

const App = () => {

  return (
    <div className='App container'>
      <Switch>
        <Route exact path="/">
          <ProductsList />
        </Route>
        <Route path="/product/:productId" component={Product} />
        <Route>
          <div>PAGE NOT FOUND 404</div>
        </Route>
      </Switch>
    </div>
  );
};

export default App;