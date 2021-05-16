import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/page/HomePage";
import LoginPage from "./components/page/LoginPage";
import UpLoadPage from "./components/page/UpLoadPage";
import CategoryPage from "./components/page/CategoryPage";
import PostDetailPage from "./components/page/PostDetailPage";
import UserPage from "./components/page/UserPage";
import RegisterPage from "./components/page/RegisterPage";
import NavBar from "./components/NavBar";
import MobileNavbar from "./components/MobileNavbar";
import { setToken, getCurrentUserAsync, setId } from "./store/userActions";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");

  useEffect(() => {
    dispatch(getCurrentUserAsync(userId));
    dispatch(setToken(token));
    console.log('app', userId);
    dispatch(setId(userId));
    // eslint-disable-next-line
  }, []);

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
          <Route path="/register">
            <RegisterPage />
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
