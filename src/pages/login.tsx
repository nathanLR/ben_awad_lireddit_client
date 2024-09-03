import { Box, VStack, Button, Link } from "@chakra-ui/react";
import React from "react";
import { Form, Formik } from "formik";
import InputField from "../components/InputField";
import toErrorMap from "../utils/toErrorMap";
import { useRouter } from "next/router";
import {
  LoginMutation,
  MeDocument,
  MeQuery,
  useLoginMutation,
} from "../generated/graphql";
import NextLink from "next/link";
import Wrapper from "../components/Wrapper";

interface FormValues {
  usernameOrEmail: string;
  password: string;
}

const Login: React.FC<{}> = ({}) => {
  const [login, { loading }] = useLoginMutation({
    update: (cache, { data: loginData }) => {
      cache.updateQuery<MeQuery, LoginMutation>(
        { query: MeDocument },
        (cachedData) => {
          if (loginData?.login.errors) return cachedData;
          else
            return {
              whoAmI: loginData?.login.user,
            };
        }
      );
    },
  });
  const router = useRouter();
  return (
    <Wrapper h={"100vh"} alignItems={"center"} justifyContent={"center"}>
      <Box bg={"gray.900"} p={6} w={80} rounded={"md"} boxShadow={"lg"}>
        <Formik<FormValues>
          initialValues={{
            usernameOrEmail: "",
            password: "",
          }}
          onSubmit={async (values: FormValues, actions) => {
            const response = await login({ variables: values });
            if (response.data?.login.errors)
              actions.setErrors(toErrorMap(response.data.login.errors));
            else if (response.data?.login.user){
              if (router.query.next != undefined)
                router.replace(router.query.next);
              else
                router.replace("/");
            }
          }}
        >
          {() => (
            <Form>
              <VStack spacing={4} align={"flex-start"}>
                <InputField
                  name="usernameOrEmail"
                  label="Username Or Email"
                  type="text"
                  color="black"
                  bg="green.100"
                />
                <InputField name="password" label="Password" type="password" color="black" bg="green.100"/>
                <Link href="/forgot-password" as={NextLink} color="blue.700">
                  Forgot password ?
                </Link>
                <Link href="/register" as={NextLink} color="blue.700">
                  Don't have an account yet ?
                </Link>
                <Button
                  type="submit"
                  bg={"green.100"}
                  _hover={{bg: "green.300"}}
                  w="full"
                  isLoading={loading}
                >
                  Login
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
    </Wrapper>
  );
};

export default Login;
