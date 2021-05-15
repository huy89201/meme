import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAsync } from "../../store/userActions";
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
  SubmitButton: {
    backgroundColor: "#ec5990",
    "&:hover": {
      backgroundColor: "#ec5990",
    },
    marginRight: "1rem",
  },
  registerLink: {
    color: "#ffff",
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
  label: {
    paddingTop: "0.5rem",
  },
}));

function LoginPage() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "huy89201@gmail.com",
    password: "123456",
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
    
    if (!formData.email || !formData.password) return;

    if (isLoading) return;

    setIsLoading(true);
    dispatch(loginAsync(formData))
      .then(res => {
      if (res.ok) {
        history.push('/');
      } else {
        // alert(res.error);
        console.log(res.error);
      }
      setIsLoading(false);
    });

    setFormData({
      email: "",
      password: "",
    });
  }

  return (
    <div className="login--page--wrapper">
      <Container className={classes.container}>
        <Paper elevation={3} className={classes.paper}>
          <form onSubmit={handleSubmit}>
            <Typography className={classes.title}>Login</Typography>
            <InputLabel className={classes.label}>Email</InputLabel>
            <input
              className={classes.input}
              key_value="email"
              placeholder="Email or phone number"
              value={formData.email}
              onChange={handlevalueChange}
            />
            <InputLabel className={classes.label}>Password</InputLabel>
            <input
              className={classes.input}
              placeholder="Password"
              key_value="password"
              type="password"
              value={formData.password}
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
              <Link to="/register" className={classes.registerLink}>
                register
              </Link>
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
}

export default LoginPage;
