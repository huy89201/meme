import React from "react";
import '../css/navbar.css'
import {Link} from "react-router-dom"
import {
  makeStyles,
  AppBar,
  Container,
  useScrollTrigger,
  Slide,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
container: {
    display: 'flex',
    justifyContent:'space-between',
},
  appbar: {
    backgroundColor: "#fff",
    color: "black",
  },
  list: {
    display: "flex"
  }
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

  return (
    <div className="navbar--wrapper">
      <HideOnScroll>
        <AppBar className={classes.appbar}>
          <Container className={classes.container}>
            <div className="navbar--left">
              <List className={classes.list}>
                  <ListItem component={Link} to='/'>
                        <ListItemText primary='MEME'/>
                  </ListItem>
                  <ListItem button={true}>
                        <ListItemText primary='Danh mục'/>
                  </ListItem>
                  <ListItem component={Link} to='/'>
                        <ListItemText primary='HOT'/>
                  </ListItem>
              </List>
            </div>
            <div className="navbar--mid">hello</div>
            <div className="navbar--right">hello</div>
          </Container>
        </AppBar>
      </HideOnScroll>
    </div>
  );
}

export default NavBar;
