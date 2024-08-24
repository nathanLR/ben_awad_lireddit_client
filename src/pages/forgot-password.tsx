import {
  Box,
  VStack,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import InputField from "../components/InputField";
import { useForgotPasswordMutation } from "../generated/graphql";
import Wrapper from "../components/Wrapper";

interface ForgotPasswordProps {}

interface FormValues {
  email: string;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({}) => {
  const [forgotPassword, { loading }] = useForgotPasswordMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Wrapper h={"100vh"} alignItems={"center"} justifyContent={"center"}>
      <Box bg={"gray.900"} p={6} w={80} rounded={"md"} boxShadow={"lg"}>
        <Formik<FormValues>
          initialValues={{
            email: "",
          }}
          onSubmit={async (values: FormValues) => {
            await forgotPassword({ variables: values });
            onOpen();
          }}
        >
          {() => (
            <Form>
              <VStack spacing={4} align={"flex-start"}>
                <InputField
                  name="email"
                  label="Account email"
                  type="text"
                  color={"black"}
                  bg={"green.100"}
                />
                <Button
                  type="submit"
                  bg={"green.100"}
                  _hover={{ bg: "green.300" }}
                  w="full"
                  isLoading={loading}
                >
                  Send email
                </Button>
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
              If the email matches and existng account, you will soon receive an
              email to reset your password. If you didn't receive anything,
              please try again.
            </ModalBody>

            <ModalFooter>
              <Button
                bg={"green.300"}
                mr={3}
                onClick={onClose}
              >
                I understand
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Wrapper>
  );
};

export default ForgotPassword;
