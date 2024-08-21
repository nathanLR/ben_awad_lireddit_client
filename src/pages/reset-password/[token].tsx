import { Flex, Box, VStack, Button } from "@chakra-ui/react";
import { Formik, Form, FormikProps } from "formik";
import { useRouter } from "next/router";
import InputField from "../../components/InputField";
import toErrorMap from "../../utils/toErrorMap";
import { useResetPasswordMutation } from "../../generated/graphql";

interface ResetPasswordProps {

}

interface FormValues {
    password: string;
    confirmPassword: string;
    token: string;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({}) => {
    const [resetPassword, {loading}] = useResetPasswordMutation();
    const router = useRouter();
    return (
        <Flex align={'center'} justify={'center'} flex={1}>
            <Box bg={"white"} p={6} w={80} rounded={"md"}>
                <Formik<FormValues>
                    initialValues={{
                        password: "",
                        confirmPassword: "",
                        token: router.query.token as string
                    }}
                    enableReinitialize={true}
                    onSubmit={async (values: FormValues, actions) => {
                        const response = await resetPassword({variables: values});
                        console.log(response);
                        if (response.data?.resetPassword.errors)
                            actions.setErrors(toErrorMap(response.data.resetPassword.errors))
                        else if (response.data?.resetPassword.user)
                            router.replace("/login");
                    }}
                >
                    {(props: FormikProps<FormValues>) => (
                        <Form>
                            <VStack spacing={4} align={"flex-start"}>
                                <InputField name="password" label="New password" type="password"/>
                                <InputField name="confirmPassword" label="Confirm password" type="password"/>
                                <Button type='submit' colorScheme='purple' w="full" isLoading={loading}>Reset password</Button>
                            </VStack>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Flex> 
);
}

export default ResetPassword;