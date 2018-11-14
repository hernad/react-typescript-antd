import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {PRODUCTS, FilterableProductTable} from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
