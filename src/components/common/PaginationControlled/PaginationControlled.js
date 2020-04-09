import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function PaginationControlled({
  count,
  setPokemonPerPage,
  pagination,
}) {
  const classes = useStyles();
  const history = useHistory();
  const { presentPage } = pagination;

  const handleChange = (event, value) => {
    if (presentPage !== value) {
      history.push(`/${value}`);
    }
  };

  return (
    <div className={classes.root}>
      <Pagination
        size="large"
        count={count}
        page={presentPage || 1}
        onChange={handleChange}
      />
    </div>
  );
}
