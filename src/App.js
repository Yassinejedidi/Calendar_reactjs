import React from 'react';
import Modal from 'react-modal';
import Calendar from './Components/Calendar'
import Login from '../src/Components/Login'
import ProtectedRoute from './ProtectedRoute'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,

} from "react-router-dom";


Modal.setAppElement('#root')
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Login} />
        <ProtectedRoute exact path='/Calendar' component={Calendar} />
      </Switch>
    </Router>
  );
}

export default App;
