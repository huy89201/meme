import React from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { AppBar, Toolbar, IconButton, makeStyles } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
    backgroundColor: "#191d3a",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  toolbar: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  Icon: {
    fontSize: "3rem",
    color: "#ffff"
  },
}));

function MobileNavbar({ handleMobileCategories, handleSetting }) {
  const classes = useStyles();

  const currentUserId = localStorage.getItem("id");

  return (
    <div className="mobile--navbar">
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton onClick={handleMobileCategories}>
            <MenuIcon className={classes.Icon} />
          </IconButton>
          <IconButton>
            <Link to="/">
              <HomeIcon className={classes.Icon} />
            </Link>
          </IconButton>
          <IconButton>
            <Link
              to={currentUserId ? `/userpageId=${currentUserId}` : "/login"}
            >
              <AccountCircleIcon className={classes.Icon} />
            </Link>
          </IconButton>
          <IconButton onClick={handleSetting}>
            <SettingsIcon className={classes.Icon} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default MobileNavbar;
