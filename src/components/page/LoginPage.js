import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../../store/userActions";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
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
  error: {
    padding: "0.5rem"
  }
}));

function LoginPage() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const isLogin = useSelector((state) => state.user.currentUser.token)
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("email is required")
      .email("email is not same pattern"),
    password: yup
      .string()
      .required("password is required")
      .min(6, "password has least 6 characters"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  if(isLogin) history.push('./');

  const onSubmit = async (data) => {
    if(isLoading) return;
    
    setIsLoading(true);

    await dispatch(loginAsync(data)).then((res) => {
      if (res.ok) history.push('./');
      reset();
      setIsLoading(false);
    });
  };

  return (
    <div className="login--page--wrapper">
      <Container className={classes.container}>
        <Paper elevation={3} className={classes.paper}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography className={classes.title}>Login</Typography>
            <InputLabel className={classes.label}>Email</InputLabel>
            <input
              className={classes.input}
              placeholder="Email or phone number"
              type="email"
              {...register("email")}
            />
            {errors.email?.message && <p className={classes.error}>{errors.email?.message}</p>}
            <InputLabel className={classes.label}>Password</InputLabel>
            <input
              className={classes.input}
              placeholder="Password"
              type="password"
              {...register("password")}
            />
            {errors.password?.message && <p className={classes.error}>{errors.password?.message}</p>}

            <Button
              color="primary"
              variant="contained"
              className={classes.SubmitButton}
              onClick={handleSubmit(onSubmit)}
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
