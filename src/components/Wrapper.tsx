import { Box } from '@chakra-ui/react';
import React from 'react';

interface WrapperProps {
    children: React.ReactNode
}

const Wrapper: React.FC<WrapperProps> = ({children}) => {
    return (
        <Box bg="gray.100" px={15} w={"full"} h={"100vh"}>
            {children}
        </Box>
    );
}

export default Wrapper;