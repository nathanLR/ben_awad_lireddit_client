import React from "react";
import { PaginatedPosts } from "../generated/graphql";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Skeleton,
  SkeletonText,
  Tag,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { _POST_FETCH_LIMIT_ } from "../constants";
import { formatDate } from "../utils/helpers";
import VoteInteraction from "./VoteInteraction";

interface PostsLayoutProps {
  loading: boolean,
  data: PaginatedPosts,
  fetchMore: any,
}

const PostsLayout: React.FC<PostsLayoutProps> = ({loading, data, fetchMore}) => {
  
  console.log(data);
  if (loading && !data) {
    return (
      <Grid templateColumns={"repeat(3, 1fr)"} gap={6} mx="auto" mt={6}>
        {[...Array(8)].map((_, index) => {
          return (
            <GridItem w={"100%"} key={index}>
              <Card>
                <CardBody>
                  <Skeleton w={"50%"} h={4} mb={3}></Skeleton>
                  <SkeletonText noOfLines={4} spacing={2} skeletonHeight={2} />
                </CardBody>
              </Card>
            </GridItem>
          );
        })}
      </Grid>
    );
  } else {
    return (
      <Box>
        <Grid templateColumns={"repeat(1, 1fr)"} gap={6} mx="auto" mt={6}>
          {data.posts.map((post) => {
            return (
              <GridItem key={post.id}>
                <Card bg={"gray.900"} boxShadow={"lg"} color={"white"} direction={"row"}>
                  <VoteInteraction post={post}/>
                  <Box w={"full"}>
                    <CardHeader>
                      <Flex flexDirection={"row"} alignItems={"center"}>
                        <Heading size={"md"}>{post.title}</Heading>
                        <Text
                          as="i"
                          color={"gray.600"}
                          justifySelf={"flex-end"}
                          ml={"auto"}
                        >
                          posted by
                        </Text>
                        <Tag
                          as={NextLink}
                          size={"md"}
                          bg={"green.100"}
                          _hover={{ bg: "green.300" }}
                          href={`/user/${post.user.username}`}
                          ml={2}
                          fontStyle={"normal"}
                          justifySelf={"flex-end"}
                        >
                          {post.user.username}
                        </Tag>
                      </Flex>
                    </CardHeader>
                    <Divider borderColor="gray.700" />
                    <CardBody>{post.textExcerpt}</CardBody>
                    <Divider borderColor="gray.700" />
                    <CardFooter justify={"space-between"}>
                      <Text as="i" color={"gray.600"}>
                        Added: {formatDate(post.createdAt)}
                      </Text>
                      <Button
                        bg={"green.100"}
                        _hover={{ bg: "green.300" }}
                        as={NextLink}
                        href={`/post/${post.id}`}
                        size="sm"
                      >
                        Read more
                      </Button>
                    </CardFooter>
                  </Box>
                </Card>
              </GridItem>
            );
          })}
        </Grid>
        {data?.hasMore ? (
          <Center mt={6}>
            <Button
              bg={"green.100"}
              _hover={{ bg: "green.300" }}
              isLoading={loading}
              onClick={async() => {
                const result = await fetchMore({
                  variables: {
                    cursor:
                      data?.posts[data.posts.length - 1]
                        .createdAt,
                  },
                });
                console.log("fetchmore: ",result);
              }}
            >
              Load more
            </Button>
          </Center>
        ) : (
          ""
        )}
      </Box>
    );
  }
};

export default PostsLayout;
