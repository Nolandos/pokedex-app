import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2)
  },
  abilityName: {
    fontSize: "1.7em",
    fontWeight: "bold",
    margin: "0px 5px"
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    margin: "5px 5px",
    padding: "0 5px"
  },
  questionButton: {
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    outline: "none",
    cursor: "pointer",
    border: "1px solid #000",
    borderRadius: "50%",
    height: "25px",
    width: "25px",
    fontWeight: "bold",
    fontSize: "1.2em"
  }
}));

export default function AbilityPopover({ name, description, index }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className={classes.wrapper}>
      <p className={classes.abilityName}>
        {index + 1}. {name}
      </p>
      <button
        className={classes.questionButton}
        aria-describedby={id}
        onClick={handleClick}
      >
        ?
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <Typography className={classes.typography}>{description}</Typography>
      </Popover>
    </div>
  );
}

AbilityPopover.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  index: PropTypes.number
};
