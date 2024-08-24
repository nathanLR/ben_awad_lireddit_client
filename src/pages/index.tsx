import React from 'react'
import { useGetPostsQuery } from '../generated/graphql'
import { Layout } from '../components/Layout';
import { Box } from '@chakra-ui/react';

export default function index() {
  const {loading, data} = useGetPostsQuery();
  return (
    <Layout>
      <Box>
        {loading ? "loading posts..." : data?.getPosts.map(post => <Box>{post.title}</Box>)}
      </Box>
    </Layout>
  )
}