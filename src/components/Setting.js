import React from "react";
import { useHistory, Link } from "react-router-dom";
import { makeStyles, Drawer, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../store/userActions";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1rem",
    width: "80vw",
    height: "100vh",
    backgroundColor: "#081229",
  },
  title: {
    paddingBottom: '1rem',
    color: "#ec5990",
    fontSize: "3rem",
    marginBottom: "2rem",
    borderBottom: "3px solid #bf1650"
  },
  item: {
    fontSize: "2rem",
    marginBottom: "1rem",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#ec5990",
    "&:hover": {
      backgroundColor: "#ec5990",
    },
  }
}));

function Setting({ isOpenSetting, handleSetting }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const { id, token } = user;

  function logout(evt) {
    dispatch(logOut());
    handleSetting(evt);
  }

  function login(evt) {
    history.push("/login");
    handleSetting(evt);
  }

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.root }}
      transitionDuration={200}
      open={isOpenSetting}
      onClose={handleSetting}
    >
      <h1 className={classes.title}>Cài Đặt</h1>
      {token ? (
        <>
          <Link
            to={`/user-info-id=${id}`}
            onClick={handleSetting}
            className={classes.item}
          >
            Cập nhật thông tin
          </Link>
          <Link to="/password" onClick={handleSetting} className={classes.item}>
            Đổi mật khẩu
          </Link>
          <Button className={classes.button} variant="contained" onClick={logout}>
            Đăng xuất
          </Button>
        </>
      ) : (
        <Button variant="contained" className={classes.button} onClick={login}>
          Đăng nhập
        </Button>
      )}
    </Drawer>
  );
}

export default Setting;
