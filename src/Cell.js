import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import classes from "./Cell.module.css";

function Cell(props) {
  return (
    <Grid item sm={3}>
      <Paper style={{ backgroundColor: props.color }} className={classes.paper}>
        {props.children}
      </Paper>
    </Grid>
  );
}

export default Cell;
