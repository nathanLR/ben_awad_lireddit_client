import { Box } from "@chakra-ui/react";
import React from "react";
import ErrorProvider from "../context/ErrorContext";
import InfoProvider from "../context/InfoContext";

interface AppWrapperProps {
  children: React.ReactNode;
}

export const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  return (
    <ErrorProvider>
      <InfoProvider>
        <Box minH={"100vh"} bg={"gray.800"} color={"white"}>
          {children}
        </Box>
      </InfoProvider>
    </ErrorProvider>
  );
};
