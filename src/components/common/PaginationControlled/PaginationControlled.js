import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2)
    },
    width: "100%",
    display: "flex",
    justifyContent: "center"
  }
}));

export default function PaginationControlled({ count, pagination, filters }) {
  const search = queryString.stringify(filters);
  const classes = useStyles();
  const history = useHistory();
  const { presentPage } = pagination;

  const handleChange = (event, value) => {
    if (presentPage !== value) {
      history.push(`/?page=${value}${search ? `&${search}` : ""}`);
    }
  };

  return (
    <div className={classes.root}>
      {count > 0 && (
        <Pagination
          size="large"
          count={count}
          page={presentPage || 1}
          onChange={handleChange}
        />
      )}
    </div>
  );
}

PaginationControlled.propTypes = {
  count: PropTypes.number,
  pagination: PropTypes.object,
  filters: PropTypes.array
};
