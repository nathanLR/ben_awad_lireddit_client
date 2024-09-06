import React from "react";
import { useGetPostsQuery } from "../generated/graphql";
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
import { StarIcon } from "@chakra-ui/icons";
import { _POST_FETCH_LIMIT_ } from "../constants";
import { formatDate } from "../utils/helpers";

interface PostsLayoutProps {}

const PostsLayout: React.FC<PostsLayoutProps> = ({}) => {
  const { loading, data, fetchMore } = useGetPostsQuery({
    notifyOnNetworkStatusChange: true,
    variables: { limit: _POST_FETCH_LIMIT_ },
  });
  console.log("PostLayout DATA: ", data);
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
          {data?.getPosts.posts.map((post) => {
            return (
              <GridItem>
                <Card bg={"gray.900"} boxShadow={"lg"} color={"white"}>
                  <CardHeader>
                    <Flex flexDirection={"row"} alignItems={"center"}>
                      <Heading size={"md"}>{post.title}</Heading>
                      <Flex
                        pl={3}
                        ml={3}
                        borderLeft={"1px"}
                        borderLeftColor={"gray.700"}
                        alignItems={"center"}
                      >
                        {post.points}
                        <StarIcon ml={1} />
                      </Flex>
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
                        href={`/profile/${post.user.username}`}
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
                    <Text
                      as="i"
                      color={"gray.600"}
                    >
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
                </Card>
              </GridItem>
            );
          })}
        </Grid>
        {data?.getPosts.hasMore ? (
          <Center mt={6}>
            <Button
              bg={"green.100"}
              _hover={{ bg: "green.300" }}
              isLoading={loading}
              onClick={() => {
                fetchMore({
                  variables: {
                    cursor:
                      data?.getPosts.posts[data.getPosts.posts.length - 1]
                        .createdAt,
                  },
                });
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
