import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../store/userActions";
import Loading from "../Loading";
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
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  SubmitButton: {
    backgroundColor: "#ec5990",
    "&:hover": {
      backgroundColor: "#ec5990",
    },
    marginTop: "1rem",
  },
  registerLink: {
    color: "#ffff",
  },
  title: {
    padding: "0.5rem 1rem",
    fontWeight: "bold",
    fontSize: "4rem",
    textAlign: "center",
    color: "#ec5990",
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
    paddingTop: "0.5rem",
    color: "#fff",
    fontWeight: "bold",
  },
  error: {
    padding: "0.5rem",
    color: "#bf1650",
  },
  space: {
    height: "1rem",
    marginBottom: "0.5rem",
  },
  errorAsync: {
    padding: "0.5rem",
    color: "#ff7aa8",
  },
}));

function UpdatePassWord() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [errorAsync, setErrorAsync] = useState("");
  const token = useSelector((state) => state.user.currentUser.token);
  const schema = yup.object().shape({
    oldPassword: yup
      .string()
      .required("?? n??y kh??ng ???????c tr???ng")
      .min(6, "atleast 6 characters"),
    newPassword: yup
      .string()
      .required("?? n??y kh??ng ???????c tr???ng")
      .min(6, "atleast 6 characters"),
    reNewPassword: yup
      .string()
      .required("?? n??y kh??ng ???????c tr???ng")
      .min(6, "m???t kh???u ??t nh???t 6 k?? t???")
      .oneOf([yup.ref("newPassword"), null], "m???t kh???u kh??ng tr??ng"),
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

    await dispatch(changePassword(data,token)).then((res) => {
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
          <Typography className={classes.title}>?????i M???t Kh???u</Typography>
          <InputLabel className={classes.label}>M???t kh???u c??</InputLabel>
          <input
            className={classes.input}
            placeholder="nh???p m???t kh???u..."
            type="password"
            {...register("oldPassword")}
          />
          {errors.oldPassword?.message && (
            <p className={classes.error}>{errors.oldPassword?.message}</p>
          )}
          <InputLabel className={classes.label}>M???t kh???u m???i</InputLabel>
          <input
            className={classes.input}
            placeholder="nh???p m???t kh???u m???i..."
            type="password"
            {...register("newPassword")}
          />
          {errors.newPassword?.message && (
            <p className={classes.error}>{errors.newPassword?.message}</p>
          )}
          <InputLabel className={classes.label}>X??c nh???n m???t kh???u</InputLabel>
          <input
            className={classes.input}
            placeholder="Nh???p l???i m???t kh???u m???i"
            type="password"
            {...register("reNewPassword")}
          />
          {errors.reNewPassword?.message && (
            <p className={classes.error}>{errors.reNewPassword?.message}</p>
          )}
          {errorAsync && <p className={classes.errorAsync}>{errorAsync}</p>}
          {isLoading && <Loading />}
          <Button
            color="primary"
            variant="contained"
            className={classes.SubmitButton}
            onClick={handleSubmit(onSubmit)}
          >
            x??c nh???n
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default UpdatePassWord;
