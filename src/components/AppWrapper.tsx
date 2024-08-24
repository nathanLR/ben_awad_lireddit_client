import { Box } from "@chakra-ui/react";
import React from "react";
import GlobalProvider from "../context/GlobalProvider";

interface AppWrapperProps {
  children: React.ReactNode;
}

export const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  return (
    <GlobalProvider>
      <Box minH={"100vh"} bg={"gray.800"} color={"white"}>
        {children}
      </Box>
    </GlobalProvider>
  );
};
