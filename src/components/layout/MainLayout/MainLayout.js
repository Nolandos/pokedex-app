import React, { useState } from "react";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";

//import components
import { Navbar, SidebarDrawer } from "../../index";

const MainLayout = ({ children }) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  return (
    <div>
      <Navbar title="Pokedex Api" setIsOpenDrawer={setIsOpenDrawer} />
      <SidebarDrawer
        isOpenDrawer={isOpenDrawer}
        setIsOpenDrawer={setIsOpenDrawer}
      />
      <Container className="test-container" maxWidth="lg">
        {children}
      </Container>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node
};

export default MainLayout;
