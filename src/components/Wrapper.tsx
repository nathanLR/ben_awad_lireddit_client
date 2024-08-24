import { chakra, Flex } from '@chakra-ui/react';
import React from 'react';

interface WrapperProps {
    children: React.ReactNode
}

const Wrapper: React.FC<WrapperProps> = ({children, ...props}) => {
    return (
        <Flex w={"full"} flexDirection={"column"} p={5} {...props}>
            {children}
        </Flex>
    );
}

export default chakra(Wrapper);