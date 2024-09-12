import { Button, Heading, HStack, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { ReactNode } from "react";
import {
  GetPostsDocument,
  LogoutMutation,
  MeDocument,
  MeQuery,
  useLogoutMutation,
  useMeQuery,
} from "../generated/graphql";
import { _POST_FETCH_LIMIT_ } from "../constants";

interface NavBarWrapperProps {
  children: React.ReactNode;
}

const NavBarWrapper: React.FC<NavBarWrapperProps> = ({ children }) => {
  return (
    <HStack
      spacing={4}
      bg={"gray.900"}
      p={5}
      color={"black"}
      justify={"flex-end"}
      boxShadow={"lg"}
      mb={6}
    >
      {children}
    </HStack>
  );
};

const NavBar: React.FC<{}> = ({}) => {
  const [logout, { loading: loadingLogout }] = useLogoutMutation({
    update(cache, { data: logoutData }) {
      cache.updateQuery<MeQuery, LogoutMutation>(
        { query: MeDocument },
        (cachedData) => {
          if (!logoutData?.logout) return cachedData;
          else
            return {
              whoAmI: null,
            };
        }
      );
    },
    refetchQueries: [
      {
        query: GetPostsDocument,
        variables: {
          limit: _POST_FETCH_LIMIT_,
          cursor: undefined,
        },
      },
    ],
  });
  const { data: dataMe, loading: loadingMe } = useMeQuery();
  let content: ReactNode = null;

  if (loadingMe) {
  } else if (dataMe?.whoAmI == null) {
    content = (
      <NavBarWrapper>
        <Heading color={"white"} mr={"auto"}>
          <Link as={NextLink} href="/">
            LiReddit
          </Link>
        </Heading>

        <Button
          as={NextLink}
          href={"/login"}
          bg={"green.100"}
          _hover={{ bg: "green.300" }}
        >
          Login
        </Button>
        <Button
          as={NextLink}
          href={"/register"}
          bg={"green.100"}
          _hover={{ bg: "green.300" }}
        >
          Register
        </Button>
      </NavBarWrapper>
    );
  } else {
    content = (
      <NavBarWrapper>
        <Heading color={"white"} mr={"auto"}>
          <Link as={NextLink} href="/">
            LiReddit
          </Link>
        </Heading>
        <Link
          as={NextLink}
          href={`/user/${dataMe.whoAmI.username}`}
          color={"green.200"}
        >
          {dataMe.whoAmI.username}
        </Link>
        <Button
          bg={"green.100"}
          _hover={{ bg: "green.300" }}
          onClick={async () => {
            const response = await logout();
            if (!response.data?.logout) console.error("Unable to logout...");
          }}
          isLoading={loadingLogout}
        >
          Logout
        </Button>
      </NavBarWrapper>
    );
  }
  return <>{content}</>;
};

export default NavBar;
