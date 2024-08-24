import { Box, VStack, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import InputField from "../../components/InputField";
import toErrorMap from "../../utils/toErrorMap";
import { useResetPasswordMutation } from "../../generated/graphql";
import Wrapper from "../../components/Wrapper";

interface ResetPasswordProps {}

interface FormValues {
  password: string;
  confirmPassword: string;
  token: string;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({}) => {
  const [resetPassword, { loading }] = useResetPasswordMutation();
  const router = useRouter();
  return (
    <Wrapper h={"100vh"} alignItems={"center"} justifyContent={"center"}>
      <Box bg={"gray.900"} p={6} w={80} rounded={"md"} boxShadow={"lg"}>
        <Formik<FormValues>
          initialValues={{
            password: "",
            confirmPassword: "",
            token: router.query.token as string,
          }}
          enableReinitialize={true}
          onSubmit={async (values: FormValues, actions) => {
            const response = await resetPassword({ variables: values });
            console.log(response);
            if (response.data?.resetPassword.errors)
              actions.setErrors(toErrorMap(response.data.resetPassword.errors));
            else if (response.data?.resetPassword.user)
              router.replace("/login");
          }}
        >
          {() => (
            <Form>
              <VStack spacing={4} align={"flex-start"}>
                <InputField
                  name="password"
                  label="New password"
                  type="password"
                  color="black" bg="green.100"
                />
                <InputField
                  name="confirmPassword"
                  label="Confirm password"
                  type="password"
                  color="black" bg="green.100"
                />
                <Button
                  type="submit"
                  bg={"green.100"}
                  _hover={{bg: "green.300"}}
                  w="full"
                  isLoading={loading}
                >
                  Reset password
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
    </Wrapper>
  );
};

export default ResetPassword;
