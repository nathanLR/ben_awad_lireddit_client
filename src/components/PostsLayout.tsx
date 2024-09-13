import React from "react";
import { PaginatedPosts } from "../generated/graphql";
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Grid,
  GridItem,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { _POST_FETCH_LIMIT_ } from "../constants";
import PostCard from "./PostCard";
import UserPostCard from "./userPostCard";

interface PostsLayoutProps {
  loading: boolean,
  data: PaginatedPosts,
  fetchMore: any,
  page?: "user" | undefined
}

const PostsLayout: React.FC<PostsLayoutProps> = ({loading, data, fetchMore, page}) => {
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
              page == "user" ? <UserPostCard post={post}/> : <PostCard post={post} />
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
