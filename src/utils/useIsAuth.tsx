import { useEffect, useState } from "react";
import { useInfoContext } from "../context/InfoContext";
import { useMeQuery } from "../generated/graphql";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Countdown } from "../components/Countdown";

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
          <Box>You need to be authenticated in order to use this page.</Box>
        ),
        modalFooter: [
          <Button  bg={"green.100"} _hover={{ bg: "green.300" }}>
            Redirect me
          </Button>,
        ],
      });
    }
  }, [data, loading]);
};

export default useIsAuth;
