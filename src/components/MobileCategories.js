import React from "react";
import { makeStyles, Drawer, List, Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getNewPostsByCategoryAsync } from "../store/postsActions";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1rem",
    width: "100vw",
    height: "50vh",
  },
  title: {
    fontSize: "3rem",
  },
  item: {
    padding: "0.5rem",
  },
}));

function MobileCategories({ isOpenMobileCategories, handleMobileCategories }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  async function handleCategoriesItem(key) {
    if (!key) history.push("/");

    await dispatch(getNewPostsByCategoryAsync(3, 1, key)).then((res) => {
      if (res.ok) {
        history.push(`category-tagIndex=${key}`);
      }
    });
  }

  return (
    <Drawer
      anchor="top"
      classes={{ paper: classes.root }}
      transitionDuration={300}
      open={isOpenMobileCategories}
      onClose={handleMobileCategories}
    >
      <h1 className={classes.title}>Categories</h1>
      <List onClick={handleMobileCategories}>
        <Grid container>
          {categories.map((item) => (
            <Grid item xs={4} key={item.key}>
              <p
                className={classes.item}
                onClick={() => handleCategoriesItem(item.key)}
              >
                {item.text}
              </p>
            </Grid>
          ))}
        </Grid>
      </List>
    </Drawer>
  );
}

export default MobileCategories;
