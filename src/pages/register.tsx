
import { Flex, Box, VStack, Button } from '@chakra-ui/react';
import React from 'react';
import { Form, Formik } from 'formik';
import InputField from '../components/InputField';
import toErrorMap from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { CreateUserMutation, MeDocument, MeQuery, useCreateUserMutation } from '../generated/graphql';

interface FormValues {
    username: string;
    password: string;
    email: string;
}

const Register: React.FC<{}> = ({}) => {
    const [createUser, {data, loading}] = useCreateUserMutation({
        update(cache, {data: registerData}){
            cache.updateQuery<MeQuery, CreateUserMutation>({query: MeDocument}, cachedData => {
                if(registerData?.createUser.errors)
                    return cachedData;
                else
                    return {
                        whoAmI: registerData?.createUser.user
                    }
            })
        }
    });
    console.log(data);
    const router = useRouter();
    return (
            <Flex align={'center'} justify={'center'} flex={1}>
                <Box bg={"white"} p={6} w={80} rounded={"md"}>
                    <Formik<FormValues>
                        initialValues={{
                            username: "",
                            password: "",
                            email: ""
                        }}
                        onSubmit={async (values: FormValues, actions) => {
                            const response = await createUser({variables:{username: values.username, password: values.password, email: values.email}});
                            if (response.data?.createUser.errors)
                                actions.setErrors(toErrorMap(response.data.createUser.errors));
                            else if (response.data?.createUser.user)
                                router.replace("/");
                        }}
                    >
                        {() => (
                            <Form>
                                <VStack spacing={4} align={"flex-start"}>
                                    <InputField name="username" label="Username" type="text"/>
                                    <InputField name="email" label="Email" type="text"/>
                                    <InputField name="password" label="Password" type="password"/>
                                    <Button type='submit' colorScheme='purple' w="full" isLoading={loading}>Register</Button>
                                </VStack>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Flex> 
    );
}

export default Register;