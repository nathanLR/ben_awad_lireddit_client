import { useEffect } from "react";
import { useInfoContext } from "../context/InfoContext";
import { useMeQuery } from "../generated/graphql";
import { Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

const useIsAuth = () => {
  const { data, loading } = useMeQuery();
  const { setInfo } = useInfoContext();
  const router = useRouter();

  useEffect(() => {
    if (loading == false && !data?.whoAmI) {
      setInfo({
        newMessage: true,
        modalHeader: "Attention",
        modalBody: (
          <Box>You need to be authenticated in order to use this feature.</Box>
        ),
        modalFooter: [
          <Button  bg={"green.100"} _hover={{ bg: "green.300" }} onClick={() => {
            setInfo({
                newMessage: false,
                modalBody: "",
                modalHeader: "",
                modalFooter: []
            });
            router.replace("/login?next=" + router.pathname);
          }}>
            Redirect me
          </Button>,
        ],
      });
    }
  }, [data, loading]);
};

export default useIsAuth;
