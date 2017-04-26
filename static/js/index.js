import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter,
  Route,
  Link
} from 'react-router-dom';
import Root from './root';

ReactDOM.render((
  <HashRouter>
    <div>
      <Route exact path='/' component={Root} />
      {/* <Route path='/login' component={Login} /> */}
      {/* <Route path="*" component={NoMatch}/> */}
    </div>
  </HashRouter>
  ), document.getElementById('root')
)
