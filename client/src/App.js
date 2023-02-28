import './App.css';
import {Home, Landing, Detail, Form, NavBar} from './views'
import { Route, useLocation } from 'react-router-dom';

function App() {

  const location = useLocation()


  return (
    <div className="App">
      {location.pathname !== '/' && <NavBar />}
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" render={() => <Home />}/>
      <Route path="/create" render={() => <Form />}/>
      <Route exact path="/home/:id" render={() => <Detail />}/>
    </div>
  );
}

export default App;
