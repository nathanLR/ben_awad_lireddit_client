import { Button, Flex, HStack } from '@chakra-ui/react';
import NextLink from "next/link";
import React, { ReactNode } from 'react';
import { LogoutMutation, MeDocument, MeQuery, useLogoutMutation, useMeQuery } from '../generated/graphql';

interface NavBarProps {

}

const NavBar: React.FC<NavBarProps> = ({}) => {
    const [logout, {loading: loadingLogout}] = useLogoutMutation({
        update(cache, {data: logoutData}){
            cache.updateQuery<MeQuery, LogoutMutation>({query: MeDocument}, cachedData => {
                if(!logoutData?.logout)
                    return cachedData;
                else
                    return {
                        whoAmI: null
                    }
            })
        }
    });
    const {data: dataMe, loading: loadingMe} = useMeQuery();
    let content: ReactNode = null;

    if (loadingMe){
        
    }else if (dataMe?.whoAmI == null){
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
                <NextLink href={"/profile"}>
                   {dataMe.whoAmI.username}
                </NextLink>
                <Button variant="link"
                    onClick={async () =>{
                        const response = await logout();
                        if (!response.data?.logout)
                            console.error("Unable to logout...")
                    }} 
                    isLoading={loadingLogout}
                >Logout</Button>
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