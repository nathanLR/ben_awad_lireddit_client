import React from "react";
import { Layout } from "../components/Layout";
import { Button, Divider, Flex, Heading } from "@chakra-ui/react";
import NextLink from "next/link";
import PostsLayout from "../components/PostsLayout";
import { AddIcon } from "@chakra-ui/icons";
import { PaginatedPosts, useGetPostsQuery } from "../generated/graphql";
import { _POST_FETCH_LIMIT_ } from "../constants";

export default function index() {
  const {loading, data, fetchMore} = useGetPostsQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
        limit: _POST_FETCH_LIMIT_
    }
});

  return (
    <Layout>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Heading as="h1" size={"lg"} mb={6}>
          Recent posts
        </Heading>
        <Button
          rightIcon={<AddIcon />}
          bg={"green.100"}
          _hover={{ bg: "green.300" }}
          as={NextLink}
          href={"/create-post"}
        >
          New post
        </Button>
      </Flex>

      <Divider borderColor={"whiteAlpha.400"} />
      <PostsLayout loading={loading} data={data?.getPosts as PaginatedPosts} fetchMore={fetchMore}/>
    </Layout>
  );
}
