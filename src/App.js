import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/page/HomePage";
import LoginPage from "./components/page/LoginPage";
import UpLoadPage from "./components/page/UpLoadPage";
import CategoryPage from "./components/page/CategoryPage";
import PostDetailPage from "./components/page/PostDetailPage";
import UserPage from "./components/page/UserPage";
import RegisterPage from "./components/page/RegisterPage";
import SearchPage from "./components/page/SearchPage";
import NavBar from "./components/NavBar";
import MobileNavbar from "./components/MobileNavbar";
import { setToken, getCurrentUserAsync, setId } from "./store/userActions";
import {getCategoriesAsync} from './store/categoriesAction'

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");
  const categories = useSelector((state) => state.categories.categories)

  useEffect(() => {
    dispatch(getCurrentUserAsync(userId));
    dispatch(setToken(token));
    dispatch(setId(userId));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if(categories.length) return;
    dispatch(getCategoriesAsync());
    // eslint-disable-next-line
  },[])
 
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
          <Route path="/search--querySting=:querySting">
            <SearchPage />
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
