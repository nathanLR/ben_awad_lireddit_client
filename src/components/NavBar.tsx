import { Box } from '@chakra-ui/react';
import React from 'react';

interface NavBarProps {

}

const NavBar: React.FC<NavBarProps> = ({}) => {
    return (
        <Box bg={"white"} shadow={"sm"} mx={-4}>
            Navbar
        </Box>
    );
}

export default NavBar;