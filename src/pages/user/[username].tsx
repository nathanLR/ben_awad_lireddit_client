import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import PostsLayout from "../../components/PostsLayout";
import { PaginatedPosts, useGetUserPostsQuery } from "../../generated/graphql";
import { _POST_FETCH_LIMIT_ } from "../../constants";

const User: React.FC = () => {
    const router = useRouter();
    const {loading, data, fetchMore} = useGetUserPostsQuery({
        notifyOnNetworkStatusChange: true,
        variables: {
            limit: _POST_FETCH_LIMIT_,
            username: router.query.username as string
        }
    });

    return (
        <Layout>
            <PostsLayout loading={loading} data={data?.getUserPosts as PaginatedPosts} fetchMore={fetchMore}/>
        </Layout>
    );
}

export default User;