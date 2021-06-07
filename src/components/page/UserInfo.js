import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Avatar, Button, Paper } from "@material-ui/core";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateInfo, getCurrentUserAsync } from "../../store/userActions";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "#191d3a",
    padding: "2rem",
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
  },
  form: {
    width: "50%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  avatar: {
    width: "10rem",
    height: "10rem",
    margin: "0 auto 1rem auto",
    border: "4px solid #4f6294",
  },
  fullname: {
    width: "100%",
    marginBottom: "1rem",
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
      color: "#fff",
    },
  },
  description: {
    width: "100%",
    height: "8rem",
    padding: "1rem",
    marginBottom: "1rem",
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
      color: "#fff",
    },
  },
  gender: {
    display: "block",
    outline: "none",
    border: "2px solid #fff",
    backgroundColor: "#1e2a4a",
    color: "#fff",
    marginBottom: "1rem",
    padding: '0.25rem 0.5rem',
    borderRadius: '1rem',
  },
  optionItem: {
    "&:hover": {
      color: "#ec5990",
    }
  },
  SubmitButton: {
    backgroundColor: "#ec5990",
    display: "block",
    marginBottom: "1rem",
    "&:hover": {
      backgroundColor: "#ec5990",
    },
  },
}));

function UserInfo() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const currentUser = useSelector((state) => state.user.currentUser.userData);
  const [previewImg, setPreviewImg] = useState("");
  const [avatar, setAvatar] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { description, fullname, profilepicture, USERID } = currentUser;

  const schema = yup.object().shape({
    gender: yup.string().required(null),
    description: yup.string().required(null).max(100),
    fullname: yup.string().required(null),
  });

  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const handleImage = (evt) => {
    const file = evt.target.files[0];
    const reader = new FileReader();

    setAvatar(file);

    if (!file) return;

    reader.readAsDataURL(file);

    reader.onload = (evt) => {
      setPreviewImg(evt.target.result);
    };
  };

  const onSubmit = async (data) => {
    if (isLoading) return;

    setIsLoading(true);

    const formData = new FormData();

    formData.append("fullname", data.fullname);
    formData.append("description", data.description);
    formData.append("gender", data.gender);
    formData.append("avatar", avatar);

    await dispatch(updateInfo(formData)).then((res) => {
      if (res.ok) dispatch(getCurrentUserAsync(Number(USERID)));
      reset();
      setIsLoading(false);
    });
  };

  return (
    <div>
      <Paper elevation={3} className={classes.paper}>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="contained-button-file"
            multiple
            type="file"
            onChange={handleImage}
          />
          <label htmlFor="contained-button-file">
            <Avatar
              src={previewImg || profilepicture}
              className={classes.avatar}
            />
          </label>
          <input
            type="text"
            {...register("fullname")}
            placeholder={fullname}
            className={classes.fullname}
          />
          <textarea
            {...register("description")}
            placeholder={description}
            className={classes.description}
          />
          <select {...register("gender")} className={classes.gender}>
            <option value="nam" className={classes.optionItem}>Nam</option>
            <option value="nữ" className={classes.optionItem}>Nữ</option>
          </select>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            className={classes.SubmitButton}
          >
            cập nhật
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default UserInfo;
