
import { Flex, Box, VStack, Button, Link } from '@chakra-ui/react';
import React from 'react';
import { Form, Formik } from 'formik';
import InputField from '../components/InputField';
import toErrorMap from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { LoginMutation, MeDocument, MeQuery, useLoginMutation } from '../generated/graphql';
import NextLink from 'next/link';

interface FormValues {
    usernameOrEmail: string;
    password: string;
}

const Login: React.FC<{}> = ({}) => {
    const [login, {loading}] = useLoginMutation({
        update(cache, {data: loginData}){
            cache.updateQuery<MeQuery, LoginMutation>({query: MeDocument}, cachedData => {
                if(loginData?.login.errors)
                    return cachedData;
                else
                    return {
                        whoAmI: loginData?.login.user
                    }
            })
        }
    });
    const router = useRouter();
    return (
            <Flex align={'center'} justify={'center'} flex={1}>
                <Box bg={"white"} p={6} w={80} rounded={"md"}>
                    <Formik<FormValues>
                        initialValues={{
                            usernameOrEmail: "",
                            password: ""
                        }}
                        onSubmit={async (values: FormValues, actions) => {
                            const response = await login({variables: values});
                            if (response.data?.login.errors)
                                actions.setErrors(toErrorMap(response.data.login.errors));
                            else if (response.data?.login.user)
                                router.replace("/");
                        }}
                    >
                        {() => (
                            <Form>
                                <VStack spacing={4} align={"flex-start"}>
                                    <InputField name="usernameOrEmail" label="Username Or Email" type="text"/>
                                    <InputField name="password" label="Password" type="password"/>
                                    <Link href='/forgot-password' as={NextLink} color="blue.700">Forgot password ?</Link>
                                    <Link href='/register' as={NextLink} color="blue.700">Don't have an account yet ?</Link>
                                    <Button type='submit' colorScheme='purple' w="full" isLoading={loading}>Login</Button>
                                </VStack>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Flex> 
    );
}

export default Login;