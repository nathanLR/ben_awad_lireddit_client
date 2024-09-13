import { GridItem, Card, Box, CardHeader, Flex, Heading, Tag, Divider, CardBody, CardFooter, Button, Text } from '@chakra-ui/react';
import React from 'react';
import { formatDate } from '../utils/helpers';
import VoteInteraction from './VoteInteraction';
import { Post } from '../generated/graphql';
import NextLink from "next/link"

interface PostCardProps {
    post: Post
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
    return (
        <GridItem key={post.id}>
            <Card bg={"gray.900"} boxShadow={"lg"} color={"white"} direction={"row"}>
                <VoteInteraction post={post} />
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
}

export default PostCard;