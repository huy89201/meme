import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNewPostAsync, getNewPostsAsync } from "../../store/postsActions";
import { makeStyles, Grid, Paper, Button } from "@material-ui/core";
import CategoriesItem from "../CategoriesItem";
import { checked, resetChecked } from "../../store/categoriesAction";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "1rem",
    backgroundColor: "#191d3a",
    borderRadius: "1rem",
    border: "2px solid #516391",
  },
  input: {
    width: "100%",
    padding: "0.5rem 1rem",
    marginBottom: "1rem",
    backgroundColor: "#1e2a4a",
    color: "#fff",
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
  textarea: {
    width: "100%",
    height: "10rem",
    padding: "0.5rem 1rem",
    borderRadius: "1rem",
    marginBottom: "1rem",
    backgroundColor: "#1e2a4a",
    color: "#fff",
    border: "2px solid #fff",
    "&:focus": {
      outline: "none",
      borderColor: "#ff7aa8",
    },
    "&::placeholder": {
      color: "#fff",
    },
  },
  img: {
    width: "100%",
    height: "30rem",
    marginBottom: "1rem",
    borderRadius: "1rem",
    border: "3px solid #fff",
  },
  gifBtn: {
    marginLeft: "1rem",
  },
  girdItem: {
    padding: "1rem",
  },
  upLoadBtn: {
    width: "100%",
    backgroundColor: "#ec5990",
    marginBottom: "1rem",
    color: "#fff",
    "&:hover" : {
      backgroundColor: "#bf1650",
    }
  },
  none: {
    display: "none",
  },
  title: {
    color: "#ec5990",
    fontSize: '3rem', 
    marginBottom: "1rem",
  },
  fileBtn: {
    backgroundColor: "#ec5990",
    marginBottom: "0.25rem",
    color:"#fff",
    display: "inline-block",
    "&:hover": {
      backgroundColor: "#ec5990",
    },
  },
}));

function UpLoadPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [previewImg, setPreviewImg] = useState("");
  const token = useSelector((state) => state.user.currentUser.token);
  const [postData, setPostData] = useState({
    obj_image: {},
    url_image: "",
    post_content: "",
    category: [],
  });

  const defaultImage =
    "https://images-na.ssl-images-amazon.com/images/I/41q2w1-qD9L._SX331_BO1,204,203,200_.jpg";

  const handleImage = (evt) => {
    const file = evt.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    setPostData({ ...postData, obj_image: file, url_image: "" });

    reader.onload = (evt) => {
      setPreviewImg(evt.target.result);
    };
  };

  function handleCategories(evt) {
    const value = evt.target.value;

    dispatch(checked(Number(value)));

    setPostData({
      ...postData,
      category: [...postData.category, value],
    });

    postData.category.forEach((item) => {
      if (item === value) {
        setPostData({
          ...postData,
          category: postData.category.filter((item) => item !== value),
        });
      }
    });
  }

  function handleLinkImg(evt) {
    setPostData({
      ...postData,
      url_image: evt.target.value,
      obj_image: {},
    });
    setPreviewImg("");
  }

  async function handleSubmit(evt) {
    evt.preventDefault();

    if (isLoading) return;
    if (!postData.post_content || !postData.category.length) return;

    const formData = new FormData();

    formData.append("obj_image", postData.obj_image);
    formData.append("url_image", postData.url_image);
    formData.append("post_content", postData.post_content);
    formData.append("category", postData.category);

    setIsLoading(true);

    await dispatch(addNewPostAsync(formData,token)).then((res) => {
      if (res.ok) {
        setPostData({
          obj_image: {},
          url_image: "",
          post_content: "",
          category: [],
        });
        setError("");
        setPreviewImg("");
        setIsLoading(false);
        dispatch(resetChecked());
        dispatch(getNewPostsAsync());
      } else {
        setError(res.error);
      }
    });
  }

  useEffect(() => {
    return dispatch(resetChecked());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container>
      <Grid item sm={7} xs={12}>
        <Paper elevation={3} className={classes.paper}>
          <form onSubmit={handleSubmit}>
            <input
              className={classes.input}
              placeholder="d??n link v?? ????y"
              value={postData.url_image}
              onChange={handleLinkImg}
            />
            <textarea
              className={classes.textarea}
              placeholder="vi???t m?? t???..."
              value={postData.post_content}
              onChange={(evt) =>
                setPostData({ ...postData, post_content: evt.target.value })
              }
            />
            <img
              className={classes.img}
              src={previewImg || postData.url_image || defaultImage}
              alt=""
            />
            <input
              accept="image/*"
              className={classes.none}
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleImage}
            />
            <label htmlFor="contained-button-file">
              <Button component="span" className={classes.fileBtn}>
                t??? m??y t??nh
              </Button>
            </label>

            <Button
              variant="contained"
              color="secondary"
              className={classes.gifBtn}
              component="a"
              href="https://giphy.com/"
              target="_blank"
            >
              t??? web
            </Button>
          </form>
        </Paper>
      </Grid>
      <Grid item sm={5} xs={12} className={classes.girdItem}>
        <p className={classes.title}>Ch???n danh m???c:</p>
        <Grid container style={{ marginBottom: "1rem" }}>
          {categories.map((item) => (
            <CategoriesItem
              key={item.key}
              id={item.key}
              title={item.text}
              isChecked={item.isChecked}
              handleCategories={handleCategories}
            />
          ))}
        </Grid>
        <Button
          className={classes.upLoadBtn}
          onClick={handleSubmit}
        >
          up load
        </Button>
        {error && <p>{error}</p>}
      </Grid>
    </Grid>
  );
}

export default UpLoadPage;
