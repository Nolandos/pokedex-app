import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';

//import components
import { Navbar } from '../../index';

const MainLayout = ({ children }) => {

    return (
        <Container maxWidth="lg">
            <Navbar 
                title="Pokedex Api"
                search="Search pokemon..."
            />
            <CardContent >
                { children }
            </CardContent>
       </Container>
    )
}

MainLayout.propTypes = {
    children: PropTypes.node
};
  
export default MainLayout;