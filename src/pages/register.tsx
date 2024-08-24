import { Box, VStack, Button, Link } from "@chakra-ui/react";
import React from "react";
import { Form, Formik } from "formik";
import InputField from "../components/InputField";
import toErrorMap from "../utils/toErrorMap";
import { useRouter } from "next/router";
import {
  CreateUserMutation,
  MeDocument,
  MeQuery,
  useCreateUserMutation,
} from "../generated/graphql";
import NextLink from "next/link";
import Wrapper from "../components/Wrapper";

interface FormValues {
  username: string;
  password: string;
  email: string;
}

const Register: React.FC<{}> = ({}) => {
  const [createUser, { data, loading }] = useCreateUserMutation({
    update(cache, { data: registerData }) {
      cache.updateQuery<MeQuery, CreateUserMutation>(
        { query: MeDocument },
        (cachedData) => {
          if (registerData?.createUser.errors) return cachedData;
          else
            return {
              whoAmI: registerData?.createUser.user,
            };
        }
      );
    },
  });
  console.log(data);
  const router = useRouter();
  return (
    <Wrapper h={"100vh"} alignItems={"center"} justifyContent={"center"}>
      <Box bg={"gray.900"} p={6} w={80} rounded={"md"} boxShadow={"lg"}>
        <Formik<FormValues>
          initialValues={{
            username: "",
            password: "",
            email: "",
          }}
          onSubmit={async (values: FormValues, actions) => {
            const response = await createUser({
              variables: {
                username: values.username,
                password: values.password,
                email: values.email,
              },
            });
            if (response.data?.createUser.errors)
              actions.setErrors(toErrorMap(response.data.createUser.errors));
            else if (response.data?.createUser.user) router.replace("/");
          }}
        >
          {() => (
            <Form>
              <VStack spacing={4} align={"flex-start"}>
                <InputField
                  name="username"
                  label="Username"
                  type="text"
                  color="black"
                  bg="green.100"
                />
                <InputField
                  name="email"
                  label="Email"
                  type="text"
                  color="black"
                  bg="green.100"
                />
                <InputField
                  name="password"
                  label="Password"
                  type="password"
                  color="black"
                  bg="green.100"
                />
                <Link href="/login" as={NextLink} color="blue.700">
                  Already have an account ?
                </Link>
                <Button
                  type="submit"
                  bg={"green.100"}
                  _hover={{ bg: "green.300" }}
                  w="full"
                  isLoading={loading}
                >
                  Register
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
    </Wrapper>
  );
};

export default Register;
