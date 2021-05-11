import "../css/navbar.css";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Search from "./Search";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";

import {
  makeStyles,
  AppBar,
  Container,
  useScrollTrigger,
  Slide,
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  appbar: {
    backgroundColor: "#fff",
    padding: "0.5rem 1rem",
  },
  list: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  listText: {
    color: "black",
  },
  AddIcon: {
    fontSize: "3rem",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  Button: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

function HideOnScroll(props) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {props.children}
    </Slide>
  );
}

function NavBar() {
  const classes = useStyles();
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="navbar--wrapper">
      <HideOnScroll>
        <AppBar className={classes.appbar}>
          <Container className={classes.container}>
            <div className="navbar--left">
              <List className={classes.list}>
                <ListItem component={Link} to="/">
                  <ListItemText className={classes.listText} primary="MEME" />
                </ListItem>
                <ListItem component={Link} to="/category">
                  <ListItemText
                    className={classes.listText}
                    primary="CATEGORY"
                  />
                </ListItem>
                <ListItem component={Link} to="/">
                  <ListItemText className={classes.listText} primary="HOT" />
                </ListItem>
              </List>
            </div>
            <div className="navbar--mid">
              <Search />
            </div>
            <div className="navbar--right">
              <IconButton>
                <Link to="/upload">
                  <AddBoxOutlinedIcon className={classes.AddIcon} />
                </Link>
              </IconButton>
              <Button className={classes.Button}>
                <Link to="/upload">up load</Link>
              </Button>
              {currentUser.isLogin ? (
                <Button>
                  <Link to={`/userpageId=${currentUser.id}`}>{currentUser.userData.fullname}</Link>
                </Button>
              ) : (
                <Button className={classes.Button}>
                  <Link to="/login">log in</Link>
                </Button>
              )}
            </div>
          </Container>
        </AppBar>
      </HideOnScroll>
    </div>
  );
}

export default NavBar;
