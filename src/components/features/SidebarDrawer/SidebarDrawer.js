import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import PropTypes from "prop-types";
import { FaArrowLeft } from "react-icons/fa";

//import components
import { PokemonTypesFilterList } from "../../index";

const useStyles = makeStyles({
  list: {
    width: 320
  },
  title: {
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    marginTop: 0
  },
  fullList: {
    width: "auto"
  },
  wrapper: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "15px"
  },
  closeIcon: {
    fontSize: "1.7em",
    cursor: "pointer"
  }
});

const SidebarDrawer = ({ isOpenDrawer, setIsOpenDrawer }) => {
  const classes = useStyles();
  const anchor = "left";

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsOpenDrawer(open);
  };

  const list = anchor => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom"
      })}
      role="presentation"
      //onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <div className={classes.wrapper}>
          <FaArrowLeft
            onClick={toggleDrawer(anchor, false)}
            className={classes.closeIcon}
          />
        </div>
        <h1 className={classes.title}>Select Pokemon Types:</h1>
        <PokemonTypesFilterList />
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment key={anchor}>
        <Drawer
          anchor={anchor}
          open={isOpenDrawer}
          onClose={toggleDrawer(anchor, false)}
        >
          {list(anchor)}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

SidebarDrawer.propTypes = {
  isOpenDrawer: PropTypes.bool,
  setIsOpenDrawer: PropTypes.func
};

export default SidebarDrawer;
