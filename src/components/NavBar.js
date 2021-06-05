import "../css/navbar.css";
import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Search from "./Search";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import Avatar from "@material-ui/core/Avatar";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { logOut } from "../store/userActions";

import {
  makeStyles,
  AppBar,
  Container,
  useScrollTrigger,
  Slide,
  Button,
  IconButton,
  MenuList,
  MenuItem,
  Paper,
  ClickAwayListener,
  Grow,
  Popper,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  appbar: {
    backgroundColor: "#191d3a",
    padding: "0.5rem 1rem",
  },
  list: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  listText: {
    color: "#ffffff",
    marginRight: "0.5rem",
    "&:hover": {
      color: "#bf1650",
    }
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
  Avatar: {
    marginRight: "0.5rem",
  },
  user: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  right: {
    display: "flex",
    alignItems: "center",
  },
  left: {
    backGroundColor: "#191d3a",
  },
  upLoadBtn: {
    marginRight: "0.5rem",
    color: "#ff7aa8",
  },
  paper : {
    backgroundColor: '#191d3a',
  },
  dropDownItem : {
    fontWeight: 'bold',
    "&:hover": {
      color: "#bf1650"
    }
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

function NavBar({ handleMobileCategories }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentUserId = useSelector((state) => state.user.currentUser.id);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (!event) {
      setOpen(false);
      return;
    }

    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleLogOut() {
    handleClose();
    dispatch(logOut());
    if (location.pathname !== "/") history.push("/");
  }

  return (
    <div className="navbar--wrapper">
      <HideOnScroll>
        <AppBar className={classes.appbar}>
          <Container className={classes.container}>
            <div className="navbar--left" className={classes.left}>
              <div className={classes.list}>
                <Link to="/" className={classes.listText}>
                  MEME
                </Link>
                <Button
                  className={classes.listText}
                  onClick={handleMobileCategories}
                >
                  Danh mục
                </Button>
              </div>
            </div>
            <div className="navbar--mid">
              <Search />
            </div>
            <div className={classes.right}>
              <IconButton>
                <Link to={currentUserId ? "/upload" : "/login"}>
                  <AddBoxOutlinedIcon className={classes.AddIcon} />
                </Link>
              </IconButton>
              <Button className={classes.Button}>
                <Link
                  to={currentUserId ? "/upload" : "/login"}
                  className={classes.upLoadBtn}
                >
                  up load
                </Link>
              </Button>
              {currentUser.token && currentUser.userData ? (
                <div className={classes.user}>
                  <Avatar
                    alt="user avatar"
                    src={currentUser.userData.profilepicture}
                    className={classes.Avatar}
                  />
                  <Link to={`/userpageId=${currentUser.id}`}>
                    {currentUser.userData.fullname}
                  </Link>
                  <IconButton
                    ref={anchorRef}
                    aria-controls={open ? "menu-list-grow" : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                  <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === "bottom"
                              ? "center top"
                              : "center bottom",
                        }}
                      >
                        <Paper className={classes.paper}>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList autoFocusItem={open} id="menu-list-grow">
                              <MenuItem onClick={handleClose}>
                                <Link to={`/user-info-id=${currentUserId}`} className={classes.dropDownItem}>
                                  Xem thông tin
                                </Link>
                              </MenuItem>
                              <MenuItem onClick={handleClose}>
                                <Link to={"/password"} className={classes.dropDownItem}>Đổi mật khẩu</Link>
                              </MenuItem>
                              <MenuItem onClick={handleLogOut} className={classes.dropDownItem}>Đăng xuất</MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </div>
              ) : (
                <Button className={classes.Button}>
                  <Link to="/login">đăng nhập</Link>
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
