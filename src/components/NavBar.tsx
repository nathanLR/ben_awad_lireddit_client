import { Button, HStack, Link } from '@chakra-ui/react';
import NextLink from "next/link";
import React, { ReactNode } from 'react';
import { LogoutMutation, MeDocument, MeQuery, useLogoutMutation, useMeQuery } from '../generated/graphql';

interface NavBarWrapperProps {
    children: React.ReactNode;
}

const NavBarWrapper: React.FC<NavBarWrapperProps> = ({children}) => {
    return (
        <HStack spacing={4} bg={"gray.900"} p={5} color={"black"} justify={"flex-end"} boxShadow={"lg"}>
            {children}
        </HStack>
    )
}

const NavBar: React.FC<{}> = ({}) => {
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
            <NavBarWrapper>
                <Button as={NextLink} href={"/login"} bg={"green.100"} _hover={{bg: "green.300"}}>Login</Button>
                <Button as={NextLink} href={"/register"} bg={"green.100"} _hover={{bg: "green.300"}}>Register</Button>
            </NavBarWrapper>
        );
    }else{
        content = (
            <NavBarWrapper>
                <Link as={NextLink} href='/profile' color={"green.200"}>
                    {dataMe.whoAmI.username}
                </Link>
                <Button bg={"green.100"} _hover={{bg: "green.300"}}
                    onClick={async () =>{
                        const response = await logout();
                        if (!response.data?.logout)
                            console.error("Unable to logout...")
                    }} 
                    isLoading={loadingLogout}
                >Logout</Button>
            </NavBarWrapper>
        );
    }
    return (
        <>
            {content}
        </>
    );
}

export default NavBar;