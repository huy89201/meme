import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  checkbox: {
    marginRight: "0.5rem",
    width: "1rem",
    height: "1rem",
    backgroundColor: "#fff",
  },
  title: {
    color: "#fff",
  },
}));

function CategoriesItem({ id, title, handleCategories, isChecked }) {
  const classes = useStyles();

  return (
    <Grid item md={4} xs={6}>
      <div className={classes.wrapper}>
        <input
          type="checkbox"
          value={id}
          onChange={handleCategories}
          checked={isChecked}
          className={classes.checkbox}
        />
        <label className={classes.title}>{title}</label>
      </div>
    </Grid>
  );
}

export default CategoriesItem;
