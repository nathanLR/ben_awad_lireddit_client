import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import PostsLayout from "../../components/PostsLayout";

const User: React.FC = () => {
    const router = useRouter();

    return (
        <Layout>
            <PostsLayout />
        </Layout>
    );
}

export default User;