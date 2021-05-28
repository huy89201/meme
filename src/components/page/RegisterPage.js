import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerAsync } from "../../store/userActions";
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
    [theme.breakpoints.down("sm")]: {
      width: '85%'
    },
  },
  title: {
    padding: "0.5rem 1rem",
    fontWeight: "bold",
    fontSize: "3rem",
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
  error: {
    padding: "0.5rem"
  }
}));

function RegisterPage() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("email is required")
      .email("email is not same pattern"),
    fullname: yup
      .string()
      .required("fullname is required")
      .max(20, "max characters is 20"),
    password: yup
      .string()
      .required("password is required")
      .min(6, "password has least 6 characters"),
    repassword: yup
      .string()
      .required("confirm password is required")
      .min(6, "password has least 6 characters")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    if(isLoading) return;

    setIsLoading(true);

    await dispatch(registerAsync(data)).then(res => {
      if(res.ok) history.push('/login');
      setIsLoading(false);
    })
  };

  return (
    <div className="register--page--wrapper">
      <Container className={classes.container}>
        <Paper elevation={3} className={classes.paper}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography className={classes.title}>Register</Typography>
            <InputLabel className={classes.label}>Email</InputLabel>
            <input
              className={classes.input}
              placeholder="Email or address"
              {...register("email")}
            />
            {errors.email?.message && <p className={classes.error}>{errors.email?.message}</p>}
            <InputLabel className={classes.label}>Fullname</InputLabel>
            <input
              className={classes.input}
              placeholder="your name"
              {...register("fullname")}
            />
            {errors.fullname?.message && <p className={classes.error}>{errors.fullname?.message}</p>}

            <InputLabel className={classes.label}>Password</InputLabel>
            <input
              className={classes.input}
              placeholder="Password"
              type="password"
              {...register("password")}
            />
            {errors.password?.message && <p className={classes.error}>{errors.password?.message}</p>}
            
            <InputLabel className={classes.label}>Confirm password</InputLabel>
            <input
              className={classes.input}
              placeholder="confirm password "
              type="password"
              {...register("repassword")}
            />
            {errors.repassword?.message && <p className={classes.error}>{errors.repassword?.message}</p>}

            <Button
              color="primary"
              variant="contained"
              className={classes.SubmitButton}
              onClick={handleSubmit(onSubmit)}
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
      </Container>ca
    </div>
  );
}

export default RegisterPage;
