import logo from './logo.svg';
import './App.css';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';

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
    return (
      <div className="App">
        <Dashboard />
      </div>
    );
  }
}

export default App;
