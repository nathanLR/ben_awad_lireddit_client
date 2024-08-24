import { Box } from '@chakra-ui/react';
import React from 'react'
import NavBar from './NavBar';

interface LayoutProps {
    children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <Box>
            <NavBar/>
            {children}
        </Box>
    );
}