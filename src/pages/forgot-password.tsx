import { Flex, Box, VStack, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React from 'react'
import InputField from '../components/InputField';
import { useForgotPasswordMutation } from '../generated/graphql';

interface ForgotPasswordProps {

}

interface FormValues {
        email: string;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({}) => {
        const [forgotPassword, {loading}] = useForgotPasswordMutation();
        const {isOpen, onOpen, onClose} = useDisclosure();
        return (
                <Flex align={'center'} justify={'center'} flex={1}>
                <Box bg={"white"} p={6} w={80} rounded={"md"}>
                    <Formik<FormValues>
                        initialValues={{
                            email: ""
                        }}
                        onSubmit={async (values: FormValues) => {
                            await forgotPassword({variables: values});
                            onOpen();
                        }}
                    >
                        {() => (
                            <Form>
                                <VStack spacing={4} align={"flex-start"}>
                                    <InputField name="email" label="Account email" type="text"/>
                                    <Button type='submit' colorScheme='purple' w="full" isLoading={loading}>Send email</Button>
                                </VStack>
                            </Form>
                        )}
                    </Formik>
                        <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                                <ModalHeader>Modal Title</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                        If the email matches and existng account, you will soon receive an email to reset your password. If you didn't
                                        receive anything, please try again.
                                </ModalBody>

                                <ModalFooter>
                                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                                        I understand
                                        </Button>
                                </ModalFooter>
                        </ModalContent>
                        </Modal>
                </Box>
            </Flex> 
        )
}

export default ForgotPassword;