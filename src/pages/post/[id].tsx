import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/Layout";
import { Box } from "@chakra-ui/react";

interface PostProps {}

const Post: React.FC<PostProps> = ({}) => {
  const router = useRouter();
  return (
    <Layout>
      <Box minW={"300px"} maxW={"1000px"} mx="auto">
        hello
      </Box>
    </Layout>
  );
};

export default Post;
