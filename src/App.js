import React from 'react';
import TextEditor from './TextEditor';
// import {
//   BrowserRouter as Router,
//   Route,
//   Switch,
//   Redirect
// } from 'react-router';
import { BrowserRouter as Router, Route, Outlet, Navigate,Routes} from 'react-router-dom';
import {v4 as uuidV4} from 'uuid';
const App = () => {
  return (
  <Router>
    <Routes>
    <Route path="/" element={<Navigate to={`/documents/${uuidV4()}`} />} />
    <Route path="/documents/:id" element={<TextEditor />} />
    </Routes>
  </Router>);
  // return (<Router>
  //   <Switch>
  //     <Route path="/" exact>
  //        <Redirect to={`/documents/${uuidV4()}`}/>
  //     </Route>
  //     <Route path="/documents/:id">
  //     <TextEditor/>
  //     </Route>
  //   </Switch>
  // </Router>
  //)
}

export default App;