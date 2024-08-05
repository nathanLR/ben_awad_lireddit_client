
import { Flex, Box, VStack, Button } from '@chakra-ui/react';
import React from 'react';
import Wrapper from '../components/Wrapper';
import { Form, Formik, FormikProps } from 'formik';
import InputField from '../components/InputField';

interface registerProps {

}

interface FormValues {
    username: string;
    password: string;
}

const Register: React.FC<registerProps> = ({}) => {
    return (
        <Wrapper>
            <Flex align={'center'} justify={'center'} h={"100%"}>
                <Box bg={"white"} p={6} w={80} rounded={"md"}>
                    <Formik<FormValues>
                        initialValues={{
                            username: "",
                            password: ""
                        }}
                        onSubmit={(values) => console.log(values)}
                    >
                        {({isSubmitting}:FormikProps<FormValues>) => (
                            <Form>
                                <VStack spacing={4} align={"flex-start"}>
                                    <InputField name="username" label="Username" type="text"/>
                                    <InputField name="password" label="Password" type="password"/>
                                    <Button type='submit' colorScheme='purple' w="full" isLoading={isSubmitting}>Register</Button>
                                </VStack>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Flex>
        </Wrapper>
        
    );
}

export default Register;