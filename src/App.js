import logo from './logo.svg';
import './App.css';
import Dashboard from './screens/Dashboard';
import Verandah from './screens/Verandah';
import Login from './screens/Login';
import TCRC from './screens/TCRC';

function App() {
  let auth = window.localStorage.getItem("auth");
  if (auth == null || auth == undefined || auth.length == 0) {
    return (
      <div class="container">
        <br /><br />
        <h3>Login</h3>
        <Login />
      </div>
    )
  }
  else {
    if(window.location.pathname == '/')
      return (
        <div className="App">
          <Dashboard />
        </div>
      );
    else if(window.location.pathname == '/verandah')
      return (
        <div className="App">
          <Verandah />
        </div>
      );
      else if(window.location.pathname == '/tcrc')
      return (
        <div className="App">
          <TCRC />
        </div>
      );
  }
}

export default App;
