import React from "react";
import { Layout } from "../components/Layout";
import { Box, Button, Divider, Flex, Heading } from "@chakra-ui/react";
import NextLink from "next/link";
import PostsLayout from "../components/PostsLayout";
import { AddIcon } from "@chakra-ui/icons";

export default function index() {
  return (
    <Layout>
      <Box minW={"300px"} maxW={"1000px"} mx="auto">
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Heading as="h1" size={"lg"} mb={6}>Recent posts</Heading>
          <Button rightIcon={<AddIcon />} bg={"green.100"} _hover={{bg: "green.300"}} as={NextLink} href={"/create-post"}>
            New post
          </Button>
        </Flex>
        
        <Divider borderColor={"whiteAlpha.400"}/>
        <PostsLayout />
      </Box>
    </Layout>
  );
}
