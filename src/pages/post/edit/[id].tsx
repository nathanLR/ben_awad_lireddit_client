import { useRouter } from "next/router";
import { useErrorContext } from "../../../context/ErrorContext";
import { Post, useGetPostQuery, useMeQuery, useUpdatePostMutation } from "../../../generated/graphql";
import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import InputField from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import { _POST_FETCH_LIMIT_ } from "../../../constants";
import toErrorMap from "../../../utils/toErrorMap";
import { gql } from "@apollo/client";


interface FormValues {
    id: number;
    title: string;
    text: string;
}

const UpdatePost: React.FC<{}> = ({ }) => {
    const router = useRouter();
    const [updatePost, { loading }] = useUpdatePostMutation();
    const { data: useMeData, loading: useMeLoading } = useMeQuery();
    const { data: usePostData, loading: usePostLoading } = useGetPostQuery({ variables: { id: parseInt(router.query.id as string) } });
    const { setError } = useErrorContext();

    //if not logged or current user trys to edit a non owned post
    if ((!useMeLoading && !usePostLoading) && (!useMeData?.whoAmI || usePostData?.getPost?.user.username != useMeData.whoAmI.username))
        router.replace("/");

    if (usePostLoading)
        return (<Box>loading...</Box>)
    if (!usePostLoading && !usePostData?.getPost)
        return (<Box>This post doesn't exist anymore.</Box>)
    else
        return (
            <Layout>
                <Box>
                    <Heading as="h1" size={"2xl"} mb={8}>
                        Edit your post
                    </Heading>
                    <Formik<FormValues>
                        initialValues={{
                            id: parseInt(router.query.id as string),
                            title: usePostData?.getPost?.title!,
                            text: usePostData?.getPost?.text!,
                        }}
                        onSubmit={async (values: FormValues, actions) => {
                            console.log(values);
                            try {
                                const response = await updatePost({
                                    variables: {
                                        updatePostId: values.id,
                                        text: values.text,
                                        title: values.title
                                    },
                                    update: (cachedObject, { data: mutationResult }) => {
                                        if (!mutationResult)
                                            return;
                                        const { updatePost } = mutationResult;
                                        cachedObject.writeFragment<Partial<Post>>({
                                            id: "Post:" + updatePost.post?.id,
                                            fragment: gql`
                                              fragment PostFragmentWrite on Post {
                                                title
                                                text
                                                textExcerpt
                                                updatedAt
                                              }
                                            `,
                                            data: {
                                                text: updatePost.post?.text,
                                                title: updatePost.post?.title,
                                                updatedAt: updatePost.post?.updatedAt,
                                                textExcerpt: updatePost.post?.textExcerpt
                                            }
                                        });
                                    }
                                });
                                if (response.data?.updatePost.errors)
                                    actions.setErrors(
                                        toErrorMap(response.data.updatePost.errors)
                                    );
                                router.push(`/user/${useMeData?.whoAmI?.username}`)
                            } catch (error) {
                                setError({
                                    newError: true,
                                    type: error.graphQLErrors[0]?.extensions.code,
                                    message: error.graphQLErrors[0]?.message,
                                });
                            }
                        }}
                    >
                        {() => (
                            <Form>
                                <VStack spacing={4} align={"flex-start"}>
                                    <InputField
                                        name="title"
                                        label="Title"
                                        type="text"
                                        bg={"green.100"}
                                        color="black"
                                    />
                                    <InputField
                                        name="text"
                                        label="Text"
                                        type="text"
                                        textarea
                                        bg={"green.100"}
                                        color="black"
                                    />
                                    <Button
                                        type="submit"
                                        w="full"
                                        isLoading={loading}
                                        bg={"green.100"}
                                        _hover={{ bg: "green.300" }}
                                    >
                                        Edit post
                                    </Button>
                                </VStack>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Layout>
        );
};

export default UpdatePost;
