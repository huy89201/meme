import React from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { AppBar, Toolbar, IconButton, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
    display: "flex",
    alignItems: "center",
    backgroundColor: "#ffff",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  Icon: {
    fontSize: "3rem",
  },
}));

function MobileNavbar({handleMobileCategories}) {
  const classes = useStyles();

  return (
    <div className="mobile--navbar">
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton onClick={handleMobileCategories}>
            <MenuIcon className={classes.Icon} />
          </IconButton>
          <IconButton>
            <Link to="/">
              <HomeIcon className={classes.Icon} />
            </Link>
          </IconButton>
          <IconButton>
            <Link to="/login">
              <AccountCircleIcon className={classes.Icon} />
            </Link>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default MobileNavbar;
