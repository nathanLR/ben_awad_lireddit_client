import React from 'react'
import NavBar from '../components/NavBar'
import { useGetPostsQuery } from '../generated/graphql'

export default function index() {
  const {loading, data} = useGetPostsQuery();
  console.log(data);
  return (
    <>
      <NavBar />
      <div>index</div>
      <br/>
      {!data ? <div>loading...</div> : data.getPosts.map(post => <div key={post.id}>{post.title}</div>)}
    </>
  )
}