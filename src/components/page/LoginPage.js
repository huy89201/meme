import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginAsync } from "../../store/userActions";
import {
  makeStyles,
  Paper,
  Typography,
  InputLabel,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "50%",
    backgroundColor: "#191d3a",
    padding: "2rem",
    margin: "0 auto",
    [theme.breakpoints.down("777")]: {
      width: "100%",
    },
  },
  SubmitButton: {
    backgroundColor: "#ec5990",
    display: "block",
    marginBottom: "1rem",
    "&:hover": {
      backgroundColor: "#ec5990",
    },
  },
  registerLink: {
    color: "#bf1650",
  },
  title: {
    padding: "0.5rem 1rem",
    fontWeight: "bold",
    fontSize: "4rem",
    textAlign: "center",
    color: "#ec5990",
    [theme.breakpoints.down("sm")]: {
      fontSize: "3rem",
    },
    [theme.breakpoints.down("413")]: {
      fontSize: "2rem",
    },
    [theme.breakpoints.down("329")]: {
      fontSize: "1.25rem",
    },
  },
  input: {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#1e2a4a",
    color: "#fff",
    width: "100%",
    borderRadius: "1rem",
    border: "2px solid #fff",
    "&:focus": {
      outline: "none",
      borderColor: "#ff7aa8",
    },
    "&::placeholder": {
      color: "#4f6294",
    },
  },
  label: {
    color: "#fff",
    fontWeight: "bold",
    paddingTop: "0.5rem",
  },
  error: {
    padding: "0.5rem",
    color: "#bf1650",
  },
  question: {
    display: "inline-block",
    color: "#fff",
    marginRight: "0.5rem",
  },
}));

function LoginPage() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const currentUser = useSelector((state) => state.user.currentUser);
  const { token} = currentUser;
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("?? n??y kh??ng ???????c tr???ng")
      .email("t??i kho???n kh??ng ????ng ?????nh d???ng"),
    password: yup
      .string()
      .required("?? n??y kh??ng ???????c tr???ng")
      .min(6, "m???t kh???u ??t nh???t 6 k?? t???"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  if (token) history.push("./");

  const onSubmit = async (data) => {
    if (isLoading) return;

    setIsLoading(true);

    await dispatch(loginAsync(data)).then((res) => {
      if (res.ok) {
        history.push("./");
      } 

      if (!res.ok) {
        setError(res.error)
      }
      
    });
    reset();
    setTimeout(() => setError(''),3000);
    setIsLoading(false);
  };

  return (
    <Paper elevation={3} className={classes.paper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography className={classes.title}>????ng Nh???p</Typography>
        <InputLabel className={classes.label}>T??n ????ng nh???p</InputLabel>
        <input
          className={classes.input}
          placeholder="email c???a b???n..."
          type="email"
          {...register("email")}
        />
        {errors.email?.message && (
          <p className={classes.error}>{errors.email?.message}</p>
        )}
        <InputLabel className={classes.label}>M???t kh???u</InputLabel>
        <input
          className={classes.input}
          placeholder="m???t kh???u 6 k?? t???"
          type="password"
          {...register("password")}
        />
        {errors.password?.message && (
          <p className={classes.error}>{errors.password?.message}</p>
        )}
        {error && <p className={classes.error}>{error}</p>}
        <Button
          color="primary"
          variant="contained"
          className={classes.SubmitButton}
          onClick={handleSubmit(onSubmit)}
        >
          ????ng nh???p
        </Button>
        <p className={classes.question}>B???n ch??a c?? t??i kho???n ?</p>
        <Link to="/register" className={classes.registerLink}>
          ????ng k??
        </Link>
      </form>
    </Paper>
  );
}

export default LoginPage;
