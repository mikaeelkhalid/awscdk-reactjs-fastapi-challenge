import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { CheckResult } from './components/CheckResult';
import { DeleteRecord } from './components/DeleteRecord';
import { GetTaskIds } from './components/GetTaskIds';
import { NotFound } from './components/NotFound';
import { UploadFile } from './components/UploadFile';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/check-result'>
          <CheckResult />
        </Route>
        <Route path='/delete-record'>
          <DeleteRecord />
        </Route>
        <Route path='/upload-file'>
          <UploadFile />
        </Route>
        <Route path='/get-task-ids'>
          <GetTaskIds />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

