import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/Layout";
import { Box, Flex, Heading, IconButton, Tag, Text } from "@chakra-ui/react";
import { useGetPostQuery } from "../../generated/graphql";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import NextLink from "next/link";
import VoteInteraction from "../../components/VoteInteraction";
import { ArrowBackIcon } from "@chakra-ui/icons";

dayjs.extend(relativeTime);

const Post: React.FC = () => {
  const router = useRouter();
  const { data, loading } = useGetPostQuery({
    variables: { id: parseInt(router.query.id as string) },
  });
  if (loading) return <Box>loading...</Box>;
  if (!loading && !data?.getPost)
    return <Box>This post doesn't exist anymore.</Box>;
  else
    return (
      <Layout>
        <Box
          shadow={"lg"}
          bg={"gray.900"}
          p={"1.25rem"}
          borderRadius={"0.375rem"}
        >
          <Text color={"gray.600"}>
            <Tag
              as={NextLink}
              size={"md"}
              bg={"green.100"}
              _hover={{ bg: "green.300" }}
              href={`/user/${data?.getPost?.user.username}`}
              fontStyle={"normal"}
            >
              {data?.getPost?.user.username}
            </Tag>
            <Text as={"span"} mx={2}>
              •
            </Text>
            {dayjs(parseInt(data?.getPost?.createdAt!)).fromNow()}
          </Text>
          <Heading as={"h1"} mt={2}>
            {data?.getPost?.title}
          </Heading>
        </Box>
        <Box my={5}>
          <Text as={"p"} lineHeight={2}>
            {data?.getPost?.text}
          </Text>
        </Box>
        <Flex>
          <VoteInteraction
            post={{ ...data?.getPost!, textExcerpt: "" }}
            variant="singlePost"
          />
          <IconButton
            icon={<ArrowBackIcon boxSize={6} />}
            ml="auto"
            bg={"green.100"}
            _hover={{ bg: "green.300" }}
            aria-label="Go to Homepage"
            onClick={() => router.back()}
          />
        </Flex>
      </Layout>
    );
};

export default Post;
