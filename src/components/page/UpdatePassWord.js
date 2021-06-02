import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../store/userActions";
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
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.5rem",
    },
    [theme.breakpoints.down("328")]: {
      fontSize: "2rem",
    },
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
    padding: "0.5rem",
  },
  space: {
    height: "1rem",
    marginBottom: "0.5rem",
  },
  error: {
    marginBottom: "0.5rem",
  },
}));

function UpdatePassWord() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [errorAsync, setErrorAsync] = useState("");
  const isLogin = useSelector((state) => state.user.currentUser.token);
  const schema = yup.object().shape({
    oldPassword: yup
      .string()
      .required("this field is required")
      .min(6, "atleast 6 characters"),
    newPassword: yup
      .string()
      .required("this field is required")
      .min(6, "atleast 6 characters"),
    reNewPassword: yup
      .string()
      .required("this field is required")
      .min(6, "atleast 6 characters")
      .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    if (isLoading) return;
    setIsLoading(true);

    await dispatch(changePassword(data)).then((res) => {
      res.ok && setErrorAsync(res.message);

      res.error && setErrorAsync(res.error);

      setTimeout(() => setErrorAsync(""), 3000);
    });

    setIsLoading(false);
    reset();
  };

  return (
    <div>
      <Paper elevation={3} className={classes.paper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography className={classes.title}>Change PassWord</Typography>
          <InputLabel className={classes.label}>Old Password</InputLabel>
          <input
            className={classes.input}
            placeholder="your password"
            type="password"
            {...register("oldPassword")}
          />
          {errors.oldPassword?.message && (
            <p className={classes.error}>{errors.oldPassword?.message}</p>
          )}
          <InputLabel className={classes.label}>New Password</InputLabel>
          <input
            className={classes.input}
            placeholder="your new password"
            type="password"
            {...register("newPassword")}
          />
          {errors.newPassword?.message && (
            <p className={classes.error}>{errors.newPassword?.message}</p>
          )}
          <InputLabel className={classes.label}>Confirm Password</InputLabel>
          <input
            className={classes.input}
            placeholder="confirm your new password"
            type="password"
            {...register("reNewPassword")}
          />
          {errors.reNewPassword?.message && (
            <p className={classes.error}>{errors.reNewPassword?.message}</p>
          )}
          {errorAsync && <p className={classes.error}>{errorAsync}</p>}
          <Button
            color="primary"
            variant="contained"
            className={classes.SubmitButton}
            onClick={handleSubmit(onSubmit)}
          >
            submit
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default UpdatePassWord;
