import React from "react";
import { useGetPostsQuery } from "../generated/graphql";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Grid,
  GridItem,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

interface PostsLayoutProps {}

const PostsLayout: React.FC<PostsLayoutProps> = ({}) => {
  const { loading, data, fetchMore, error } = useGetPostsQuery({
    variables: { limit: 10 },
  });
  console.log("erreur: ", error);
  console.log("useGetPostsQuery", data);
  const router = useRouter();
  if (loading) {
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
        <Grid templateColumns={"repeat(3, 1fr)"} gap={6} mx="auto" mt={6}>
          {data?.getPosts.map((post) => {
            return (
              <GridItem
                key={post.id}
                w={"100%"}
                onClick={() => router.push("/post/" + post.id)}
                cursor="pointer"
              >
                <Card>
                  <CardHeader>{post.title}</CardHeader>
                  <CardBody>{post.textExcerpt}</CardBody>
                </Card>
              </GridItem>
            );
          })}
        </Grid>
        <Center mt={6}>
          <Button
            bg={"green.100"}
            _hover={{ bg: "green.300" }}
            isLoading={loading}
            onClick={() => {
              fetchMore({
                variables: {
                  cursor:
                    data?.getPosts[data.getPosts.length - 1]
                      .createdAt,
                },
              });
            }}
          >
            Load more
          </Button>
        </Center>
      </Box>
    );
  }
};

export default PostsLayout;
