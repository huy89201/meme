import React from "react";
import { Grid } from "@material-ui/core";

function CategoriesItem({ item, handleCategories }) {
  if (!item) return;

  return (
    <Grid item xs={6}>
      <div>
        <input type="checkbox" value={item.id} onChange={handleCategories} />
        <label>{item.text}</label>
      </div>
    </Grid>
  );
}

export default CategoriesItem;
