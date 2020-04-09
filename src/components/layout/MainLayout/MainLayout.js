import React, { useState } from "react";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";

//import components
import { Navbar, SidebarDrawer } from "../../index";

const MainLayout = ({ children }) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  return (
    <div>
      <Container className="test-container" maxWidth="lg">
        <Navbar
          title="Pokedex Api"
          search="Search pokemon..."
          setIsOpenDrawer={setIsOpenDrawer}
        />
        <SidebarDrawer
          isOpenDrawer={isOpenDrawer}
          setIsOpenDrawer={setIsOpenDrawer}
        />
        {children}
      </Container>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
