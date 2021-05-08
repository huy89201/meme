import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/page/HomePage";
import LoginPage from "./components/page/LoginPage";
import UpLoadPage from "./components/page/UpLoadPage";
import CategoryPage from "./components/page/CategoryPage";
import PostDetailPage from "./components/page/PostDetailPage";
import UserPage from "./components/page/UserPage";
import NavBar from "./components/NavBar";
import MobileNavbar from "./components/MobileNavbar";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/upload">
            <UpLoadPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/category">
            <CategoryPage />
          </Route>
          <Route path="/userpageId=:UID">
            <UserPage />
          </Route>
          <Route path="/postPostId=:PID">
            <PostDetailPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
        <MobileNavbar />
      </Router>
    </div>
  );
}

export default App;
