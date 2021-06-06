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
  paper: {
    width: "50%",
    backgroundColor: "#191d3a",
    padding: "2rem",
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      width: "85%",
    },
  },
  title: {
    padding: "0.5rem 1rem",
    fontWeight: "bold",
    fontSize: "3rem",
    textAlign: "center",
    color: "#ec5990",
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
  SubmitButton: {
    display: "block",
    marginBottom: "1rem",
    backgroundColor: "#ec5990",
    "&:hover": {
      backgroundColor: "#ec5990",
    },
  },
  loginLink: {
    color: "#bf1650",
  },
  error: {
    padding: "0.5rem",
    color: "#bf1650",
  },
  label: {
    color: "#fff",
    fontWeight: "bold",
    paddingTop: "0.5rem",
  },
  question: {
    display: "inline-block",
    color: "#fff",
    marginRight: "0.5rem",
  },
}));

function RegisterPage() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("ô này không được trống")
      .email("tài khoản không đúng định dạng"),
    fullname: yup
      .string()
      .required("ô này không được trống")
      .max(20, "tối đa 20 ký tự"),
    password: yup
      .string()
      .required("ô này không được trống")
      .min(6, "mật khẩu ít nhất 6 ký tự"),
    repassword: yup
      .string()
      .required("ô này không được trống")
      .min(6, "mật khẩu ít nhất 6 ký tự")
      .oneOf([yup.ref("password"), null], "mật khẩu không trùng"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    if (isLoading) return;

    setIsLoading(true);

    await dispatch(registerAsync(data)).then((res) => {
      if (res.ok) history.push("/login");
      setIsLoading(false);
    });
  };

  return (
    <Paper elevation={3} className={classes.paper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography className={classes.title}>Đăng Ký</Typography>
        <InputLabel className={classes.label}>Tên đăng nhập</InputLabel>
        <input
          className={classes.input}
          placeholder="nhập email..."
          {...register("email")}
        />
        {errors.email?.message && (
          <p className={classes.error}>{errors.email?.message}</p>
        )}
        <InputLabel className={classes.label}>Tên người dùng</InputLabel>
        <input
          className={classes.input}
          placeholder="tên của bạn"
          {...register("fullname")}
        />
        {errors.fullname?.message && (
          <p className={classes.error}>{errors.fullname?.message}</p>
        )}

        <InputLabel className={classes.label}>Mật khẩu</InputLabel>
        <input
          className={classes.input}
          placeholder="nhập mật khẩu..."
          type="password"
          {...register("password")}
        />
        {errors.password?.message && (
          <p className={classes.error}>{errors.password?.message}</p>
        )}

        <InputLabel className={classes.label}>Xác nhận mật khẩu</InputLabel>
        <input
          className={classes.input}
          placeholder="nhập lại mật khẩu... "
          type="password"
          {...register("repassword")}
        />
        {errors.repassword?.message && (
          <p className={classes.error}>{errors.repassword?.message}</p>
        )}

        <Button
          color="primary"
          variant="contained"
          className={classes.SubmitButton}
          onClick={handleSubmit(onSubmit)}
        >
          submit
        </Button>
        <p className={classes.question}>Bạn đã có tài khoản ?</p>
        <Link to="/login" className={classes.loginLink}>
          đăng nhập
        </Link>
      </form>
    </Paper>
  );
}

export default RegisterPage;
