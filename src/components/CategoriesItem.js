import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

function CategoriesItem({ id, title, handleCategories, isChecked }) {
  const classes = useStyles();

  return (
    <Grid item md={4} xs={6}>
      <div>
        <input
          type="checkbox"
          value={id}
          onChange={handleCategories}
          checked={isChecked}
        />
        <label>{title}</label>
      </div>
    </Grid>
  );
}

export default CategoriesItem;
