import { Flex } from '@chakra-ui/react';
import React from 'react';

interface WrapperProps {
    children: React.ReactNode
}

const Wrapper: React.FC<WrapperProps> = ({children}) => {
    return (
        <Flex bg="gray.100"  w={"full"} minH={"100vh"} flexDirection={"column"}>
            {children}
        </Flex>
    );
}

export default Wrapper;