import { Box, VStack, Button, Heading } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import React from "react";
import InputField from "../components/InputField";
import toErrorMap from "../utils/toErrorMap";
import {
  GetPostsDocument,
  useCreatePostMutation,
} from "../generated/graphql";
import { Layout } from "../components/Layout";
import { useErrorContext } from "../context/ErrorContext";
import useIsAuth from "../utils/useIsAuth";
import { _POST_FETCH_LIMIT_ } from "../constants";

interface FormValues {
  title: string;
  text: string;
}

const CreatePost: React.FC<{}> = ({ }) => {
  const [createPost, { loading }] = useCreatePostMutation();
  const { setError } = useErrorContext();
  useIsAuth();
  const router = useRouter();
  return (
    <Layout>
      <Box>
        <Heading as="h1" size={"2xl"} mb={8}>
          Create a new post
        </Heading>
        <Formik<FormValues>
          initialValues={{
            title: "",
            text: "",
          }}
          onSubmit={async (values: FormValues, actions) => {
            try {
              const response = await createPost({
                variables: { input: values },
                refetchQueries: [
                  {
                    query: GetPostsDocument,
                    variables: {
                      limit: _POST_FETCH_LIMIT_,
                      cursor: undefined,
                    },
                  },
                ],
              });
              if (response.data?.createPost.errors)
                actions.setErrors(
                  toErrorMap(response.data.createPost.errors)
                );
              else if (response.data?.createPost.post) router.push("/");
            } catch (error: any) {
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
                  Create Post
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
    </Layout>
  );
};

export default CreatePost;
