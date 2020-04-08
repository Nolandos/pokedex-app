import React, { useState } from "react";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import CardContent from "@material-ui/core/CardContent";

//import components
import { Navbar, SidebarDrawer } from "../../index";

const MainLayout = ({ children }) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  return (
    <div>
      <Navbar
        title="Pokedex Api"
        search="Search pokemon..."
        setIsOpenDrawer={setIsOpenDrawer}
      />
      <SidebarDrawer
        isOpenDrawer={isOpenDrawer}
        setIsOpenDrawer={setIsOpenDrawer}
      />
      <Container maxWidth="lg">
        <CardContent>{children}</CardContent>
      </Container>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
