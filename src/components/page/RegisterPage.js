import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerAsync } from "../../store/userActions";
import {
  Container,
  makeStyles,
  Paper,
  Typography,
  InputLabel,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "6rem",
    marginBottom: "4rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#ffffff",
    height: "100vh",
    display: "flex",
    alignItems: "center",
  },
  paper: {
    width: "50%",
    backgroundColor: "whitesmoke",
    padding: "2rem",
    margin: "0 auto",
  },
  title: {
    padding: "0.5rem 1rem",
    fontWeight: "bold",
    fontSize: "4rem",
    textAlign: "center",
  },
  input: {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#d5d5d5",
    width: "100%",
    borderRadius: "1rem",
    border: "none",
    "&:focus": {
      outline: "none",
    },
  },
  SubmitButton: {
    backgroundColor: "#ec5990",
    "&:hover": {
      backgroundColor: "#ec5990",
    },
    marginRight: "1rem",
  },
  loginLink: {
    color: "#ffff",
  },
}));

function RegisterPage() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    fullname: "",
    password: "",
    repassword: "",
  });

  function handlevalueChange(evt) {
    const key = evt.target.getAttribute("key_value");
    setFormData({
      ...formData,
      [key]: evt.target.value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    if (
      !formData.email ||
      !formData.fullname ||
      !formData.password ||
      !formData.repassword
    )
      return;

    if (isLoading) return;

    setIsLoading(true);
    dispatch(registerAsync(formData)).then((res) => {
      if (res.ok) {
        history.push('/login');
      } else {
        alert(res.error);
      }
      setIsLoading(false);
    });

    setFormData({
      email: "",
      fullname: "",
      password: "",
      repassword: "",
    });

  }

  return (
    <div className="register--page--wrapper">
      <Container className={classes.container}>
        <Paper elevation={3} className={classes.paper}>
          <form onSubmit={handleSubmit}>
            <Typography className={classes.title}>Register</Typography>
            <InputLabel className={classes.label}>Email</InputLabel>
            <input
              className={classes.input}
              placeholder="Email or phone number"
              value={formData.email}
              key_value="email"
              onChange={handlevalueChange}
            />
            <InputLabel className={classes.label}>Fullname</InputLabel>
            <input
              className={classes.input}
              placeholder="your name"
              value={formData.fullname}
              key_value="fullname"
              onChange={handlevalueChange}
            />
            <InputLabel className={classes.label}>Password</InputLabel>
            <input
              className={classes.input}
              placeholder="Password"
              value={formData.password}
              key_value="password"
              onChange={handlevalueChange}
              type="password"
            />
            <InputLabel className={classes.label}>Repassword</InputLabel>
            <input
              className={classes.input}
              placeholder="write your password again"
              type="password"
              value={formData.repassword}
              key_value="repassword"
              onChange={handlevalueChange}
            />
            <Button
              color="primary"
              variant="contained"
              className={classes.SubmitButton}
              onClick={handleSubmit}
            >
              submit
            </Button>
            <Button color="primary" variant="contained">
              <Link to="/login" className={classes.loginLink}>
                login
              </Link>
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
}

export default RegisterPage;
