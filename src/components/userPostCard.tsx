import React from 'react';
import { GetUserPostsDocument, Post, useDeletePostMutation } from '../generated/graphql';
import { GridItem, Card, Box, CardHeader, Flex, Heading, Divider, CardBody, CardFooter, Button, Text, IconButton, Menu, MenuButton, MenuItem, MenuList, Spinner } from '@chakra-ui/react';
import { formatDate } from '../utils/helpers';
import NextLink from "next/link"
import { HamburgerIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useErrorContext } from '../context/ErrorContext';
import { _POST_FETCH_LIMIT_ } from '../constants';
import { useRouter } from 'next/router';

interface userPostCardProps {
    post: Post
}

const UserPostCard: React.FC<userPostCardProps> = ({ post }) => {
    const router = useRouter();
    const { setError } = useErrorContext();
    const [deletePost, { loading, data }] = useDeletePostMutation({
        update: (cacheObject, { data: mutationResult }) => {
            cacheObject.evict({ id: "Post:" + mutationResult?.deletePost.post?.id });
            cacheObject.gc();
        },
        refetchQueries: [
            {
                query: GetUserPostsDocument,
                variables: {
                    limit: _POST_FETCH_LIMIT_,
                    cursor: undefined,
                    username: post.user.username
                }
            }
        ]
    });
    return (<GridItem key={post.id}>
        <Card bg={"gray.900"} boxShadow={"lg"} color={"white"} direction={"row"}>
            <Box w={"full"}>
                <CardHeader>
                    <Flex flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
                        <Heading size={"md"}>{post.title}</Heading>
                        <Menu closeOnSelect={false}>
                            <MenuButton
                                as={IconButton}
                                aria-label='Options'
                                icon={<HamburgerIcon />}
                                color={"white"}
                                bg={"none"}
                                _hover={{ bg: "rgba(0,0,0,0.3)" }}
                                _active={{ bg: "rgba(0,0,0,0.3)" }}
                            />
                            <MenuList>
                                <MenuItem icon={<EditIcon />} color={"black"} onClick={() => {
                                    router.push(`/post/edit/${post.id}`);
                                }}>
                                    Update post
                                </MenuItem>
                                <MenuItem icon={loading ? <Spinner size={"sm"} /> : <DeleteIcon />} color={"white"} bg={"red.500"} onClick={async () => {
                                    try {
                                        await deletePost({ variables: { deletePostId: post.id } });
                                        if (data?.deletePost.errors)
                                            setError({
                                                newError: true,
                                                type: data.deletePost.errors[0].field,
                                                message: data.deletePost.errors[0].message,
                                            });
                                    } catch (error) {
                                        setError({
                                            newError: true,
                                            type: error.graphQLErrors[0]?.extensions.code,
                                            message: error.graphQLErrors[0]?.message,
                                        });
                                    }
                                }}>
                                    Delete post
                                </MenuItem>
                            </MenuList>
                        </Menu>
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
    </GridItem>);
}

export default UserPostCard;