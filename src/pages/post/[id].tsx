import { useRouter } from 'next/router';
import React from 'react'

interface PostProps {

}

const Post: React.FC<PostProps> = ({}) => {
    const router = useRouter();
    return (<p>{router.query.id}</p>);
}

export default Post;