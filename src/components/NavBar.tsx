import { Button, Flex, HStack } from '@chakra-ui/react';
import NextLink from "next/link";
import React, { ReactNode } from 'react';
import { useMeQuery } from '../generated/graphql';

interface NavBarProps {

}

const NavBar: React.FC<NavBarProps> = ({}) => {
    const {data, loading} = useMeQuery();
    console.log(data);
    let content: ReactNode = null;

    if (loading){
        
    }else if (data?.whoAmI == null){
        content = (
            <HStack spacing={4} ml={"auto"}>
                <NextLink href={"/login"}>
                   Login
                </NextLink>
                <NextLink href={"/register"}>
                   Register 
                </NextLink>
            </HStack>
        );
    }else{
        content = (
            <HStack spacing={4} ml={"auto"}>
                <NextLink href={"/login"}>
                   Login
                </NextLink>
                <NextLink href={"/profile"}>
                   {data.whoAmI.username}
                </NextLink>
                <Button variant="link">Logout</Button>
            </HStack>
        );
    }
    return (
        <Flex bg={"white"} shadow={"sm"} p={4}>
            {content}
        </Flex>
    );
}

export default NavBar;