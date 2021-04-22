import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/page/HomePage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />

        <Switch>

          <Route path="/">
            <HomePage />
          </Route>
          
        </Switch>

      </Router>
    </div>
  );
}

export default App;
