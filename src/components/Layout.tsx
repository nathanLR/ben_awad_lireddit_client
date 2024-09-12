import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Box } from "@chakra-ui/react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <Box minW={"300px"} maxW={"1000px"} mx="auto">
        {children}
      </Box>

      <Footer />
    </>
  );
};
