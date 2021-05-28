import React from "react";
import { makeStyles, Drawer, List } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getNewPostsByCategoryAsync } from "../store/postsActions";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1rem",
  },
  list: {
    width: "40vw",
  },
  title: {
    fontSize: "3rem",
  },
}));

function MobileCategories({ isOpenMobileCategories, handleMobileCategories }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  async function handleCategoriesItem(key) {
    await dispatch(getNewPostsByCategoryAsync(3, 1, key)).then((res) => {
      if (res.ok) {
        history.push(`category-tagIndex=${key}`);
      }
    });
  }

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.root }}
      transitionDuration={300}
      open={isOpenMobileCategories}
      onClose={handleMobileCategories}
    >
      <h1 className={classes.title}>Categories</h1>
      <List className={classes.list} onClick={handleMobileCategories}>
        {categories.map((item) => (
          <p key={item.key} onClick={() => handleCategoriesItem(item.key)}>
            {item.text}
          </p>
        ))}
      </List>
    </Drawer>
  );
}

export default MobileCategories;
